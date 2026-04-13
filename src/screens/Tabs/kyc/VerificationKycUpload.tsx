import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { correctSize } from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../utils/colors';
import ShieldIcon from '../../../assets/svg/applications/ShieldIcon';
import { Fonts } from '../../../assets/fonts';
import KycInfoCard from '../../../components/kyc/KycInfoCard';
import ClockFill from '../../../assets/svg/applications/ClockFill';
import LockIcon from '../../../assets/svg/applications/LockIcon';
import KycSectionHeader from '../../../components/kyc/KycSectionHeader';
import FrontIdCard from '../../../assets/svg/kyc/FrontIdCard';
import BackIdIcon from '../../../assets/svg/kyc/BackIdIcon';
import CameraIcon from '../../../assets/svg/applications/CameraIcon';
import KycRequirementCard from '../../../components/kyc/KycRequirementCard';
import { kycGuidelineList, kycRequirementList } from '../../../utils/array';
import CustomButton from '../../../components/common/CustomButton';
import { AnimatedWrapper } from '../../../components/Animation';
import { stackRoutes } from '../../../navigation/screenIds';
import PlusCircleIcon from '../../../assets/svg/kyc/PlusCircleIcon';
import UploadCard from '../../../assets/svg/kyc/UploadCard';
import { launchCamera } from 'react-native-image-picker';
import { uploadToS3 } from '../../../utils/uploadToS3';
import {
  useFilesPresignMutation,
  useUploadBulkMediaMutation,
} from '../../../services/profileAPI';
import Toast from 'react-native-toast-message';
import Icons from '../../../components/vectorIcons/Icons';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../navigation/navigationTypes';

// ─── Types ───────────────────────────────────────────────────────────────────

type MediaItem = {
  uri: string;
  fileName: string;
  type: string;
  fileSize?: number;
};

type KycMediaState = {
  frontId: MediaItem | null;
  backId: MediaItem | null;
  selfie: MediaItem | null;
};

// ─── Component ───────────────────────────────────────────────────────────────

