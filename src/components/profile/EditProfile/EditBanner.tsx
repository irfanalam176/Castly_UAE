import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { correctSize } from '../../../utils';
import CameraIcon from '../../../assets/svg/common/CameraIcon';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../../utils/permissions';
import { presignAndUpload } from '../../../utils/uploadToS3';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/store';
import { ROUTES } from '../../../services/routes';

interface EditBannerProps {
  onKeyChange?: (key: string, localUri: string) => void; 
  image?:string | null
}

const EditBanner = ({ onKeyChange,image }: EditBannerProps) => {
  const [localUri, setLocalUri] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const handlePress = async () => {
    const granted = await requestPhotoLibraryPermission();
    if (!granted) return;

    const response = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (response.didCancel || response.errorCode) return;

    const asset = response.assets?.[0];
    if (!asset?.uri || !accessToken) return;

    setLocalUri(asset.uri); // show immediately
    setUploading(true);

    try {
      const { key } = await presignAndUpload(
        asset.uri,
        asset.fileName ?? `banner_${Date.now()}.jpg`,
        asset.type ?? 'image/jpeg',
        accessToken,
      );
      onKeyChange?.(key, asset.uri); 
    } catch {
      setLocalUri(null);
    } finally {
      setUploading(false);
    }
  };

  const imageSource =
  localUri
    ? { uri: localUri }
    : image
    ? { uri: `${ROUTES.MEDIA_URL}${image}`}
    : undefined;
  return (
    <View style={styles.banner}>
      <FastImage
        source={imageSource}
        style={styles.bannerImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.overlay} />
      <TouchableOpacity
        style={styles.cameraButton}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <View style={styles.iconContainer}>
          <CameraIcon
            width={16}
            height={16}
            color={uploading ? colors.gray_3 : colors.white}
          />
        </View>
        <Text style={styles.editText}>
          {uploading ? 'Uploading...' : 'Change Cover'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditBanner;

const styles = StyleSheet.create({
  banner: {
    height: correctSize(144),
    position: 'relative',
  },
  bannerImage: {
    height: '100%',
    width: '100%',
  },
  cameraButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: correctSize(-30) }, { translateY: correctSize(-30) }],
    gap: correctSize(4),
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 100,
    borderWidth: 0.7,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
  },
  editText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white,
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});