import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { stackRoutes } from '../../navigation/screenIds';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LogoHeader from '../../components/common/LogoHeader';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import InfoBanner from '../../components/common/InfoBanner';
import CustomButton from '../../components/common/CustomButton';
import { btmContainer } from '../../utils/layout';
import Icons from '../../components/vectorIcons/Icons';
import { ROUTES } from '../../services/routes';
import { uploadToS3 } from '../../utils/uploadToS3';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { correctSize } from '../../utils';
import Video from 'react-native-video';
import { portfolioTips } from '../../utils/array';
import {
  useDeleteMediaMutation,
  useFilesPresignMutation,
  useUploadBulkMediaMutation,
} from '../../services/profileAPI';
import { useProfile } from '../../hooks/useProfile';
import { images } from '../../assets/images';
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';
import { requestPhotoLibraryPermission } from '../../utils/permissions';

const { width } = Dimensions.get('window');

type MediaType = {
  uri: string;
  fileName: string;
  type: string;
  fileSize?: number;
  isLocal?: boolean;
  tempId?: string;
};

export default function PortfolioScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<any>();
  const [media, setMedia] = useState<any[]>([]);
  const [videoDurations, setVideoDurations] = useState<{
    [key: number]: string;
  }>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isVideoSelecting, setIsVideoSelecting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const MAX_MEDIA = 20;
  const MAX_SIZE = 50 * 1024 * 1024;
  const [filesPresign] = useFilesPresignMutation();
  const [uploadBulkMedia, { isLoading }] = useUploadBulkMediaMutation();
  const { profile, fetchProfile, isError } = useProfile();
  const [deleteMedia] = useDeleteMediaMutation();

  const isEdit = route?.params?.status === 'EDIT';

  const portfolioMedia =
    (profile?.media ?? profile?.portfolioImages ?? []).filter(
      (item: any) => item.type === 'PORTFOLIO',
    ) || [];

  // Combine API media with local uploads for display
  const displayMedia = [
    ...portfolioMedia,
    ...media.map((item, idx) => ({
      ...item,
      isLocal: true,
      tempId: `local-${idx}`,
    })),
  ];

  const totalMediaCount = portfolioMedia.length + media.length;

  const portfolioImageCount = portfolioMedia.filter(
    (item: any) => item.fileType === 'IMAGE',
  ).length;

  const portfolioVideoCount = portfolioMedia.filter(
    (item: any) => item.fileType === 'VIDEO',
  ).length;

  const pickImageOrVideo = async () => {
    const hasPermission = await requestPhotoLibraryPermission();
    if (!hasPermission) return;
    const totalCount = portfolioMedia.length + media.length;

    if (totalMediaCount >= MAX_MEDIA) {
      Toast.show({
        type: 'info',
        text1: `You can upload a maximum of ${MAX_MEDIA} items.`,
        position: 'top',
      });
      return;
    }

    const remainingSlots = MAX_MEDIA - totalCount;

    try {
      setIsVideoSelecting(true);
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: remainingSlots,
      });

      for (const file of result.assets || []) {
        if (file.fileSize && file?.fileSize > MAX_SIZE) {
          Toast.show({
            type: 'info',
            text1: 'File size must be less than 50MB',
          });
          return;
        }
      }

      if (result.didCancel) return;
      if (result.errorCode) return console.error('Error:', result.errorMessage);

      const newMedia: MediaType[] = [];
      result.assets?.forEach(asset => {
        if (!asset.uri) return;

        if (
          asset.type?.startsWith('video') &&
          asset.fileSize &&
          asset.fileSize > 50 * 1024 * 1024
        ) {
          return;
        }

        newMedia.push({
          uri: asset.uri,
          fileName: asset.fileName || 'Unnamed',
          type: asset.type || 'image/jpeg',
          fileSize: asset.fileSize,
        });
      });

      setMedia(prev => [...prev, ...newMedia]);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to select media',
        position: 'top',
      });
    } finally {
      setIsVideoSelecting(false);
    }
  };

  const removeMedia = async (index: number, item: any) => {
    // Check if it's a local file (newly uploaded but not saved to server)
    if (item?.isLocal) {
      // Remove from local state
      const localIndex = index - portfolioMedia.length;
      setMedia(prev => prev.filter((_, i) => i !== localIndex));
      return;
    }

    // If it has an ID, it's from the API - delete from server
    if (item?.id) {
      try {
        await deleteMedia({ id: item.id }).unwrap();
        Toast.show({
          type: 'success',
          text1: 'Media deleted successfully',
          position: 'top',
        });
        fetchProfile();
      } catch (error) {
        console.error('Delete failed:', error);
        Toast.show({
          type: 'error',
          text1: 'Failed to delete media',
          position: 'top',
        });
      }
    }
  };