const VerificationKycUpload = () => {
  const navigation = useNavigation<NavProp>()
  const [media, setMedia] = useState<KycMediaState>({
    frontId: null,
    backId: null,
    selfie: null,
  });
  const [loading, setLoading] = useState(false);

  const [filesPresign] = useFilesPresignMutation();
  const [uploadBulkMedia] = useUploadBulkMediaMutation();

  // ─── Camera Helpers ────────────────────────────────────────────────────────

  /**
   * Launch camera and return a MediaItem, or null if cancelled / error.
   * @param selfieMode  true → use front camera for selfie
   */
  const openCamera = async (selfieMode = false): Promise<MediaItem | null> => {
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: false,
      cameraType: selfieMode ? 'front' : 'back',
      quality: 0.8,
    });

    if (result.didCancel) return null;
    if (result.errorCode) {
      console.error('Camera error:', result.errorMessage);
      Toast.show({
        type: 'error',
        text1: result.errorMessage || 'Camera error',
      });
      return null;
    }

    const asset = result.assets?.[0];
    if (!asset?.uri) return null;

    // 10 MB limit for ID docs / selfie
    if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
      Toast.show({ type: 'info', text1: 'Photo must be 10 MB or less.' });
      return null;
    }

    return {
      uri: asset.uri,
      fileName: asset.fileName || `photo_${Date.now()}.jpg`,
      type: asset.type || 'image/jpeg',
      fileSize: asset.fileSize,
    };
  };

  // ─── Capture Handlers ──────────────────────────────────────────────────────

  const captureFrontId = async () => {
    const item = await openCamera(false);
    if (item) setMedia(prev => ({ ...prev, frontId: item }));
  };

  const captureBackId = async () => {
    const item = await openCamera(false);
    if (item) setMedia(prev => ({ ...prev, backId: item }));
  };

  const captureSelfie = async () => {
    const item = await openCamera(true); // front camera
    if (item) setMedia(prev => ({ ...prev, selfie: item }));
  };

  // ─── Remove Handlers ───────────────────────────────────────────────────────

  const removeMedia = (key: keyof KycMediaState) => {
    setMedia(prev => ({ ...prev, [key]: null }));
  };

  // ─── Upload Helper (single file → S3 → returns S3 key) ────────────────────

  const uploadSingleFile = async (item: MediaItem, kycType: string) => {
    const payload = {
      fileName: item.fileName,
      contentType: item.type,
      size: item.fileSize,
      acl: 'public-read',
    };

    const presignRes: any = await filesPresign(payload).unwrap();
    const { uploadUrl, key } = presignRes.data;

    await uploadToS3(uploadUrl, item, () => {
      // progress callback — extend if you want per-file progress bars
    });

    return { url: key, type: kycType, fileType: 'IMAGE' };
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!media.frontId || !media.backId || !media.selfie) {
      Toast.show({
        type: 'info',
        text1: 'Please capture all required photos before continuing.',
      });
      return;
    }

    setLoading(true);
    try {
      const uploadedMedia = await Promise.all([
        uploadSingleFile(media.frontId, 'KYC_FRONT_ID'),
        uploadSingleFile(media.backId, 'KYC_BACK_ID'),
        uploadSingleFile(media.selfie, 'KYC_SELFIE'),
      ]);

      await uploadBulkMedia({ media: uploadedMedia }).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Documents uploaded successfully!',
      });
      navigation.navigate(stackRoutes.VerificationKyc);
    } catch (err) {
      console.error('KYC upload failed:', err);
      Alert.alert('Upload Failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Derived ───────────────────────────────────────────────────────────────

  const allCaptured = !!(media.frontId && media.backId && media.selfie);

  // ─── Small inline preview component ───────────────────────────────────────

  const MediaPreview = ({
    item,
    onRemove,
    onRetake,
  }: {
    item: MediaItem;
    onRemove: () => void;
    onRetake: () => void;
  }) => (
    <View style={styles.previewContainer}>
      <FastImage
        source={{ uri: item.uri }}
        style={styles.previewImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.previewActions}>
        <TouchableOpacity style={styles.retakeBtn} onPress={onRetake}>
          <Icons
            family="FontAwesome6"
            name="camera-rotate"
            size={14}
            color={colors.black}
          />
          <Text style={styles.retakeBtnText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
          <Icons
            family="FontAwesome"
            name="close"
            size={14}
            color={colors.red}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[colors.lightBlue_2, colors.white]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.body}>
          <AnimatedWrapper>
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.iconContainer}>
                <ShieldIcon width={24} height={24} color={colors.white} />
              </View>
              <Text style={styles.mainHeading}>Verify Your Identity</Text>
              <Text style={styles.mainText}>
                We need to verify your identity to ensure a safe and trusted
                platform for everyone. This is a one-time process.
              </Text>

              {/* Info banner */}
              <KycInfoCard
                icon={<ClockFill width={20} height={20} color={colors.white} />}
                title="KYC Required"
                description={`Please upload your Emirates ID and take a selfie to verify your identity. This helps us keep our platform secure.`}
                tag="UPLOAD"
                iconContainerStyle={{ backgroundColor: colors.orange_3 }}
                titleStyle={styles.titleStyle}
                descriptionStyle={{ color: colors.darkgray }}
                tagSyle={styles.tagStyle}
                style={{
                  backgroundColor: colors.lightYellow,
                  borderColor: colors.yellow,
                }}
              />

              {/* ── Emirates ID Section ── */}
              <KycSectionHeader
                title="Emirates ID"
                tag="REQUIRED"
                style={styles.tagStyle}
                tagTextStyle={{ color: colors.gray_4 }}
                icon={<PlusCircleIcon />}
              />

              {/* Front ID */}
              {media.frontId ? (
                <MediaPreview
                  item={media.frontId}
                  onRemove={() => removeMedia('frontId')}
                  onRetake={captureFrontId}
                />
              ) : (
                <UploadCard
                  icon={
                    <FrontIdCard
                      width={27}
                      height={24}
                      color={colors.primary}
                    />
                  }
                  title="Take Front Side Photo"
                  description={`Take a clear photo of the front of your\nEmirates ID`}
                  buttonText="Open Camera"
                  onPress={captureFrontId}
                />
              )}

              {/* Back ID */}
              {media.backId ? (
                <MediaPreview
                  item={media.backId}
                  onRemove={() => removeMedia('backId')}
                  onRetake={captureBackId}
                />
              ) : (
                <UploadCard
                  icon={
                    <BackIdIcon width={27} height={24} color={colors.primary} />
                  }
                  title="Take Back Side Photo"
                  description={`Take a clear photo of the back of your\nEmirates ID`}
                  buttonText="Open Camera"
                  onPress={captureBackId}
                />
              )}

              <KycRequirementCard
                items={kycRequirementList}
                title="Requirements:"
                titleColor={colors.blue_2}
                labelColor={colors.blue_8}
                checkIconColor={colors.blue_2}
                infoIconColor={colors.gray_1}
                style={{
                  backgroundColor: colors.lightBlue_7,
                  borderColor: colors.lightBlue_6,
                }}
              />

              {/* ── Selfie Section ── */}
              <KycSectionHeader
                title="Selfie Verification"
                tag="REQUIRED"
                style={styles.tagStyle}
                tagTextStyle={{ color: colors.gray_4 }}
                icon={<PlusCircleIcon />}
              />

              {media.selfie ? (
                <MediaPreview
                  item={media.selfie}
                  onRemove={() => removeMedia('selfie')}
                  onRetake={captureSelfie}
                />
              ) : (
                <UploadCard
                  icon={
                    <CameraIcon width={27} height={24} color={colors.primary} />
                  }
                  title="Take a Selfie"
                  description={`Hold your Emirates ID next to your face and\ntake a selfie`}
                  buttonText="Take Selfie"
                  onPress={captureSelfie}
                />
              )}

              <KycRequirementCard
                items={kycGuidelineList}
                title="Selfie Guidelines:"
                titleColor={colors.purple_3}
                labelColor={colors.purple_4}
                checkIconColor={colors.purple_5}
                infoIconColor={colors.purple_5}
                style={{
                  backgroundColor: colors.lightBlue_4,
                  borderColor: colors.lightBlue_11,
                }}
              />

              {/* Security banner */}
              <KycInfoCard
                gradient
                icon={
                  <LockIcon width={17.5} height={20} color={colors.white} />
                }
                title="Your Data is Secure"
                description={`All documents are encrypted and stored securely. We never share your information with third parties without your consent.`}
                iconContainerStyle={{ backgroundColor: colors.gray_1 }}
                titleStyle={{ fontSize: 16 }}
                descriptionStyle={{ color: colors.gray_1 }}
                style={{ borderColor: colors.lightBlue_3 }}
              />
            </View>

            {/* ── Footer ── */}
            <View style={styles.footer}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.orange_3} />
                  <Text style={styles.loadingText}>Uploading documents…</Text>
                </View>
              ) : (
                <CustomButton
                  title="Upload Documents to Continue"
                  onPress={handleSubmit}
                  disabled={!allCaptured}
                  style={!allCaptured ? styles.disabledButton : undefined}
                />
              )}
              <Text style={styles.helpText}>Need help?</Text>
              <Text style={styles.contactBtn}>Contact Support</Text>
            </View>
          </AnimatedWrapper>
        </ScrollView>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default VerificationKycUpload;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  body: {
    paddingVertical: correctSize(32),
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: correctSize(24),
  },
  iconContainer: {
    width: correctSize(64),
    height: correctSize(64),
    borderRadius: 16,
    backgroundColor: colors.gray_1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: correctSize(24),
  },
  mainHeading: {
    fontSize: 30,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  mainText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    lineHeight: 26,
    marginBottom: correctSize(32),
  },
  helpText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    textAlign: 'center',
    marginVertical: correctSize(12),
  },
  contactBtn: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.orange_3,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    padding: correctSize(24),
    paddingTop: correctSize(21),
  },
  titleStyle: {
    fontSize: 18,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  tagStyle: {
    backgroundColor: colors.gray_5,
    color: colors.darkgray,
  },
  disabledButton: {
    opacity: 0.5,
  },
  // ── Preview ──
  previewContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray,
    marginBottom: correctSize(16),
  },
  previewImage: {
    width: '100%',
    height: correctSize(180),
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: correctSize(10),
    backgroundColor: colors.white,
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  retakeBtnText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.black,
    marginLeft: correctSize(6),
  },
  removeBtn: {
    padding: correctSize(4),
  },
  // ── Loading ──
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: correctSize(16),
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    marginTop: correctSize(8),
  },
});
