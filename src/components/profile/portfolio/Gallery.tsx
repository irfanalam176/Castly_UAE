// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { correctSize } from '../../../utils';
// import { Fonts } from '../../../assets/fonts';
// import { colors } from '../../../utils/colors';
// import PlusIcon from '../../../assets/svg/common/PlusIcon';
// import FastImage from 'react-native-fast-image';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { requestPhotoLibraryPermission } from '../../../utils/permissions';
// import { ROUTES } from '../../../services/routes';
// import { useAddPortfolioMutation } from '../../../services/profileAPI';
// import { presignAndUpload } from '../../../utils/uploadToS3';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../redux/stores/store';
// import Toast from 'react-native-toast-message';
// import CrossIcon from '../../vectorIcons/CrossIcon';
// import { useProfile } from '../../../hooks/useProfile';

// const MAX_PHOTOS = 6;

// type GalleryImage = {
//   id: string;
//   uri: string;
//   isLocal?: boolean;
//   isUploading?: boolean;
// };

// const resolveUri = (url: string): string =>
//   url.startsWith('uploads/') ? `${ROUTES.MEDIA_URL}${url}` : url;

// const pickImage = async (): Promise<string | null> => {
//   const granted = await requestPhotoLibraryPermission();
//   if (!granted) return null;
//   const response = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
//   if (response.didCancel || response.errorCode) return null;
//   return response.assets?.[0]?.uri ?? null;
// };

// interface GalleryProps {
//   portfolioImages: string[];
// }

// const Gallery = ({ portfolioImages }: GalleryProps) => {
//   const accessToken = useSelector((state: RootState) => state.user.accessToken);
//   const [addPortfolio] = useAddPortfolioMutation();
//   const [images, setImages] = useState<GalleryImage[]>(
//     portfolioImages.map((url, index) => ({
//       id: `api-${index}`,
//       uri: resolveUri(url),
//       isLocal: false,
//     }))
//   );
//   const {fetchProfile} = useProfile()

//   useEffect(() => {
//     setImages(prev => {
//       const localImages = prev.filter(img => img.isLocal);
//       const apiImages = portfolioImages.map((url, index) => ({
//         id: `api-${index}`,
//         uri: resolveUri(url),
//         isLocal: false,
//       }));
//       return [...apiImages, ...localImages].slice(0, MAX_PHOTOS);
//     });
//   }, [portfolioImages]);

//   const canAddMore = images.length < MAX_PHOTOS;

//   const handleAdd = async () => {
//     if (!canAddMore) return;

//     const uri = await pickImage();
//     if (!uri) return;

//     const tempId = `local-${Date.now()}`;
//     setImages(prev => [
//       ...prev,
//       { id: tempId, uri, isLocal: true, isUploading: true },
//     ]);

//     try {
//       if (!accessToken) throw new Error('No access token');

//       const filename = uri.split('/').pop() ?? `portfolio_${Date.now()}.jpg`;

//       const { key } = await presignAndUpload(uri, filename, 'image/jpeg', accessToken);

//        await addPortfolio({ key }).unwrap();

//       setImages(prev =>
//         prev.map(img =>
//           img.id === tempId ? { ...img, isUploading: false } : img
//         )
//       );

//       Toast.show({ type: 'success', text1: 'Photo added to portfolio' });
//       fetchProfile()
//     } catch (err) {
//       setImages(prev => prev.filter(img => img.id !== tempId));
//       Toast.show({ type: 'error', text1: 'Failed to upload photo' });
//     }
//   };

//   async function handleDelete(img:any){
//     console.log("imagess", img);

//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.title}>
//           Portfolio ({images.length}/{MAX_PHOTOS})
//         </Text>
//         {canAddMore && (
//           <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
//             <PlusIcon width={12} height={12} color={colors.blue_5} />
//             <Text style={styles.addText}>Add</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.grid}>
//         {images.map(img => (
//           <View key={img.id} style={styles.imageWrapper}>
//             <FastImage
//               source={{ uri: img.uri }}
//               style={styles.image}
//               resizeMode={FastImage.resizeMode.cover}
//             />
//             {img.isUploading && (
//               <View style={styles.uploadingOverlay}>
//                 <ActivityIndicator color={colors.white_1} size="small" />
//               </View>
//             )}
//             <TouchableOpacity style={styles.iconContainer} onPress={()=>handleDelete(img)} activeOpacity={0.5}>
//               <CrossIcon width={8} height={8} fillColor={colors.primary}/>
//             </TouchableOpacity>
//           </View>
//         ))}

