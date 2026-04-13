// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native';
// import React, { useState } from 'react';
// import { Fonts } from '../../assets/fonts';
// import { colors } from '../../utils/colors';
// import { correctSize } from '../../utils';
// import CameraButton from '../../components/onboarding/CameraButton';
// import AddButton from '../../components/onboarding/AddButton';
// import PlusIcon from '../../assets/svg/common/PlusIcon';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// import { requestPhotoLibraryPermission } from '../../utils/permissions';
// import { SlideLeftFade } from '../../components/Animation';
// import { useDispatch, useSelector } from 'react-redux';
// import { setField } from '../../redux/reducers/onboardingSlice';
// import { RootState } from '../../redux/stores/store';
// import { presignAndUpload } from '../../utils/uploadToS3';
// import { ROUTES } from '../../services/routes';
// import { ActionSheetIOS, Platform, Alert } from 'react-native';

// const MAX_MEDIA = 6;
// const STAGGER = 150;

// // ─── Types ───────────────────────────────────────────────────────────────────

// type MediaItem = {
//   uri: string;
//   fileName: string;
//   type: string;
//   isVideo: boolean;
// };

// // ─── Pickers ─────────────────────────────────────────────────────────────────

// const pickSingleImage = async (): Promise<MediaItem | null> => {
//   const granted = await requestPhotoLibraryPermission();
//   if (!granted) return null;
//   const response = await launchImageLibrary({
//     mediaType: 'photo',
//     selectionLimit: 1,
//   });
//   if (response.didCancel || response.errorCode) return null;
//   const asset = response.assets?.[0];
//   if (!asset?.uri) return null;
//   return {
//     uri: asset.uri,
//     fileName: asset.fileName ?? `photo_${Date.now()}.jpg`,
//     type: asset.type ?? 'image/jpeg',
//     isVideo: false,
//   };
// };

// const pickMultipleImages = async (limit: number): Promise<MediaItem[]> => {
//   const granted = await requestPhotoLibraryPermission();
//   if (!granted) return [];
//   const response = await launchImageLibrary({
//     mediaType: 'photo',
//     selectionLimit: limit,
//   });
//   if (response.didCancel || response.errorCode) return [];
//   return (response.assets ?? [])
//     .filter(a => !!a.uri)
//     .map(a => ({
//       uri: a.uri!,
//       fileName: a.fileName ?? `photo_${Date.now()}.jpg`,
//       type: a.type ?? 'image/jpeg',
//       isVideo: false,
//     }));
// };

// const pickSingleVideo = async (): Promise<MediaItem | null> => {
//   const granted = await requestPhotoLibraryPermission();
//   if (!granted) return null;
//   const response = await launchImageLibrary({
//     mediaType: 'video',
//     selectionLimit: 1,
//   });
//   if (response.didCancel || response.errorCode) return null;
//   const asset = response.assets?.[0];
//   if (!asset?.uri) return null;
//   return {
//     uri: asset.uri,
//     fileName: asset.fileName ?? `video_${Date.now()}.mp4`,
//     type: asset.type ?? 'video/mp4',
//     isVideo: true,
//   };
// };

// // ─── Upload helper (unchanged from your original) ────────────────────────────

// const uploadOrFallback = async (
//   uri: string,
//   fileName: string,
//   type: string,
//   accessToken: string | null,
// ): Promise<{ url: string; key: string | null }> => {
//   if (!accessToken) return { url: uri, key: null };
//   try {
//     const { fileUrl, key } = await presignAndUpload(uri, fileName, type, accessToken);
//     return { url: fileUrl, key };
//   } catch {
//     return { url: uri, key: null };
//   }
// };

// // ─── Action sheet to choose Photo vs Video ───────────────────────────────────

// const showMediaPicker = (
//   onPhoto: () => void,
//   onVideo: () => void,
// ) => {
//   if (Platform.OS === 'ios') {
//     ActionSheetIOS.showActionSheetWithOptions(
//       {
//         options: ['Cancel', 'Photo', 'Video'],
//         cancelButtonIndex: 0,
//       },
//       index => {
//         if (index === 1) onPhoto();
//         if (index === 2) onVideo();
//       },
//     );
//   } else {
//     // Android: use Alert as a simple action sheet substitute
//     Alert.alert('Add Media', 'Choose what to add', [
//       { text: 'Photo', onPress: onPhoto },
//       { text: 'Video', onPress: onVideo },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   }
// };

