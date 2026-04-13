import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import CameraIcon from '../../../assets/svg/common/CameraIcon';
import { ROUTES } from '../../../services/routes';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../../utils/permissions';
import { presignAndUpload } from '../../../utils/uploadToS3';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/store';

interface EditProfileImageProps {
  image?: string | null;
  onKeyChange?: (key: string, localUri: string) => void; // ✅ returns key + local uri for preview
}

const EditProfileImage = ({ image, onKeyChange }: EditProfileImageProps) => {
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
        asset.fileName ?? `avatar_${Date.now()}.jpg`,
        asset.type ?? 'image/jpeg',
        accessToken,
      );
       console.log('Got key:', key); 
      onKeyChange?.(key, asset.uri); // ✅ pass key up
    } catch (err){
      console.log('Upload failed:', err); 
      setLocalUri(null); // revert on failure
    } finally {
      setUploading(false);
    }
  };

  const imageSource = localUri
    ? { uri: localUri }
    : { uri: `${ROUTES.MEDIA_URL}${image}` };

  return (
    <TouchableOpacity
      style={styles.profileImageContainer}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <FastImage
        source={imageSource}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.profileImage}
      />
      <View style={styles.overlay} />
      <CameraIcon
        width={16}
        height={16}
        color={uploading ? colors.gray_3 : colors.white}
        style={styles.cameraIcon}
      />
    </TouchableOpacity>
  );
};

export default EditProfileImage;

const styles = StyleSheet.create({
  profileImageContainer: {
    width: correctSize(80),
    height: correctSize(80),
    borderRadius: 16,
    borderWidth: 3.4,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
    marginTop: correctSize(-40),
    marginBottom: correctSize(15.8),
    position: 'relative',
    overflow: 'hidden',
  },
  profileImage: {
    flex: 1,
    borderRadius: 16,
  },
  cameraIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: correctSize(-8) }, { translateY: correctSize(-8) }],
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});