//         {canAddMore && (
//           <View style={styles.addSlotWrapper}>
//             <TouchableOpacity style={styles.addSlot} onPress={handleAdd}>
//               <PlusIcon width={20} height={20} color={colors.gray_3} />
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default Gallery;

// const styles = StyleSheet.create({
//   container: { marginBottom: correctSize(16) },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: correctSize(10),
//   },
//   title: {
//     fontSize: 13,
//     fontFamily: Fonts.Inter_Bold,
//     color: colors.darkgray_1,
//   },
//   addBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: correctSize(5),
//   },
//   addText: {
//     fontSize: 12,
//     fontFamily: Fonts.Inter_Medium,
//     color: colors.blue_5,
//   },
//   image: { width: '100%', height: '100%',borderRadius:10 },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: correctSize(6),
//   },
//   imageWrapper: {
//     width: '31%',
//     aspectRatio: 1,
//     borderRadius: 10,
//     position:"relative"
//   },
//   uploadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addSlotWrapper: { width: '31%', aspectRatio: 1 },
//   addSlot: {
//     flex: 1,
//     borderRadius: 10,
//     borderWidth: 1.5,
//     borderColor: colors.gray_3,
//     borderStyle: 'dashed',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.white_1,
//   },
//   iconContainer:{
//     width:correctSize(20),
//     height:correctSize(20),
//     borderRadius:100,
//     backgroundColor:colors.darkgray_1,
//     alignItems:"center",
//     justifyContent:"center",
//     position:"absolute",
//     top:correctSize(-3),
//     right:correctSize(-3)
//   }
// });

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import PlusIcon from '../../../assets/svg/common/PlusIcon';
import FastImage from 'react-native-fast-image';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../../utils/permissions';
import { ROUTES } from '../../../services/routes';
import {
  useAddPortfolioMutation,
  useDeleteMediaMutation,
} from '../../../services/profileAPI';
import { presignAndUpload } from '../../../utils/uploadToS3';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/store';
import Toast from 'react-native-toast-message';
import CrossIcon from '../../vectorIcons/CrossIcon';
import { useProfile } from '../../../hooks/useProfile';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Video from 'react-native-video';
import PlayIcon from '../../../assets/svg/common/PlayIcon';
import Sound from 'react-native-sound';
import { pick, types } from '@react-native-documents/picker';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import AudioPlayerModal from '../../players/AudioPlayerModal';
import VideoPlayerModal from '../../players/VideoPlayerModal';
const MAX_MEDIA = 6;

type GalleryMedia = {
  id: string;
  key: string; // Store the actual S3 key
  uri: string; // Full URL for display
  isLocal?: boolean;
  isUploading?: boolean;
  isVideo?: boolean;
  isAudio?: boolean;
};

const pickImage = async (): Promise<{
  uri: string;
  fileName: string;
  type: string;
  isVideo: boolean;
} | null> => {
  const granted = await requestPhotoLibraryPermission();
  if (!granted) return null;
  const response = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
  });
  if (response.didCancel || response.errorCode) return null;
  const asset = response.assets?.[0];
  if (!asset?.uri) return null;
  return {
    uri: asset.uri,
    fileName: asset.fileName ?? `photo_${Date.now()}.jpg`,
    type: asset.type ?? 'image/jpeg',
    isVideo: false,
  };
};

const pickVideo = async (): Promise<{
  uri: string;
  fileName: string;
  type: string;
  isVideo: boolean;
} | null> => {
  const granted = await requestPhotoLibraryPermission();
  if (!granted) return null;
  const response = await launchImageLibrary({
    mediaType: 'video',
    selectionLimit: 1,
  });
  if (response.didCancel || response.errorCode) return null;
  const asset = response.assets?.[0];
  if (!asset?.uri) return null;
  return {
    uri: asset.uri,
    fileName: asset.fileName ?? `video_${Date.now()}.mp4`,
    type: asset.type ?? 'video/mp4',
    isVideo: true,
  };
};

