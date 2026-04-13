import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import FastImage from 'react-native-fast-image';
import CameraIcon from '../../../assets/svg/common/CameraIcon';
import { images } from '../../../assets/images';
import StartIcon from '../../../assets/svg/Profile/StartIcon';
import { Fonts } from '../../../assets/fonts';
import Badge from '../../common/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/store';
import { setConfirmProfileField } from '../../../redux/reducers/confirmProfileSlice';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../../utils/permissions';
import { presignAndUpload } from '../../../utils/uploadToS3';
import Toast from 'react-native-toast-message';
import { ROUTES } from '../../../services/routes';

const ProfileCard = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const { data } = useSelector((state: RootState) => state.applyJobProgress);
  const profileData = useSelector((state: RootState) => state.profile.data);

  const [localUri, setLocalUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const avatarUrl =
  (data?.profileSnapshot?.avatarUrl || null) ??
  (profileData?.avatarUrl || null) ??
  null;
    
const avatarSource = localUri
  ? { uri: localUri }
  : avatarUrl
  ? { uri: `${ROUTES.MEDIA_URL}${avatarUrl}` }
  : undefined;
 
    
  const name =
    data?.profileSnapshot?.fullName ??
    profileData?.name ??
    '';

  const handle =
    data?.profileSnapshot?.handle ??
    profileData?.handle ??
    '';

  const completionPercent = data?.profileSnapshot?.completionPercent ?? 0;

  const rating = profileData?.rating ?? 0;
  const reviewCount = profileData?.reviewCount ?? 0;

  const handleAvatarUpload = async () => {
    const response = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (response.didCancel || response.errorCode) return;

    const asset = response.assets?.[0];
    if (!asset?.uri || !accessToken) return;

    try {
      setUploading(true);
      setLocalUri(asset.uri);

      const { key } = await presignAndUpload(
        asset.uri,
        asset.fileName ?? `avatar_${Date.now()}.jpg`,
        asset.type ?? 'image/jpeg',
        accessToken,
      );

      dispatch(setConfirmProfileField({ avatarUrl: key }));
    } catch (err) {
      setLocalUri(null);
      Toast.show({ type: 'error', text1: 'Upload failed', text2: 'Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.7} style={styles.image} onPress={handleAvatarUpload}>
          <FastImage
            source={avatarSource}
            style={styles.profileImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.iconContainer}>
            {uploading
              ? <ActivityIndicator size={10} color={colors.black} />
              : <CameraIcon width={11} height={11} color={colors.black} />
            }
          </View>
        </TouchableOpacity>

        <View style={styles.personalInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.handle}>@{handle}</Text>
          <View style={styles.ratingRow}>
            <StartIcon color={colors.primary} />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.review}>({reviewCount} reviews)</Text>
          </View>
        </View>

        <View>
          <Badge
            title={`${completionPercent}% complete`}
            containerStyle={styles.matchBadge}
            textStyle={styles.matchBadgeText}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: correctSize(16),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white_1,
    marginBottom: correctSize(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: correctSize(64),
    height: correctSize(64),
    borderRadius: 16,
    position: 'relative',
    marginRight: correctSize(16),
    backgroundColor: colors.gray_5,
  },
  profileImage: {
    width: correctSize(64),
    height: correctSize(64),
    borderRadius: 16,
  },
  iconContainer: {
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: correctSize(-12),
    right: correctSize(-12),
    backgroundColor: colors.primary,
  },
  personalInfo: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(22),
  },
  handle: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  rating: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
  review: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  matchBadge: {
    backgroundColor: colors.green_1,
  },
  matchBadgeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.green_5,
  },
});