// // ─── Component ───────────────────────────────────────────────────────────────

// // Local display item: uri + whether it's a video
// type DisplayItem = { uri: string; isVideo: boolean };

// const Portfolio = () => {
//   const dispatch = useDispatch();
//   const { imageUrl, portfolioImages } = useSelector(
//     (state: RootState) => state.onboarding,
//   );
//   const accessToken = useSelector((state: RootState) => state.user.accessToken);

//   const [profileUri, setProfileUri] = useState<string | null>(imageUrl);
//   const [mediaItems, setMediaItems] = useState<DisplayItem[]>(
//     portfolioImages?.map(img => ({
//       uri: `${ROUTES.MEDIA_URL}${img}`,
//       // Detect video by extension for pre-seeded items
//       isVideo: /\.(mp4|mov|avi|mkv|webm)$/i.test(img),
//     })) || [],
//   );
//   const [uploadingProfile, setUploadingProfile] = useState(false);
//   const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

//   const canAddMore = mediaItems.length < MAX_MEDIA;

//   // ── Profile photo (unchanged logic) ──────────────────────────────────────

//   const handleProfilePress = async () => {
//     const file = await pickSingleImage();
//     if (!file) return;
//     setProfileUri(file.uri);
//     setUploadingProfile(true);
//     try {
//       const { url, key } = await uploadOrFallback(
//         file.uri, file.fileName, file.type, accessToken,
//       );
//       dispatch(setField({ imageUrl: key ?? url }));
//     } finally {
//       setUploadingProfile(false);
//     }
//   };

//   // ── Add Photos (multi-pick, same as before) ───────────────────────────────

//   const handleAddPhotos = async () => {
//     const remaining = MAX_MEDIA - mediaItems.length;
//     if (remaining <= 0) return;

//     const files = await pickMultipleImages(remaining);
//     if (!files.length) return;

//     const capped = files.slice(0, remaining);
//     const startIndex = mediaItems.length;

//     // Optimistically show local URIs
//     setMediaItems(prev => [...prev, ...capped.map(f => ({ uri: f.uri, isVideo: false }))]);

//     // Upload sequentially
//     const uploadedKeys: string[] = [];
//     for (let i = 0; i < capped.length; i++) {
//       const { uri, fileName, type } = capped[i];
//       setUploadingIndex(startIndex + i);
//       const { url, key } = await uploadOrFallback(uri, fileName, type, accessToken);
//       uploadedKeys.push(key ?? url);
//     }
//     setUploadingIndex(null);

//     // Replace optimistic local URIs with resolved display URIs
//     setMediaItems(prev => {
//       const existing = prev.slice(0, startIndex);
//       const resolved = uploadedKeys.map(u => ({
//         uri: u.startsWith('http') ? u : `${ROUTES.MEDIA_URL}${u}`,
//         isVideo: false,
//       }));
//       return [...existing, ...resolved];
//     });

//     dispatch(setField({
//       portfolioImages: [...portfolioImages, ...uploadedKeys],
//     }));
//   };

//   // ── Add Video (single pick) ───────────────────────────────────────────────

//   const handleAddVideo = async () => {
//     const remaining = MAX_MEDIA - mediaItems.length;
//     if (remaining <= 0) return;

//     const file = await pickSingleVideo();
//     if (!file) return;

//     const insertIndex = mediaItems.length;

//     // Optimistically show local URI
//     setMediaItems(prev => [...prev, { uri: file.uri, isVideo: true }]);
//     setUploadingIndex(insertIndex);

//     try {
//       const { url, key } = await uploadOrFallback(
//         file.uri, file.fileName, file.type, accessToken,
//       );
//       const finalKey = key ?? url;

//       // Replace optimistic local URI
//       setMediaItems(prev => {
//         const copy = [...prev];
//         copy[insertIndex] = {
//           uri: finalKey.startsWith('http') ? finalKey : `${ROUTES.MEDIA_URL}${finalKey}`,
//           isVideo: true,
//         };
//         return copy;
//       });