const handleMediaUpload = async () => {
  if (media.length === 0) {
    navigation.navigate(isEdit ? (stackRoutes.Profile as never) : stackRoutes.PaymentInfoScreen);
    return;
  }

  setUploading(true);

  try {
    // ── Step 1: get all presign URLs in parallel ──────────────────────
    const presignResults = await Promise.all(
      media.map(item =>
        filesPresign({
          fileName: item.fileName,
          contentType: item.type,
          size: item.fileSize,
          acl: 'public-read',
        }).unwrap(),
      ),
    );

    // ── Step 2: upload all files to S3 in parallel ───────────────────
    await Promise.all(
      media.map((item, i) => {
        const { uploadUrl } = presignResults[i].data;
        return uploadToS3(uploadUrl, item, () => {});
      }),
    );

    // ── Step 3: bulk register with backend in one call ───────────────
    const uploadedMedia = media.map((item, i) => ({
      url: presignResults[i].data.key,
      type: 'PORTFOLIO',
      fileType: item.type.startsWith('video') ? 'VIDEO' : 'IMAGE',
    }));

    await uploadBulkMedia({ media: uploadedMedia }).unwrap();
    fetchProfile();

    setMedia([]);
    setUploadProgress(0);

    Toast.show({ type: 'success', text1: 'Media uploaded successfully', position: 'top' });

    if (isEdit) {
      navigation.goBack();
    } else {
      navigation.navigate(stackRoutes.PaymentInfoScreen);
    }
  } catch (err) {
    console.error('Upload failed:', err);
    Alert.alert('Upload failed', 'Something went wrong while uploading your media.');
  } finally {
    setUploading(false);
  }
};

  const renderMediaItem = ({ item, index }: any) => {
    const handleVideoLoad = (meta: any) => {
      const durationInSec = meta.duration;
      const minutes = Math.floor(durationInSec / 60);
      const seconds = Math.floor(durationInSec % 60);
      const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      setVideoDurations(prev => ({ ...prev, [index]: formatted }));
    };

    // Determine if this is a local upload or API media
    const isLocal = item.isLocal;
    const mediaUri = isLocal ? item.uri : `${ROUTES.MEDIA_URL}${item.url}`;
    const isVideo = isLocal
      ? item.type?.startsWith('video')
      : item.fileType?.startsWith('VIDEO');
    const isImage = isLocal
      ? item.type?.startsWith('image')
      : item.fileType?.startsWith('IMAGE');

    return (
      <View style={styles.mediaItem}>
        {isVideo && (
          <View style={styles.videoDuration}>
            <Icons
              name="video"
              family="FontAwesome6"
              size={13}
              color={colors.white}
            />
            <Text style={{ color: colors.white, fontSize: 12, marginLeft: 4 }}>
              {videoDurations[index] || '0:00'}
            </Text>
          </View>
        )}
        {isImage ? (
          <FastImage source={{ uri: mediaUri }} style={styles.mediaImage} />
        ) : (
          <Video
            source={{ uri: mediaUri }}
            style={styles.mediaImage}
            controls
            resizeMode="cover"
            onLoad={handleVideoLoad}
          />
        )}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => removeMedia(index, item)}
        >
          <Icons
            name="close"
            family="FontAwesome"
            size={16}
            color={colors.red}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const photoCount = media.filter(m => m.type?.startsWith('image')).length;
  const videoCount = media.filter(m => m.type?.startsWith('video')).length;
  const uploadedCountPercentage =
    ((portfolioMedia?.length + media?.length) / 20) * 100;

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load profile',
      });
    }
  }, [isError]);
  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.logoHeaderContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          {isEdit ? (
            <LogoHeader />
          ) : (
            <LogoHeader
              onGoback={() =>
                navigation.navigate(stackRoutes.PersonalInfoScreen)
              }
            />
          )}
          <Text style={styles.mainHeading}>Build Your Portfolio</Text>
          <Text style={styles.subHeading}>
            Showcase your best work. Upload up to 20 high-quality images and
            videos to attract top brands.
          </Text>
          <View style={styles.mediaInfoContainer}>
            <View style={styles.photoContainer}>
              <View style={styles.photoIcon}>
                <Icons
                  family={'FontAwesome6'}
                  name={'photo-film'}
                  color={colors.gray_1}
                  size={25}
                />
              </View>
              <View>
                <Text style={styles.mediaUploadedText}>Media Uploaded</Text>
                <View style={styles.countContainer}>
                  <Text style={styles.countText}>
                    {portfolioMedia.length + media.length}
                  </Text>
                  <Text style={styles.countMaxText}>/ 20</Text>
                </View>
              </View>
            </View>
            <ImageBackground
              source={images.circle}
              style={styles.percentageTextContainer}
            >
              <Text style={styles.percentageText}>
                {uploadedCountPercentage.toFixed()}%
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.uploadBtnContainer}>
            <CustomButton
              title={`Photos (${portfolioImageCount + photoCount})`}
              icon={{
                name: 'folder-open',
                family: 'FontAwesome6',
                color: colors.white,
                size: 16,
              }}
              style={[
                styles.mediaButton,
                { backgroundColor: colors.gray_1, width: '48%' },
              ]}
              textStyle={[styles.mediaButtonText, { color: colors.white }]}
            />
            <CustomButton
              title={`Videos (${portfolioVideoCount + videoCount})`}
              icon={{
                name: 'video',
                family: 'FontAwesome6',
                color: colors.black,
                size: 16,
              }}
              style={[
                styles.mediaButton,
                styles.outlineMediaButton,
                { width: '48%' },
              ]}
              textStyle={styles.mediaButtonText}
            />
          </View>
          <View style={styles.uploadContainer}>
            <TouchableOpacity
              style={styles.uploadIconContainer}
              onPress={() => pickImageOrVideo()}
              disabled={isLoading || isVideoSelecting}
            >
              {isVideoSelecting ? (
                <ActivityIndicator size="large" color={colors.orange_3} />
              ) : (
                <Icons
                  family={'FontAwesome6'}
                  name={'plus'}
                  color={colors.gray_1}
                  size={30}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.uploadMainText}>Add Photos or Videos</Text>
            <Text style={styles.uploadSubText}>JPG, PNG, MP4 up to 50MB</Text>
          </View>
          <FlatList
            data={displayMedia}
            keyExtractor={(item, index) =>
              item.id?.toString() || item.tempId || index.toString()
            }
            scrollEnabled={false}
            renderItem={renderMediaItem}
            style={styles.flatListStyle}
            numColumns={2}
            columnWrapperStyle={styles.flatListContent}
          />
          <InfoBanner
            containerbgColor={colors.lightBlue_2}
            containerborderColor={colors.lightBlue_3}
            containerMarginBottom={correctSize(13)}
            headingFamily={Fonts.Inter_Bold}
            descriptionFamily={Fonts.Inter_Regular}
            iconPadding={10}
            iconColor={colors.gray_1}
            iconBg={colors.lightBlue_3}
            heading={'Portfolio Tips'}
            showPoints={true}
            points={portfolioTips}
          />
        </View>
        <View style={btmContainer.bottomContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Save Draft"
              disabled
              style={[
                styles.actionButton,
                styles.outlineButton,
                { width: '47%' },
              ]}
            />
            <CustomButton
              title="Continue"
              onPress={handleMediaUpload}
              loading={uploading || isLoading}
              disabled={isLoading || uploading || totalMediaCount < 3}
              style={[
                styles.actionButton,
                styles.primaryButton,
                { width: '47%' },
              ]}
              textStyle={[styles.actionButtonText]}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

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
    marginBottom: correctSize(40),
  },
  mediaInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: correctSize(22),
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
  },
  uploadContainer: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: colors.blue_4,
    borderRadius: 12,
    paddingVertical: correctSize(6),
    marginBottom: correctSize(24),
  },
  uploadBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: correctSize(24),
  },
  uploadIconContainer: {
    height: correctSize(56),
    width: correctSize(56),
    backgroundColor: colors.gray_3rgb,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.gray,
    marginBottom: correctSize(13),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoIcon: {
    width: correctSize(48),
    height: correctSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue_3,
    borderRadius: 12,
    marginEnd: correctSize(12),
  },
  photoContainer: {
    flexDirection: 'row',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(3),
  },
  mediaItem: {
    width: (width - correctSize(24 * 2) - correctSize(12)) / 2, // screen padding + gap
    height: (width - correctSize(24 * 2) - correctSize(12)) / 2,
    // width: width / 2 - 20,
    // height: width / 2 - 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.lightBlue_5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  // videoContainer: {
  //     width: '100%',
  //     height: '100%',
  //     backgroundColor: colors.black,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  // },
  mediaUploadedText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_4,
  },
  countText: {
    fontSize: 24,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  countMaxText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  percentageTextContainer: {
    height: correctSize(64),
    width: correctSize(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_1,
  },
  uploadMainText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    alignSelf: 'center',
    marginBottom: correctSize(3),
  },
  uploadSubText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    alignSelf: 'center',
  },
  flatListStyle: {
    marginBottom: correctSize(20),
  },
  flatListContent: {
    justifyContent: 'space-between',
    marginBottom: correctSize(12),
  },
  closeBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 12,
    padding: correctSize(4),
    zIndex: 1,
  },
  videoDuration: {
    position: 'absolute',
    top: 5,
    left: 12,
    borderRadius: 8,
    paddingVertical: correctSize(6),
    paddingHorizontal: correctSize(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaButton: {
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineMediaButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  mediaButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    color: colors.black,
    textTransform: 'none',
    textAlign: 'center',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  outlineButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  actionButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    color: colors.black,
    textTransform: 'none',
    textAlign: 'center',
  },
});