const resolveDisplayUri = (key: string): string => {
  // If it's already a full URL, return as is
  if (key.startsWith('http')) return key;
  // Otherwise, prepend MEDIA_URL
  return `${ROUTES.MEDIA_URL}${key}`;
};

interface GalleryProps {
  portfolioImages: string[]; // Array of keys
}

const Gallery = ({ portfolioImages }: GalleryProps) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [addPortfolio] = useAddPortfolioMutation();
  const [deletePortfolioImage, { isLoading: isDeleting }] =
    useDeleteMediaMutation();
  const [mediaItems, setMediaItems] = useState<GalleryMedia[]>([]);
  const { fetchProfile } = useProfile();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryMedia | null>(null);
  const [activeVideoUri, setActiveVideoUri] = useState<string | null>(null);

  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [activeAudioUri, setActiveAudioUri] = useState<string | null>(null);
  // Initialize media items from props
  useEffect(() => {
    const apiMedia = portfolioImages.map((key, index) => ({
      id: key, // Use the key as ID since it's unique
      key: key,
      uri: resolveDisplayUri(key),
      isLocal: false,
      isUploading: false,
      isVideo: /\.(mp4|mov|avi|mkv|webm)$/i.test(key),
      isAudio: /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(key),
    }));

    // Keep only non-uploading local items that are not already in API
    setMediaItems(prev => {
      const localItems = prev.filter(img => img.isLocal && !img.isUploading);
      // Filter out local items that might already exist in API
      const uniqueLocalItems = localItems.filter(
        local => !apiMedia.some(api => api.key === local.key),
      );
      return [...apiMedia, ...uniqueLocalItems].slice(0, MAX_MEDIA);
    });
  }, [portfolioImages]);

  const canAddMore = mediaItems.length < MAX_MEDIA;

  const handleUpload = async (type: 'photo' | 'video') => {
    if (!canAddMore) return;

    const file = type === 'photo' ? await pickImage() : await pickVideo();
    if (!file) return;

    const tempId = `local-${Date.now()}`;
    const tempKey = `temp-${tempId}`;

    setMediaItems(prev => [
      ...prev,
      {
        id: tempId,
        key: tempKey,
        uri: file.uri,
        isLocal: true,
        isUploading: true,
        isVideo: file.isVideo,
      },
    ]);

    try {
      if (!accessToken) throw new Error('No access token');

      const { key } = await presignAndUpload(
        file.uri,
        file.fileName,
        file.type,
        accessToken,
      );

      // Add to backend
      await addPortfolio({ key }).unwrap();

      // Update local state - replace temp item with uploaded one
      setMediaItems(prev =>
        prev.map(item =>
          item.id === tempId
            ? {
                ...item,
                id: key,
                key: key,
                uri: resolveDisplayUri(key),
                isUploading: false,
              }
            : item,
        ),
      );

      Toast.show({
        type: 'success',
        text1: `${type === 'photo' ? 'Photo' : 'Video'} added to portfolio`,
      });
      fetchProfile();
    } catch (err) {
      console.log(`${type} upload error:`, err);
      setMediaItems(prev => prev.filter(item => item.id !== tempId));
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: `Could not upload ${type}. Please try again.`,
      });
    }
  };

  const pickSingleAudio = async (): Promise<{
    uri: string;
    fileName: string;
    type: string;
  } | null> => {
    try {
      const [result] = await pick({
        mode: 'open',
        type: [types.audio],
        allowMultiSelection: false,
      });
      if (!result?.uri) return null;
      return {
        uri: result.uri,
        fileName: result.name ?? `audio_${Date.now()}.mp3`,
        type: result.type ?? 'audio/mpeg',
      };
    } catch (err: any) {
      if (err?.code === 'CANCELED') return null;
      Toast.show({ type: 'error', text1: 'Could not select audio file.' });
      return null;
    }
  };

  const handleUploadAudio = async () => {
    if (!canAddMore) return;
    const file = await pickSingleAudio();
    if (!file || !accessToken) return;

    let uploadUri = file.uri;
    if (Platform.OS === 'android' && file.uri.startsWith('content://')) {
      const localCopyPath = `${RNFS.CachesDirectoryPath}/upload_${Date.now()}_${
        file.fileName
      }`;
      await RNFS.copyFile(file.uri, localCopyPath);
      uploadUri = localCopyPath;
    }

    const tempId = `local-audio-${Date.now()}`;
    setMediaItems(prev => [
      ...prev,
      {
        id: tempId,
        key: tempId,
        uri: uploadUri,
        isLocal: true,
        isUploading: true,
        isAudio: true,
      },
    ]);

    try {
      const { key } = await presignAndUpload(
        uploadUri,
        file.fileName,
        file.type,
        accessToken,
      );
      await addPortfolio({ key }).unwrap();
      setMediaItems(prev =>
        prev.map(item =>
          item.id === tempId
            ? {
                ...item,
                id: key,
                key,
                uri: resolveDisplayUri(key),
                isUploading: false,
                isAudio: true,
              }
            : item,
        ),
      );
      if (uploadUri !== file.uri) await RNFS.unlink(uploadUri).catch(() => {});
      Toast.show({ type: 'success', text1: 'Audio added to portfolio' });
      fetchProfile();
    } catch (err) {
      setMediaItems(prev => prev.filter(i => i.id !== tempId));
      Toast.show({ type: 'error', text1: 'Could not upload audio.' });
    }
  };

  const handleDeletePress = (item: GalleryMedia) => {
    setItemToDelete(item);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    // If still uploading, just remove from UI

    if (itemToDelete?.isUploading) {
      setMediaItems(prev => prev.filter(i => i.id !== itemToDelete?.id));
      return;
    }

    try {
      // For local items that haven't been uploaded yet
      if (itemToDelete?.isLocal) {
        setMediaItems(prev => prev.filter(i => i.id !== itemToDelete?.id));
        return;
      }

      // For API items, delete from backend
      await deletePortfolioImage({ key: itemToDelete?.key }).unwrap();
      Toast.show({ type: 'success', text1: 'Removed from portfolio' });
      fetchProfile();
    } catch (err) {
      console.log('Delete error:', err);
      Toast.show({ type: 'error', text1: 'Failed to remove' });
    } finally {
      setDeleteModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>
          Portfolio ({mediaItems.length}/{MAX_MEDIA})
        </Text>
        {canAddMore && (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => actionSheetRef.current?.show()}
          >
            <PlusIcon width={12} height={12} color={colors.blue_5} />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.grid}>
        {mediaItems.map(item => (
          <View key={item.id} style={styles.imageWrapper}>
            <FastImage
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />

            {/* Video overlay and play button */}
            {item.isVideo && !item.isUploading && (
              <>
                <View style={styles.videoOverlay} pointerEvents="none" />
                <TouchableOpacity
                  style={styles.playButton}
                  activeOpacity={0.9}
                  onPress={() => {
                    setActiveVideoUri(item.uri);
                    setModalVisible(true);
                  }}
                >
                  <PlayIcon width={20} height={20} />
                </TouchableOpacity>
              </>
            )}

            {item.isAudio && !item.isUploading && (
              <>
                <View style={styles.videoOverlay} pointerEvents="none" />
                <TouchableOpacity
                  style={styles.playButton}
                  activeOpacity={0.9}
                  onPress={() => {
                    setActiveAudioUri(item.uri);
                    setAudioModalVisible(true);
                  }}
                >
                  <Text style={{ fontSize: 14 }}>🎵</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Uploading overlay */}
            {item.isUploading && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator color={colors.white_1} size="small" />
              </View>
            )}

            {/* Delete button */}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => handleDeletePress(item)}
              activeOpacity={0.5}
            >
              <CrossIcon width={8} height={8} fillColor={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}

        {canAddMore && (
          <View style={styles.addSlotWrapper}>
            <TouchableOpacity
              style={styles.addSlot}
              onPress={() => actionSheetRef.current?.show()}
            >
              <PlusIcon width={20} height={20} color={colors.gray_3} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Action Sheet for media type selection */}
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={{ height: '70%' }}
      >
        <View style={pickerStyles.sheet}>
          <View style={pickerStyles.handle} />
          <Text style={pickerStyles.title}>Add to Portfolio</Text>

          <TouchableOpacity
            style={pickerStyles.option}
            onPress={() => {
              actionSheetRef.current?.hide();
              handleUpload('photo');
            }}
          >
            <View style={pickerStyles.optionIcon}>
              <Text style={pickerStyles.optionEmoji}>🖼️</Text>
            </View>
            <View>
              <Text style={pickerStyles.optionLabel}>Photo</Text>
              <Text style={pickerStyles.optionSub}>
                Select from your gallery
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={pickerStyles.option}
            onPress={() => {
              actionSheetRef.current?.hide();
              handleUpload('video');
            }}
          >
            <View style={pickerStyles.optionIcon}>
              <Text style={pickerStyles.optionEmoji}>🎬</Text>
            </View>
            <View>
              <Text style={pickerStyles.optionLabel}>Video</Text>
              <Text style={pickerStyles.optionSub}>
                Show your work in motion
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={pickerStyles.option}
            onPress={() => {
              actionSheetRef.current?.hide();
              handleUploadAudio();
            }}
          >
            <View style={pickerStyles.optionIcon}>
              <Text style={pickerStyles.optionEmoji}>🎶</Text>
            </View>
            <View>
              <Text style={pickerStyles.optionLabel}>Audio</Text>
              <Text style={pickerStyles.optionSub}>Upload an audio clip</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <VideoPlayerModal
        visible={modalVisible}
        videoUri={activeVideoUri}
        onClose={() => setModalVisible(false)}
      />

      <AudioPlayerModal
        visible={audioModalVisible}
        audioUri={activeAudioUri}
        onClose={() => {
          setAudioModalVisible(false);
          setActiveAudioUri(null);
        }}
      />

      <Modal
        visible={deleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalTitle}>Remove Media</Text>
            <Text style={styles.deleteModalMessage}>
              Are you sure you want to remove this{' '}
              {itemToDelete?.isVideo ? 'video' : 'photo'} from your portfolio?
            </Text>

            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={[styles.deleteModalButton, styles.cancelButton]}
                onPress={() => setDeleteModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteModalButton, styles.deleteButton]}
                onPress={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && (
                  <ActivityIndicator color={colors.white} size={'small'} />
                )}
                <Text style={styles.deleteButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: { marginBottom: correctSize(16) },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(10),
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  addText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.blue_5,
  },
  image: { width: '100%', height: '100%', borderRadius: 10 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: correctSize(6),
  },
  imageWrapper: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -14 }, { translateY: -14 }],
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  addSlotWrapper: { width: '31%', aspectRatio: 1 },
  addSlot: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.gray_3,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
  },
  iconContainer: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: 100,
    backgroundColor: colors.darkgray_1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    aspectRatio: 16 / 9,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  fullVideo: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  closeBtnText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },

  deleteModalContent: {
    width: '80%',
    backgroundColor: colors.white_1,
    borderRadius: 16,
    padding: correctSize(20),
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontSize: 18,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  deleteModalMessage: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    marginBottom: correctSize(24),
    lineHeight: 20,
  },
  deleteModalButtons: {
    flexDirection: 'row',
    gap: correctSize(12),
    width: '100%',
  },
  deleteModalButton: {
    flex: 1,
    paddingVertical: correctSize(12),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray_5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
    backgroundColor: colors.red,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  deleteButtonText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.white_1,
  },
});

const pickerStyles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(36),
    paddingTop: correctSize(12),
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.gray_5,
    alignSelf: 'center',
    marginBottom: correctSize(16),
  },
  title: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    color: colors.darkgray_1,
    marginBottom: correctSize(16),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(14),
    paddingVertical: correctSize(14),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_5,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.yellow_4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionEmoji: { fontSize: 20 },
  optionLabel: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 13,
    color: colors.darkgray_1,
  },
  optionSub: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 11,
    color: colors.gray_3,
    marginTop: 2,
  },
});