//       dispatch(setField({
//         portfolioImages: [...portfolioImages, finalKey],
//       }));
//     } finally {
//       setUploadingIndex(null);
//     }
//   };

//   // ── Unified "Add Media" tap — shows action sheet ──────────────────────────

//   const handleAddMedia = () => {
//     showMediaPicker(handleAddPhotos, handleAddVideo);
//   };

//   // ── Remove ────────────────────────────────────────────────────────────────

//   const handleRemoveMedia = (index: number) => {
//     setMediaItems(prev => prev.filter((_, i) => i !== index));
//     dispatch(setField({
//       portfolioImages: portfolioImages.filter((_, i) => i !== index),
//     }));
//   };

//   console.log("media items",mediaItems);

//   // ─────────────────────────────────────────────────────────────────────────

//   return (
//     <View>
//       <SlideLeftFade delay={STAGGER * 1}>
//         <Text style={styles.title}>Show your work</Text>
//         <Text style={styles.subHeading}>
//           Upload photos and videos to attract more bookings.
//         </Text>
//       </SlideLeftFade>

//       <SlideLeftFade delay={STAGGER * 2}>
//         <Text style={styles.inputLabel}>Profile Photo *</Text>
//         <View style={styles.mainPhotoRow}>
//           <View>
//             <CameraButton
//               uri={`${ROUTES.MEDIA_URL}${profileUri}`}
//               onPress={handleProfilePress}
//             />
//             {uploadingProfile && (
//               <ActivityIndicator
//                 style={styles.profileLoader}
//                 size="small"
//                 color={colors.darkgray_1}
//               />
//             )}
//           </View>
//           <View>
//             <Text style={styles.photoText}>Your main photo</Text>
//             <Text style={styles.photoTip}>
//               Clear, well-lit face photo {'\n'}No sunglasses or filters
//             </Text>
//           </View>
//         </View>
//       </SlideLeftFade>

//       <SlideLeftFade delay={STAGGER * 3}>
//         <View style={styles.row}>
//           <Text style={styles.inputLabel}>
//             Portfolio ({mediaItems.length}/{MAX_MEDIA})
//           </Text>
//           {canAddMore && (
//             <Pressable
//               style={styles.addBtn}
//               onPress={handleAddMedia}
//               disabled={uploadingIndex !== null}
//             >
//               <PlusIcon width={10} height={10} color={colors.blue_5} />
//               <Text style={styles.addText}>Add Photos / Videos</Text>
//             </Pressable>
//           )}
//         </View>
//       </SlideLeftFade>

//       <SlideLeftFade delay={STAGGER * 4}>
//         <View style={styles.grid}>
//           {mediaItems.map((item, index) => (
//             <View key={index}>
//               <AddButton
//                 uri={item.uri}
//                 isVideo={item.isVideo}           // ← pass this to show a play icon badge
//                 onRemove={() => handleRemoveMedia(index)}
//               />
//               {uploadingIndex === index && (
//                 <ActivityIndicator
//                   style={styles.gridLoader}
//                   size="small"
//                   color={colors.darkgray_1}
//                 />
//               )}
//             </View>
//           ))}
//           {canAddMore && uploadingIndex === null && (
//             <AddButton onPress={handleAddMedia} />
//           )}
//         </View>
//       </SlideLeftFade>

//       <SlideLeftFade delay={STAGGER * 5}>
//         <Text style={styles.banner}>
//           ⚡ Talent with 4+ portfolio items get{' '}
//           <Text style={styles.boldText}>3× more brand views</Text> in their
//           first week.
//         </Text>
//       </SlideLeftFade>
//     </View>
//   );
// };

// export default Portfolio;

