
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { stackRoutes } from '../../navigation/screenIds';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LogoHeader from '../../components/common/LogoHeader';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import InfoBanner from '../../components/common/InfoBanner';
import CustomButton from '../../components/common/CustomButton';
import { btmContainer } from '../../utils/layout';
import Badge from '../../components/common/Badge';
import Icons from '../../components/vectorIcons/Icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { guidelines } from '../../utils/array';
import { uploadToS3 } from '../../utils/uploadToS3';
import {
  useDeleteMediaMutation,
  useFilesPresignMutation,
  useUploadBulkMediaMutation,
} from '../../services/profileAPI';
import { useProfile } from '../../hooks/useProfile';
import { correctSize } from '../../utils';
import InfoIcon from '../../assets/svg/portfolio/InfoIcon';
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';
import { ROUTES } from '../../services/routes';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';
import {
  requestCameraAndMicPermission,
  requestCameraPermission,
  requestPhotoLibraryPermission,
} from '../../utils/permissions';
import UploadPhotoSkeleton from '../../components/profile/UploadPhotoSkeleton';

// ─── Types ────────────────────────────────────────────────────────────────────

type MediaType = {
  uri: string;
  fileName: string;
  type: string;
  fileSize?: number;
};

/** What we show per step in the "uploaded" row */
type ExistingMedia = {
  id: number;
  url: string;
  fileType: 'IMAGE' | 'VIDEO';
  type: 'HEADSHOT' | 'FULL_BODY' | 'CASUAL' | 'FULL_VIDEO';
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MEDIA_TYPE_FOR_STEP: Array<ExistingMedia['type']> = [
  'HEADSHOT',
  'FULL_BODY',
  'CASUAL',
  'FULL_VIDEO',
];

const TOTAL_PHOTOS = 3;

// ─── Component ────────────────────────────────────────────────────────────────

export default function UploadPhoto() {
  const navigation = useNavigation<NavProp>();
  const [selectedMedia, setSelectedMedia] = useState<MediaType[]>([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isVideoSelecting, setIsVideoSelecting] = useState(false);

  const [isInitialized, setIsInitialized] = useState(false);
  const [filesPresign] = useFilesPresignMutation();
  const [uploadBulkMedia] = useUploadBulkMediaMutation();
  const [deleteMedia, { isLoading: deleteLoading }] = useDeleteMediaMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { profile, fetchProfile, isLoading: profileLoading } = useProfile();

  // ── Derive existing media per step from profile ──────────────────────────
  const allMedia: ExistingMedia[] = (profile?.media ?? profile?.portfolioImages ?? []) as unknown as ExistingMedia[];

  const headshotMedia = allMedia.filter(m => m.type === 'HEADSHOT');
  const fullBodyMedia = allMedia.filter(m => m.type === 'FULL_BODY');
  const casualMedia = allMedia.filter(m => m.type === 'CASUAL');
  const videoMedia = allMedia.filter(m => m.type === 'FULL_VIDEO');

  /** Returns the existing uploaded items for the current step */
  const existingForStep: ExistingMedia[] =
    uploadedCount === 0
      ? headshotMedia
      : uploadedCount === 1
      ? fullBodyMedia
      : uploadedCount === 2
      ? casualMedia
      : videoMedia;

  // ── Sync uploadedCount with server data on mount ─────────────────────────
  // WITH this:
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!allMedia.length && !profile) return;

    if (!hasInitialized.current) {
      // First load — set step from server data
      hasInitialized.current = true;
      if (casualMedia.length > 0) {
        setUploadedCount(3);
      } else if (fullBodyMedia.length > 0) {
        setUploadedCount(2);
      } else if (headshotMedia.length > 0) {
        setUploadedCount(1);
      } else {
        setUploadedCount(0);
      }
      setIsInitialized(true);
      return;
    }

    // After init — only update if ALL media for current step are deleted
    // This keeps the step visible but refreshes the displayed items
    setUploadedCount(prev => {
      if (prev === 3 && videoMedia.length === 0 && casualMedia.length === 0)
        return 3; // stay on video step
      if (prev === 2 && casualMedia.length === 0) return 2; // stay on casual step
      if (prev === 1 && fullBodyMedia.length === 0) return 1; // stay on fullbody step
      if (prev === 0 && headshotMedia.length === 0) return 0; // stay on headshot step
      return prev; // don't change
    });
  }, [profile]);

  if ((profileLoading && !profile) || !isInitialized) {
    return <UploadPhotoSkeleton />;
  }

  // ── Step labels ───────────────────────────────────────────────────────────
  const stepTitle =
    uploadedCount === 1
      ? 'Full Body'
      : uploadedCount === 2
      ? 'Casual Photo'
      : uploadedCount === 3
      ? 'Short Video'
      : 'Headshot';

  const stepDesc =
    uploadedCount === 1
      ? 'Head to toe visible'
      : uploadedCount === 2
      ? 'Natural, everyday look'
      : uploadedCount === 3
      ? '30-60 seconds max'
      : 'Face clearly visible';

  const stepIcon =
    uploadedCount === 1
      ? 'person'
      : uploadedCount === 2
      ? 'shirt'
      : uploadedCount === 3
      ? 'video'
      : 'user';

  // ── Pick from gallery ─────────────────────────────────────────────────────
  const pickImageOrVideo = async () => {
    try {
      const hasPermission = await requestPhotoLibraryPermission();
      if (!hasPermission) return;
      if (uploadedCount < 3) {
        const totalSelected = selectedMedia.length + existingForStep.length;
        const remaining = TOTAL_PHOTOS - totalSelected;

        if (remaining <= 0) {
          Toast.show({
            type: 'info',
            text1: 'You have already uploaded 3 photos.',
          });
          return;
        }

        const result = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: remaining,
        });

        if (result.didCancel || result.errorCode) return;

        const newPhotos: MediaType[] = [];
        result.assets?.forEach(asset => {
          if (!asset.uri) return;
          if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
            Toast.show({ type: 'info', text1: 'Photo must be 10MB or less.' });
            return;
          }
          newPhotos.push({
            uri: asset.uri,
            fileName: asset.fileName || `photo_${Date.now()}.jpg`,
            type: asset.type || 'image/jpeg',
            fileSize: asset.fileSize,
          });
        });

        setSelectedMedia(prev => [...prev, ...newPhotos]);
      } else {
        // Video step
        const totalVideoCount = selectedMedia.length + existingForStep.length;
        if (totalVideoCount >= 1) {
          Toast.show({
            type: 'info',
            text1:
              'You can only upload one video. Please remove the existing video first.',
          });
          return;
        }
        setIsVideoSelecting(true);

        const result = await launchImageLibrary({
          mediaType: 'video',
          selectionLimit: 1,
        });

        if (result.didCancel || result.errorCode) return;

        const asset = result.assets?.[0];
        if (!asset?.uri) return;

        if (asset.fileSize && asset.fileSize > 50 * 1024 * 1024) {
          Toast.show({ type: 'info', text1: 'Video must be 50MB or less.' });
          return;
        }

        setSelectedMedia([
          {
            uri: asset.uri,
            fileName: asset.fileName || `video_${Date.now()}.mp4`,
            type: asset.type || 'video/mp4',
            fileSize: asset.fileSize,
          },
        ]);
      }
    } catch (err) {
      console.error('pickImageOrVideo error:', err);
      Toast.show({
        type: 'error',
        text1: 'Could not open gallery. Please try again.',
      });
    } finally {
      setIsVideoSelecting(false);
    }
  };

  // ── Take photo / record video ─────────────────────────────────────────────
  const takePhotoOrRecord = async () => {
    try {
      if (uploadedCount < 3) {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;
        const totalSelected = selectedMedia.length + existingForStep.length;
        if (totalSelected >= TOTAL_PHOTOS) {
          Toast.show({
            type: 'info',
            text1: 'You have already uploaded 3 photos.',
          });
          return;
        }

        const result = await launchCamera({
          mediaType: 'photo',
          saveToPhotos: true,
          quality: 0.8,
        });

        if (result.didCancel || result.errorCode) return;

        const asset = result.assets?.[0];
        if (!asset?.uri) return;

        if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
          Toast.show({ type: 'info', text1: 'Photo must be 10MB or less.' });
          return;
        }

        setSelectedMedia(prev => [
          ...prev,
          {
            uri: asset.uri!,
            fileName: asset.fileName || `photo_${Date.now()}.jpg`,
            type: asset.type || 'image/jpeg',
            fileSize: asset.fileSize,
          },
        ]);
      } else {
        // Video step

        const totalVideoCount = selectedMedia.length + existingForStep.length;
        if (totalVideoCount >= 1) {
          Toast.show({
            type: 'info',
            text1:
              'You can only upload one video. Please remove the existing video first.',
          });
          return;
        }

        const hasMicPermission = await requestCameraAndMicPermission();
        if (!hasMicPermission) return;
        const result = await launchCamera({
          mediaType: 'video',
          saveToPhotos: true,
          videoQuality: 'medium',
          durationLimit: 60,
        });

        if (result.didCancel || result.errorCode) return;

        const asset = result.assets?.[0];
        if (!asset?.uri) return;

        if (asset.fileSize && asset.fileSize > 50 * 1024 * 1024) {
          Toast.show({ type: 'info', text1: 'Video must be 50MB or less.' });
          return;
        }

        setSelectedMedia([
          {
            uri: asset.uri,
            fileName: asset.fileName || `video_${Date.now()}.mp4`,
            type: asset.type || 'video/mp4',
            fileSize: asset.fileSize,
          },
        ]);
      }
    } catch (err) {
      console.error('takePhotoOrRecord error:', err);
      Toast.show({
        type: 'error',
        text1: 'Could not open camera. Please try again.',
      });
    }
  };

  // ── Remove newly-selected (local) media ───────────────────────────────────
  const removeLocalMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  // ── Delete existing (server) media ────────────────────────────────────────
  const removeExistingMedia = async (item: ExistingMedia) => {
    try {
      setDeletingId(item.id);
      await deleteMedia({ id: item.id }).unwrap();
      Toast.show({ type: 'success', text1: 'Media deleted successfully.' });
      fetchProfile();
    } catch {
      Toast.show({ type: 'error', text1: 'Failed to delete media.' });
    } finally {
      setDeletingId(null);
    }
  };

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleMediaUpload = async () => {
    if (uploadedCount < 3) {
      // If no new media selected but existing server media covers this step, just advance
      if (selectedMedia.length === 0) {
        if (existingForStep.length > 0) {
          const newCount = uploadedCount + 1;
          setUploadedCount(newCount);
        }
        return;
      }

      setLoading(true);
      const uploadedMedia: { url: string; type: string; fileType: string }[] =
        [];

      try {
        for (let i = 0; i < selectedMedia.length; i++) {
          const media = selectedMedia[i];
          const presignRes: any = await filesPresign({
            fileName: media.fileName,
            contentType: media.type,
            size: media.fileSize,
            acl: 'public-read',
          }).unwrap();

          const { uploadUrl, key } = presignRes.data;
          await uploadToS3(uploadUrl, media, percent => {
            setUploadProgress(
              Math.round(((i + percent / 100) / TOTAL_PHOTOS) * 100),
            );
          });

          const sendType = MEDIA_TYPE_FOR_STEP[uploadedCount];
          uploadedMedia.push({
            url: key,
            type: sendType,
            fileType: media.type.startsWith('video') ? 'VIDEO' : 'IMAGE',
          });
        }

        await uploadBulkMedia({ media: uploadedMedia }).unwrap();
        fetchProfile();

        const newCount = uploadedCount + 1;
        setUploadedCount(newCount);
        setSelectedMedia([]);
        setUploadProgress(0);

      } catch (err) {
        console.error('Upload failed:', err);
        Alert.alert('Upload failed', 'Something went wrong while uploading.');
      } finally {
        setLoading(false);
      }
    } else {
      // Video step
      if (selectedMedia.length > 0) {
        setLoading(true);
        const uploadedMedia: { url: string; type: string; fileType: string }[] =
          [];

        try {
          for (const media of selectedMedia) {
            const presignRes: any = await filesPresign({
              fileName: media.fileName,
              contentType: media.type,
              size: media.fileSize,
              acl: 'public-read',
            }).unwrap();

            const { uploadUrl, key } = presignRes.data;
            await uploadToS3(uploadUrl, media, () => {});
            uploadedMedia.push({
              url: key,
              type: 'FULL_VIDEO',
              fileType: 'VIDEO',
            });
          }

          await uploadBulkMedia({ media: uploadedMedia }).unwrap();
          fetchProfile();

          setSelectedMedia([]);
          setUploadProgress(0);
          navigation.navigate(stackRoutes.SkillsScreen);
        } catch (err) {
          console.error('Upload failed:', err);
          Alert.alert('Upload failed', 'Something went wrong while uploading.');
        } finally {
          setLoading(false);
        }
      } else {
        // Skip video
        navigation.navigate(stackRoutes.SkillsScreen);
      }
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.logoHeaderContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <LogoHeader
            onGoback={() => {
              if (uploadedCount > 0) {
                setUploadedCount(prev => prev - 1);
              } else {
                navigation.navigate(stackRoutes.Profile);
              }
            }}
          />

          <Text style={styles.mainHeading}>Upload Your Photos</Text>
          <Text style={styles.subHeading}>
            Add professional photos to help brands discover you. High-quality
            images increase your chances by 5x.
          </Text>

          <InfoBanner
            gradient={true}
            containerbgColor={colors.lightBlue_2}
            containerborderColor={colors.lightBlue_3}
            headingFamily={Fonts.InriaSerif_Bold}
            descriptionFamily={Fonts.Inter_Regular}
            iconPadding={10}
            heading={'Photo Tips'}
            description={
              'Use good lighting, clear backgrounds, and professional attire. Avoid filters and heavy editing.'
            }
          />

          {/* ── Step label + badge ───────────────────────────────────────── */}
          <View style={styles.requiredPhotoContainer}>
            <Text style={styles.requiredPhotoText}>
              {uploadedCount === 3 ? 'Video Introduction' : 'Required Photos'}
            </Text>
            <Badge
              bgColor={
                uploadedCount === 3 ? colors.white_1 : colors.lightBlue_2
              }
              title={uploadedCount === 3 ? 'optional' : '3 Required'}
              titleColor={uploadedCount === 3 ? colors.gray_4 : colors.purple}
              titleFamily={Fonts.Inter_SemiBold}
            />
          </View>

          {/* ── Upload card ──────────────────────────────────────────────── */}
          <View style={styles.uploadPhotoContainer}>
            {/* Header row */}
            <View style={styles.headerContainer}>
              <View style={styles.headerIconContainer}>
                <View
                  style={[
                    styles.headerIcon,
                    uploadedCount === 1 && styles.headerIconFullBody,
                    uploadedCount === 2 && styles.headerIconCasual,
                    uploadedCount === 3 && styles.headerIconVideo,
                    uploadedCount === 0 && styles.headerIconHeadshot,
                  ]}
                >
                  <Icons
                    family={'FontAwesome6'}
                    name={stepIcon}
                    color={uploadedCount === 3 ? colors.white : colors.gray_1}
                    size={18}
                  />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.headerTitleText}>{stepTitle}</Text>
                  <Text style={styles.headerDescText}>{stepDesc}</Text>
                </View>
              </View>
              {uploadedCount < 3 && (
                <View style={styles.astericContainer}>
                  <Icons
                    family={'FontAwesome6'}
                    name={'asterisk'}
                    color={colors.white}
                    size={10}
                  />
                </View>
              )}
            </View>

            {/* Info banner for video step */}
            {uploadedCount === 3 && (
              <InfoBanner
                gradient={true}
                containerbgColor={colors.lightBlue_2}
                containerborderColor={colors.lightBlue_3}
                headingFamily={Fonts.Inter_Medium}
                descriptionFamily={Fonts.Inter_Regular}
                showIcon={true}
                svgIcon={<InfoIcon width={10} height={10} />}
                iconHeight={20}
                iconWidth={20}
                description={
                  'Introduce yourself, mention your skills, and why brands should hire you. Stand out with personality!'
                }
                containerMarginBottom={correctSize(16)}
              />
            )}

            {/* ── Already-uploaded media for this step ─────────────────── */}
            {existingForStep.length > 0 && (
              <View style={styles.existingMediaContainer}>
                <Text style={styles.existingMediaLabel}>Uploaded</Text>
                {existingForStep.map(item => {
                  const mediaUri = `${ROUTES.MEDIA_URL}${item.url}`;
                  const isVideo = item.fileType === 'VIDEO';
                  return (
                    <View key={item.id} style={styles.mediaInfo}>
                      {isVideo ? (
                        <Video
                          source={{ uri: mediaUri }}
                          style={styles.mediaImage}
                          resizeMode="cover"
                          paused
                        />
                      ) : (
                        <FastImage
                          source={{ uri: mediaUri }}
                          style={styles.mediaImage}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      )}
                      <View style={styles.mediaTextContainer}>
                        <Text style={styles.mediaFileName} numberOfLines={1}>
                          {isVideo ? 'Video' : 'Photo'}
                        </Text>
                        <Text style={styles.mediaFileSubText}>
                          {isVideo ? 'Tap ✕ to remove' : 'Tap ✕ to remove'}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeExistingMedia(item)}
                        style={styles.removeIconContainer}
                        disabled={deleteLoading}
                      >
                        {deletingId === item.id ? (
                          <ActivityIndicator
                            size={'small'}
                            color={colors.orange_3}
                          />
                        ) : (
                          <Icons
                            family="FontAwesome"
                            name="close"
                            size={16}
                            color={colors.red}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {/* ── Drop zone ─────────────────────────────────────────────── */}
            <View style={styles.uploadContainer}>
              <View style={styles.uploadIconContainer}>
                {isVideoSelecting ? (
                  <ActivityIndicator size="large" color={colors.orange_3} />
                ) : (
                  <Icons
                    family={'FontAwesome'}
                    name={'cloud-upload'}
                    color={colors.gray_3}
                    size={30}
                  />
                )}
              </View>
              <Text style={styles.uploadMainText}>
                {uploadedCount === 3
                  ? 'Upload or record video'
                  : 'Tap to upload'}
              </Text>
              <Text style={styles.uploadSubText}>
                {uploadedCount === 3
                  ? 'MP4, MOV up to 50MB'
                  : 'JPG, PNG up to 10MB'}
              </Text>

              {/* Newly selected (local) media */}
              <View style={styles.selectedMediaContainer}>
                {selectedMedia.map((media, index) => (
                  <View key={index} style={styles.mediaInfo}>
                    <FastImage
                      source={{ uri: media.uri }}
                      style={styles.mediaImage}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.mediaTextContainer}>
                      <Text style={styles.mediaFileName} numberOfLines={1}>
                        {media.fileName || 'Unnamed'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeLocalMedia(index)}
                      style={styles.removeIconContainer}
                    >
                      <Icons
                        family="FontAwesome"
                        name="close"
                        size={16}
                        color={colors.red}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Browse / Camera buttons */}
              <View style={styles.uploadBtnContainer}>
                <CustomButton
                  disabled={loading || isVideoSelecting}
                  title="Browse"
                  icon={{
                    name: 'folder-open',
                    family: 'FontAwesome6',
                    color: colors.black,
                    size: 16,
                  }}
                  onPress={pickImageOrVideo}
                  style={[
                    styles.mediaButton,
                    uploadedCount === 3
                      ? styles.outlineButton
                      : styles.primaryButton,
                    { width: '48%' },
                  ]}
                  textStyle={styles.mediaButtonText}
                />
                <CustomButton
                  disabled={loading || isVideoSelecting}
                  title={uploadedCount === 3 ? 'Record' : 'Camera'}
                  icon={{
                    name: uploadedCount === 3 ? 'video' : 'camera',
                    family: 'FontAwesome6',
                    color: colors.black,
                    size: 16,
                  }}
                  onPress={takePhotoOrRecord}
                  style={[
                    styles.mediaButton,
                    uploadedCount === 3
                      ? styles.primaryButton
                      : styles.outlineButton,
                    { width: '48%' },
                  ]}
                  textStyle={styles.mediaButtonText}
                />
              </View>
            </View>
          </View>

          {/* ── Guidelines ──────────────────────────────────────────────── */}
          <View style={styles.guidelinesContainer}>
            <View style={styles.guideLineHeader}>
              <View style={styles.guidelineIconContainer}>
                <Icons
                  family={'FontAwesome6'}
                  name={'circle-check'}
                  color={colors.green}
                  size={18}
                />
              </View>
              <Text style={styles.guidelinesHeaderText}>Photo Guidelines</Text>
            </View>
            {guidelines.map(item => (
              <View style={styles.guideLines} key={item?.id}>
                <Icons
                  family={'Ionicons'}
                  name={item.iconName}
                  color={
                    item?.iconName === 'checkmark' ? colors.green : colors.red
                  }
                  size={16}
                />
                <Text style={styles.guidelineText}>{item.guide}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <View style={btmContainer.bottomContainer}>
          <View style={styles.progress}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Upload Progress</Text>
              <Text style={styles.progressText}>
                {uploadedCount}/{TOTAL_PHOTOS}
              </Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(uploadedCount / TOTAL_PHOTOS) * 100}%` },
                ]}
              />
            </View>
          </View>
          <CustomButton
            title="Continue to Next Step"
            onPress={handleMediaUpload}
            loading={loading}
            disabled={
              (selectedMedia.length < 1 &&
                existingForStep.length < 1 &&
                uploadedCount < 3) ||
              loading
            }
            style={[styles.primaryButton]}
            textStyle={[styles.primaryButtonText]}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(24),
  },
  logoHeaderContainer: {
    marginTop: correctSize(20),
  },
  mainHeading: {
    fontSize: 30,
    color: colors.black,
    marginTop: correctSize(48),
    marginBottom: correctSize(4),
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: 40,
    textTransform: 'capitalize',
  },
  subHeading: {
    fontSize: 16,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(32),
  },
  requiredPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: correctSize(32),
    marginBottom: correctSize(24),
  },
  requiredPhotoText: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    alignSelf: 'center',
  },
  uploadPhotoContainer: {
    padding: correctSize(22),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  headerContainer: {
    marginBottom: correctSize(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    flexDirection: 'row',
  },
  headerIcon: {
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(12),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconFullBody: { backgroundColor: colors.lightBlue_4 },
  headerIconCasual: { backgroundColor: colors.gray },
  headerIconVideo: { backgroundColor: colors.gray_1 },
  headerIconHeadshot: { backgroundColor: colors.lightBlue_2 },
  headerText: {
    marginStart: correctSize(12),
  },
  headerTitleText: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  headerDescText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  astericContainer: {
    height: 24,
    width: 24,
    backgroundColor: colors.red,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Existing media ───────────────────────────────────────────────────────
  existingMediaContainer: {
    marginBottom: correctSize(12),
  },
  existingMediaLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_4,
    marginBottom: correctSize(8),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Drop zone ────────────────────────────────────────────────────────────
  uploadContainer: {
    backgroundColor: colors.lightBlue_5,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: colors.gray_5,
    borderRadius: 12,
    padding: correctSize(26),
  },
  uploadIconContainer: {
    height: 56,
    width: 56,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.gray,
    marginBottom: correctSize(13),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  uploadMainText: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    alignSelf: 'center',
    marginBottom: correctSize(3),
  },
  uploadSubText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    alignSelf: 'center',
    marginBottom: correctSize(16),
  },
  selectedMediaContainer: {
    marginVertical: correctSize(10),
  },

  // ── Shared media row ─────────────────────────────────────────────────────
  mediaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray,
    padding: correctSize(8),
    borderRadius: 8,
    marginBottom: correctSize(10),
    alignItems: 'center',
  },
  mediaImage: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  mediaTextContainer: {
    flex: 1,
    paddingHorizontal: correctSize(10),
    justifyContent: 'center',
  },
  mediaFileName: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
  },
  mediaFileSubText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginTop: 2,
  },
  removeIconContainer: {
    width: correctSize(32),
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // ── Guidelines ───────────────────────────────────────────────────────────
  guidelinesContainer: {
    padding: correctSize(22),
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray,
    marginVertical: correctSize(24),
  },
  guideLineHeader: {
    marginBottom: correctSize(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  guidelineIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: colors.green_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelinesHeaderText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
    marginLeft: correctSize(12),
    alignSelf: 'center',
  },
  guideLines: {
    flexDirection: 'row',
    marginTop: correctSize(12),
    alignItems: 'center',
  },
  guidelineText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    marginLeft: correctSize(12),
  },

  // ── Progress ─────────────────────────────────────────────────────────────
  progress: {
    marginBottom: correctSize(12),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
    alignSelf: 'center',
    lineHeight: 16,
  },
  progressBarBackground: {
    height: 6,
    width: '100%',
    backgroundColor: colors.gray,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.green,
    borderRadius: 10,
  },

  // ── Buttons ──────────────────────────────────────────────────────────────
  mediaButton: {
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    textTransform: 'none',
    color: colors.black,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
  },
  outlineButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray,
  },
});