// const styles = StyleSheet.create({
//   title: {
//     fontFamily: Fonts.InriaSerif_Bold,
//     fontSize: 20,
//     color: colors.darkgray_1,
//   },
//   subHeading: {
//     fontSize: 13,
//     fontFamily: Fonts.Inter_Regular,
//     color: colors.gray_3,
//     marginBottom: correctSize(16),
//   },
//   inputLabel: {
//     fontSize: 12,
//     fontFamily: Fonts.Inter_SemiBold,
//     color: colors.darkgray,
//     marginBottom: correctSize(6),
//   },
//   mainPhotoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: correctSize(16),
//     marginBottom: correctSize(8),
//   },
//   profileLoader: {
//     position: 'absolute',
//     bottom: 4,
//     alignSelf: 'center',
//   },
//   gridLoader: {
//     position: 'absolute',
//     top: '40%',
//     alignSelf: 'center',
//   },
//   photoText: {
//     fontFamily: Fonts.Inter_Medium,
//     fontSize: 13,
//     color: colors.darkgray,
//     lineHeight: correctSize(20),
//   },
//   photoTip: {
//     fontSize: 11,
//     fontFamily: Fonts.Inter_Regular,
//     lineHeight: correctSize(16),
//     color: colors.gray_3,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: correctSize(16),
//   },
//   addText: {
//     fontSize: 12,
//     fontFamily: Fonts.Inter_Medium,
//     color: colors.blue_5,
//   },
//   addBtn: { flexDirection: 'row', alignItems: 'center', gap: correctSize(5) },
//   grid: { flexDirection: 'row', flexWrap: 'wrap', gap: correctSize(10) },
//   banner: {
//     color: colors.darkBrown_2,
//     fontSize: 12,
//     fontFamily: Fonts.Inter_Regular,
//     lineHeight: correctSize(18),
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: colors.primary,
//     backgroundColor: colors.yellow_4,
//     padding: correctSize(12.7),
//     marginTop: correctSize(16),
//   },
//   boldText: { fontFamily: Fonts.Inter_Bold },
// });

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import CameraButton from '../../components/onboarding/CameraButton';
import AddButton from '../../components/onboarding/AddButton';
import PlusIcon from '../../assets/svg/common/PlusIcon';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../utils/permissions';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';
import { presignAndUpload } from '../../utils/uploadToS3';
import { ROUTES } from '../../services/routes';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useRef } from 'react';
import { pick, types } from '@react-native-documents/picker';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import AudioPlayerModal from '../../components/players/AudioPlayerModal';
const MAX_MEDIA = 6;
const STAGGER = 150;

// ─── Types ───────────────────────────────────────────────────────────────────

type MediaItem = {
  uri: string;
  fileName: string;
  type: string;
  isVideo: boolean;
};

type DisplayItem = { uri: string; isVideo: boolean; isAudio?: boolean };

// ─── Pickers ─────────────────────────────────────────────────────────────────

const pickSingleImage = async (): Promise<MediaItem | null> => {
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

const pickMultipleImages = async (limit: number): Promise<MediaItem[]> => {
  const granted = await requestPhotoLibraryPermission();
  if (!granted) return [];
  const response = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: limit,
  });
  if (response.didCancel || response.errorCode) return [];
  return (response.assets ?? [])
    .filter(a => !!a.uri)
    .map(a => ({
      uri: a.uri!,
      fileName: a.fileName ?? `photo_${Date.now()}.jpg`,
      type: a.type ?? 'image/jpeg',
      isVideo: false,
    }));
};

const pickSingleVideo = async (): Promise<MediaItem | null> => {
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

// ─── Upload helper ────────────────────────────────────────────────────────────

const uploadOrFallback = async (
  uri: string,
  fileName: string,
  type: string,
  accessToken: string | null,
): Promise<{ url: string; key: string | null }> => {
  if (!accessToken) return { url: uri, key: null };
  try {
    const { fileUrl, key } = await presignAndUpload(
      uri,
      fileName,
      type,
      accessToken,
    );
    return { url: fileUrl, key };
  } catch {
    return { url: uri, key: null };
  }
};

// ─── Component ───────────────────────────────────────────────────────────────

const Portfolio = () => {
  const dispatch = useDispatch();
  const { imageUrl, portfolioImages } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  // const [profileUri, setProfileUri] = useState<string | null>(imageUrl);
  const [mediaItems, setMediaItems] = useState<DisplayItem[]>(
    portfolioImages?.map((img: any) => ({
      uri: `${ROUTES.MEDIA_URL}${img}`,
      isVideo: /\.(mp4|mov|avi|mkv|webm)$/i.test(img),
      isAudio: /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(img), 
    })) || [],
  );
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [activeAudioUri, setActiveAudioUri] = useState<string | null>(null);
  const canAddMore = mediaItems.length < MAX_MEDIA;

  // ── Profile photo ─────────────────────────────────────────────────────────

  const handleProfilePress = async () => {
    const file = await pickSingleImage();
    if (!file) return;
    // setProfileUri(file.uri);
    setUploadingProfile(true);
    try {
      const { url, key } = await uploadOrFallback(
        file.uri,
        file.fileName,
        file.type,
        accessToken,
      );

      dispatch(setField({ imageUrl: key ?? url }));
    } finally {
      setUploadingProfile(false);
    }
  };

  // ── Add Photos ────────────────────────────────────────────────────────────

  const handleAddPhotos = async () => {
    const remaining = MAX_MEDIA - mediaItems.length;
    if (remaining <= 0) return;

    const files = await pickMultipleImages(remaining);
    if (!files.length) return;

    const capped = files.slice(0, remaining);
    const startIndex = mediaItems.length;

    setMediaItems(prev => [
      ...prev,
      ...capped.map(f => ({ uri: f.uri, isVideo: false })),
    ]);

    const uploadedKeys: string[] = [];
    for (let i = 0; i < capped.length; i++) {
      const { uri, fileName, type } = capped[i];
      setUploadingIndex(startIndex + i);
      const { url, key } = await uploadOrFallback(
        uri,
        fileName,
        type,
        accessToken,
      );
      uploadedKeys.push(key ?? url);
    }
    setUploadingIndex(null);

    setMediaItems(prev => {
      const existing = prev.slice(0, startIndex);
      const resolved = uploadedKeys.map(u => ({
        uri: u.startsWith('http') ? u : `${ROUTES.MEDIA_URL}${u}`,
        isVideo: false,
      }));
      return [...existing, ...resolved];
    });

    dispatch(
      setField({ portfolioImages: [...portfolioImages, ...uploadedKeys] }),
    );
  };

  // ── Add Video ─────────────────────────────────────────────────────────────

  const handleAddVideo = async () => {
    const remaining = MAX_MEDIA - mediaItems.length;
    if (remaining <= 0) return;

    const file = await pickSingleVideo();
    if (!file) return;

    const insertIndex = mediaItems.length;
    setMediaItems(prev => [...prev, { uri: file.uri, isVideo: true }]);
    setUploadingIndex(insertIndex);

    try {
      const { url, key } = await uploadOrFallback(
        file.uri,
        file.fileName,
        file.type,
        accessToken,
      );
      const finalKey = key ?? url;

      setMediaItems(prev => {
        const copy = [...prev];
        copy[insertIndex] = {
          uri: finalKey.startsWith('http')
            ? finalKey
            : `${ROUTES.MEDIA_URL}${finalKey}`,
          isVideo: true,
        };
        return copy;
      });

      dispatch(setField({ portfolioImages: [...portfolioImages, finalKey] }));
    } finally {
      setUploadingIndex(null);
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
      return null;
    }
  };

  const handleAddAudio = async () => {
    const remaining = MAX_MEDIA - mediaItems.length;
    if (remaining <= 0) return;

    const file = await pickSingleAudio();
    if (!file) return;

    let uploadUri = file.uri;
    if (Platform.OS === 'android' && file.uri.startsWith('content://')) {
      const localCopyPath = `${RNFS.CachesDirectoryPath}/upload_${Date.now()}_${
        file.fileName
      }`;
      await RNFS.copyFile(file.uri, localCopyPath);
      uploadUri = localCopyPath;
    }

    const insertIndex = mediaItems.length;
    setMediaItems(prev => [
      ...prev,
      { uri: uploadUri, isVideo: false, isAudio: true },
    ]);
    setUploadingIndex(insertIndex);

    try {
      const { url, key } = await uploadOrFallback(
        uploadUri,
        file.fileName,
        file.type,
        accessToken,
      );
      const finalKey = key ?? url;

      setMediaItems(prev => {
        const copy = [...prev];
        copy[insertIndex] = {
          uri: finalKey.startsWith('http')
            ? finalKey
            : `${ROUTES.MEDIA_URL}${finalKey}`,
          isVideo: false,
          isAudio: true,
        };
        return copy;
      });

      dispatch(setField({ portfolioImages: [...portfolioImages, finalKey] }));

      // Clean up temp file if created
      if (uploadUri !== file.uri) await RNFS.unlink(uploadUri).catch(() => {});
    } finally {
      setUploadingIndex(null);
    }
  };
  // ── Remove ────────────────────────────────────────────────────────────────

  const handleRemoveMedia = (index: number) => {
    setMediaItems(prev => prev.filter((_, i) => i !== index));
    dispatch(
      setField({
        portfolioImages: portfolioImages.filter(
          (_: any, i: any) => i !== index,
        ),
      }),
    );
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Show your work</Text>
        <Text style={styles.subHeading}>
          Upload photos and videos to attract more bookings.
        </Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <Text style={styles.inputLabel}>Profile Photo *</Text>
        <View style={styles.mainPhotoRow}>
          <View>
            <CameraButton
              uri={`${ROUTES.MEDIA_URL}${imageUrl}`}
              onPress={handleProfilePress}
            />
            {uploadingProfile && (
              <ActivityIndicator
                style={styles.profileLoader}
                size="small"
                color={colors.darkgray_1}
              />
            )}
          </View>
          <View>
            <Text style={styles.photoText}>Your main photo</Text>
            <Text style={styles.photoTip}>
              Clear, well-lit face photo {'\n'}No sunglasses or filters
            </Text>
          </View>
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 3}>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>
            Portfolio ({mediaItems.length}/{MAX_MEDIA})
          </Text>
          {canAddMore && (
            <Pressable
              style={styles.addBtn}
              onPress={() => actionSheetRef.current?.show()}
              disabled={uploadingIndex !== null}
            >
              <PlusIcon width={10} height={10} color={colors.blue_5} />
              <Text style={styles.addText}>Add Photos / Videos</Text>
            </Pressable>
          )}
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        <View style={styles.grid}>
          {mediaItems?.map((item, index) => {
            console.log(item);
            
            return (
            <View key={index}>
              <AddButton
                uri={item.uri}
                isVideo={item.isVideo}
                isAudio={item.isAudio}
                onAudioPress={() => {
                  setActiveAudioUri(item.uri);
                  setAudioModalVisible(true);
                }}
                onRemove={() => handleRemoveMedia(index)}
              />
              {uploadingIndex === index && (
                <ActivityIndicator
                  style={styles.gridLoader}
                  size={'small'}
                  color={colors.primary}
                />
              )}
            </View>
          )
          })}
          {canAddMore && uploadingIndex === null && (
            <AddButton onPress={() => actionSheetRef.current?.show()} />
          )}
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 5}>
        <Text style={styles.banner}>
          ⚡ Talent with 4+ portfolio items get{' '}
          <Text style={styles.boldText}>3× more brand views</Text> in their
          first week.
        </Text>
      </SlideLeftFade>

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
              handleAddPhotos();
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
              handleAddVideo();
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
              handleAddAudio();
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

      <AudioPlayerModal
        visible={audioModalVisible}
        audioUri={activeAudioUri}
        onClose={() => {
          setAudioModalVisible(false);
          setActiveAudioUri(null);
        }}
      />
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.darkgray_1,
  },
  subHeading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(16),
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
    marginBottom: correctSize(6),
  },
  mainPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(16),
    marginBottom: correctSize(8),
  },
  profileLoader: {
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
  },
  gridLoader: {
    position: 'absolute',
    top: correctSize(3),
    left: correctSize(3),
    alignSelf: 'center',
    zIndex: 999,
  },
  photoText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 13,
    color: colors.darkgray,
    lineHeight: correctSize(20),
  },
  photoTip: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: correctSize(16),
    color: colors.gray_3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: correctSize(16),
  },
  addText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.blue_5,
  },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: correctSize(5) },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: correctSize(10) },
  banner: {
    color: colors.darkBrown_2,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: correctSize(18),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.yellow_4,
    padding: correctSize(12.7),
    marginTop: correctSize(16),
  },
  boldText: { fontFamily: Fonts.Inter_Bold },
});

// ─── Picker Modal Styles ──────────────────────────────────────────────────────

const pickerStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheetStyle: {
    height: '60%',
  },
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
  optionEmoji: {
    fontSize: 20,
  },
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
  cancelBtn: {
    marginTop: correctSize(16),
    alignItems: 'center',
    paddingVertical: correctSize(12),
  },
  cancelText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 13,
    color: colors.gray_3,
  },
});
