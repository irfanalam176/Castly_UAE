// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Fonts } from '../../../../assets/fonts';
// import { colors } from '../../../../utils/colors';
// import { correctSize } from '../../../../utils';
// import WorkSampleCard from '../../../../components/applications/applyJob/WorkSampleCard';
// import { useProfile } from '../../../../hooks/useProfile';
// import FastImage from 'react-native-fast-image';
// import { ROUTES } from '../../../../services/routes';
// import UploadMediaBtn from '../../../../components/applications/applyJob/UploadMediaBtn';
// import CheckIcon from '../../../../assets/svg/applications/CheckIcon';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { requestPhotoLibraryPermission } from '../../../../utils/permissions';
// import { presignAndUpload } from '../../../../utils/uploadToS3';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../../redux/stores/store';
// import {
//   addSelection,
//   removeSelection,
//   resetPortfolio,
// } from '../../../../redux/reducers/portfolioSlice';
// import Toast from 'react-native-toast-message';
// import { SlideLeftFade } from '../../../../components/Animation';

// const MAX_SELECTED = 4;

// type GridImage = {
//   id: string;
//   uri: string;
//   isLocal?: boolean;
// };

// const Portfolio = () => {
//   const dispatch = useDispatch();
//   const { profile } = useProfile();
//   const accessToken = useSelector((state: RootState) => state.user.accessToken);
//   const selections = useSelector(
//     (state: RootState) => state.portfolio.selections,
//   );
//   const { data } = useSelector((state: RootState) => state.applyJobProgress);

//   const [localImages, setLocalImages] = useState<GridImage[]>([]);
//   const [uploadingId, setUploadingId] = useState<string | null>(null);

// useEffect(() => {
//   // Don't reset if we have local uploads that haven't been saved
//   if (localImages.length > 0 && uploadingId === null) {
//     return;
//   }

//   if (!data?.portfolioSelections?.length) return;
//   dispatch(resetPortfolio());
//   data.portfolioSelections.forEach(s => {
//     dispatch(
//       addSelection({
//         sourcePortfolioImageId: s.id,
//         assetUrl: s.assetUrl,
//         title: s.title ?? '',
//         category: s.category ?? '',
//         isUploaded: s.isUploaded,
//       }),
//     );
//   });
// }, [data?.portfolioSelections, localImages.length, uploadingId]);

//   const apiImages: GridImage[] = (profile?.portfolioImages ?? []).map(item => ({
//     id: item.id,
//     uri: `${ROUTES.MEDIA_URL}${item.url}`,
//     isLocal: false,
//   }));

//   const progressImages: GridImage[] = (data?.portfolioSelections ?? [])
//     .filter(s => !apiImages.find(a => a.id === s.id))
//     .map(s => ({
//       id: s.id,
//       uri: `${ROUTES.MEDIA_URL}${s.assetUrl}`,
//       isLocal: false,
//     }));

//   const allImages = [...apiImages, ...progressImages, ...localImages];

//   const selectedIds = selections.map((s: any) => s.sourcePortfolioImageId);

//  const toggleSelect = (image: GridImage) => {
//   const isSelected = selectedIds.includes(image.id);
//   if (!isSelected && selectedIds.length >= MAX_SELECTED) return;

//   if (isSelected) {
//     dispatch(removeSelection(image.id));
//   } else {
//     // Handle selection for all images (both local and from API)
//     if (image.isLocal) {
//       // For local/uploaded images
//       dispatch(
//         addSelection({
//           sourcePortfolioImageId: image.id,
//           assetUrl: image.id, // The key is stored as the id
//           title: '',
//           category: '',
//           isUploaded: true,
//         }),
//       );
//     } else {
//       // For API images
//       const apiItem = profile?.portfolioImages?.find(p => p.id === image.id);
//       dispatch(
//         addSelection({
//           sourcePortfolioImageId: image.id,
//           assetUrl: apiItem?.url ?? '',
//           title: '',
//           category: '',
//           isUploaded: false,
//         }),
//       );
//     }
//   }
// };

//   const handleUpload = async () => {
//     const granted = await requestPhotoLibraryPermission();
//     if (!granted) return;

//     const response = await launchImageLibrary({
//       mediaType: 'photo',
//       selectionLimit: 1,
//     });
//     if (response.didCancel || response.errorCode) return;

//     const asset = response.assets?.[0];
//     if (!asset?.uri || !accessToken) return;

//     const tempId = `local-${Date.now()}`;
//     const newImage: GridImage = { id: tempId, uri: asset.uri, isLocal: true };

//     setLocalImages(prev => [...prev, newImage]);
//     setUploadingId(tempId);

//     try {
//       const { key } = await presignAndUpload(
//         asset.uri,
//         asset.fileName ?? `portfolio_${Date.now()}.jpg`,
//         asset.type ?? 'image/jpeg',
//         accessToken,
//       );

//       console.log("key = ", key);

//       setLocalImages(prev =>
//         prev.map(img => (img.id === tempId ? { ...img, id: key } : img)),
//       );

//       if (selectedIds.length < MAX_SELECTED) {
//         dispatch(
//           addSelection({
//             sourcePortfolioImageId: key,
//             assetUrl: key,
//             title: '',
//             category: '',
//             isUploaded: true,
//           }),
//         );

//       }
//     } catch (err) {
//       console.log('Portfolio upload error:', err);
//       setLocalImages(prev => prev.filter(img => img.id !== tempId));
//       Toast.show({
//         type: 'error',
//         text1: 'Upload failed',
//         text2: 'Could not upload image. Please try again.',
//       });
//     } finally {
//       setUploadingId(null);
//     }
//   };

//   const isMaxReached = selectedIds.length >= MAX_SELECTED;

//   const STAGGER = 150;
//   return (
//     <View>
//       <SlideLeftFade delay={STAGGER * 1}>
//         <Text style={styles.title}>Select Portfolio Samples</Text>
//         <Text style={styles.subHeading}>Showcase your most relevant work.</Text>
//       </SlideLeftFade>

//       <SlideLeftFade delay={STAGGER * 2}>
//         <WorkSampleCard count={selectedIds.length} />
//       </SlideLeftFade>
//       <SlideLeftFade delay={STAGGER * 3}>
//         <View style={styles.grid}>
//           {allImages.map(item => {
//             const isSelected = selectedIds.includes(item.id);
//             const isUploading = uploadingId === item.id;
//             const isDisabled = (isMaxReached && !isSelected) || isUploading;

//             return (
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 key={item.id}
//                 style={styles.imageContainer}
//                 onPress={() => toggleSelect(item)}
//                 disabled={isDisabled}
//               >
//                 <FastImage
//                   source={{ uri: item.uri }}
//                   resizeMode={FastImage.resizeMode.cover}
//                   style={styles.image}
//                 />

//                 {isUploading && <View style={styles.disabledOverlay} />}

//                 {isDisabled && !isUploading && (
//                   <View style={styles.disabledOverlay} />
//                 )}

//                 {isSelected && <View style={styles.overlay} />}

//                 {isSelected && (
//                   <View style={styles.iconContainer}>
//                     <CheckIcon color={colors.primary} />
//                   </View>
//                 )}
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </SlideLeftFade>

//       <SlideLeftFade delay={STAGGER * 4}>
//         <UploadMediaBtn onPress={handleUpload} />
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
//   grid: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     rowGap: correctSize(12),
//     marginBottom: correctSize(14),
//   },
//   imageContainer: {
//     height: correctSize(111),
//     width: '49%',
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 16,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: colors.overlay,
//   },
//   disabledOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255,255,255,0.55)',
//   },
//   iconContainer: {
//     position: 'absolute',
//     top: correctSize(8),
//     right: correctSize(8),
//     width: correctSize(24),
//     height: correctSize(24),
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.darkgray_1,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Fonts } from '../../../../assets/fonts';
import { colors } from '../../../../utils/colors';
import { correctSize } from '../../../../utils';
import WorkSampleCard from '../../../../components/applications/applyJob/WorkSampleCard';
import { useProfile } from '../../../../hooks/useProfile';
import FastImage from 'react-native-fast-image';
import { ROUTES } from '../../../../services/routes';
import UploadMediaBtn from '../../../../components/applications/applyJob/UploadMediaBtn';
import CheckIcon from '../../../../assets/svg/applications/CheckIcon';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../../../utils/permissions';
import { presignAndUpload } from '../../../../utils/uploadToS3';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/stores/store';
import {
  addSelection,
  removeSelection,
  resetPortfolio,
} from '../../../../redux/reducers/portfolioSlice';
import Toast from 'react-native-toast-message';
import { SlideLeftFade } from '../../../../components/Animation';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Video from 'react-native-video';
import PlayIcon from '../../../../assets/svg/common/PlayIcon';
import Sound from 'react-native-sound';
import { pick, types } from '@react-native-documents/picker';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import PauseIcon from '../../../../assets/svg/common/PauseIcon';
import ForwardIcon from '../../../../assets/svg/common/ForwardIcon';
import BackwardIcon from '../../../../assets/svg/common/BackwardIcon';
import VideoPlayerModal from '../../../../components/players/VideoPlayerModal';
import AudioPlayerModal from '../../../../components/players/AudioPlayerModal';
const MAX_SELECTED = 4;
const STAGGER = 150;

// ─── Types ────────────────────────────────────────────────────────────────────

type GridImage = {
  id: string;
  uri: string;
  isLocal?: boolean;
  isVideo?: boolean;
  isAudio?: boolean; // Add this line
};

// ─── Pickers ──────────────────────────────────────────────────────────────────

const pickSingleVideo = async (): Promise<{
  uri: string;
  fileName: string;
  type: string;
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
  };
};

// ─── Component ────────────────────────────────────────────────────────────────

const Portfolio = () => {
  const dispatch = useDispatch();
  const { profile } = useProfile();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const selections = useSelector(
    (state: RootState) => state.portfolio.selections,
  );
  const { data } = useSelector((state: RootState) => state.applyJobProgress);

  const [localImages, setLocalImages] = useState<GridImage[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [activeVideoUri, setActiveVideoUri] = useState<string | null>(null);

  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [activeAudioUri, setActiveAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  // ── Pre-seed from in-progress data ────────────────────────────────────────

  useEffect(() => {
    // Don't reset if we have local uploads that haven't been saved
    if (localImages.length > 0 && uploadingId === null) {
      return;
    }

    if (!data?.portfolioSelections?.length) return;
    dispatch(resetPortfolio());
    data.portfolioSelections.forEach(s => {
      dispatch(
        addSelection({
          sourcePortfolioImageId: s.id,
          assetUrl: s.assetUrl,
          title: s.title ?? '',
          category: s.category ?? '',
          isUploaded: s.isUploaded,
        }),
      );
    });
  }, [data?.portfolioSelections, localImages.length, uploadingId]);

  // ── Grid sources ──────────────────────────────────────────────────────────

  const apiImages: GridImage[] = (profile?.portfolioImages ?? []).map(item => ({
    id: item.id,
    uri: `${ROUTES.MEDIA_URL}${item.url}`,
    isLocal: false,
    isVideo: /\.(mp4|mov|avi|mkv|webm)$/i.test(item.url ?? ''),
    isAudio: /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(item.url ?? ''),
  }));

  const progressImages: GridImage[] = (data?.portfolioSelections ?? [])
    .filter(s => !apiImages.find(a => a.id === s.id))
    .map(s => ({
      id: s.id,
      uri: `${ROUTES.MEDIA_URL}${s.assetUrl}`,
      isLocal: false,
      isVideo: /\.(mp4|mov|avi|mkv|webm)$/i.test(s.assetUrl ?? ''),
      isAudio: /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(s.assetUrl ?? ''),
    }));

  const allImages = [...apiImages, ...progressImages, ...localImages];
  const selectedIds = selections.map((s: any) => s.sourcePortfolioImageId);

  // ── Toggle select (FIXED: same logic as working version) ─────────────────

  const toggleSelect = (image: GridImage) => {
    const isSelected = selectedIds.includes(image.id);

    if (!isSelected && selectedIds.length >= MAX_SELECTED) return;

    if (isSelected) {
      dispatch(removeSelection(image.id));
    } else {
      // Handle selection for all images (both local and from API)
      if (image.isLocal) {
        // For local/uploaded images (photos or videos)
        dispatch(
          addSelection({
            sourcePortfolioImageId: image.id,
            assetUrl: image.id, // The key is stored as the id
            title: '',
            category: '',
            isUploaded: true,
          }),
        );
      } else {
        // For API/progress images
        const apiItem = profile?.portfolioImages?.find(p => p.id === image.id);
        dispatch(
          addSelection({
            sourcePortfolioImageId: image.id,
            assetUrl: apiItem?.url ?? '',
            title: '',
            category: '',
            isUploaded: false,
          }),
        );
      }
    }
  };

  // ── Upload photo (with activity indicator) ─────────────────────────────────

  const handleUploadPhoto = async () => {
    const granted = await requestPhotoLibraryPermission();
    if (!granted) return;

    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (response.didCancel || response.errorCode) return;

    const asset = response.assets?.[0];
    if (!asset?.uri || !accessToken) return;

    const tempId = `local-${Date.now()}`;
    const newImage: GridImage = {
      id: tempId,
      uri: asset.uri,
      isLocal: true,
      isVideo: false,
    };

    setLocalImages(prev => [...prev, newImage]);
    setUploadingId(tempId);

    try {
      const { key } = await presignAndUpload(
        asset.uri,
        asset.fileName ?? `portfolio_${Date.now()}.jpg`,
        asset.type ?? 'image/jpeg',
        accessToken,
      );

      console.log('photo key = ', key);

      // Update the local image with the actual key from S3
      setLocalImages(prev =>
        prev.map(img =>
          img.id === tempId
            ? { ...img, id: key, uri: `${ROUTES.MEDIA_URL}${key}` }
            : img,
        ),
      );

      // Don't auto-select - let user manually select after upload
    } catch (err) {
      console.log('Portfolio photo upload error:', err);
      setLocalImages(prev => prev.filter(img => img.id !== tempId));
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Could not upload image. Please try again.',
      });
    } finally {
      setUploadingId(null);
    }
  };

  const getLocalCopyForPlayback = async (
    uri: string,
    fileName: string,
  ): Promise<string> => {
    if (Platform.OS === 'ios') {
      // iOS URIs from the picker are already file:// URLs that work directly
      return uri;
    }

    // For Android, content:// URIs need to be copied to a local file[citation:2]
    const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

    // Check if file already exists
    if (await RNFS.exists(localPath)) {
      return localPath;
    }

    // Copy the content URI to local file
    await RNFS.copyFile(uri, localPath);
    return localPath;
  };

  const pickSingleAudio = async (): Promise<{
    uri: string;
    fileName: string;
    type: string;
  } | null> => {
    try {
      // Using @react-native-documents/picker with open mode for direct access[citation:5]
      const [result] = await pick({
        mode: 'open', // Gives us a URI we can use directly
        type: [types.audio], // Filter for audio files only[citation:1]
        allowMultiSelection: false,
      });

      if (!result || !result.uri) return null;

      // The URI from this picker is ready to use[citation:1]
      // For Android, we may need to keep a local copy as content:// URIs might be temporary[citation:2]
      return {
        uri: result.uri,
        fileName: result.name ?? `audio_${Date.now()}.mp3`,
        type: result.type ?? 'audio/mpeg',
      };
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'code' in err &&
        err.code === 'CANCELED'
      ) {
        // User cancelled - do nothing
        return null;
      }
      console.log('Audio picker error:', err);
      Toast.show({
        type: 'error',
        text1: 'Selection failed',
        text2: 'Could not select audio file. Please try again.',
      });
      return null;
    }
  };

  // Add this function near your other upload handlers (around line 150-180)

  const handleUploadAudio = async () => {
    const file = await pickSingleAudio();
    if (!file || !accessToken) return;

    // For upload, we need the actual file path, not content URI
    let uploadUri = file.uri;

    // On Android, we need a file:// URI for upload, not content://[citation:1]
    if (Platform.OS === 'android' && file.uri.startsWith('content://')) {
      // Create a local copy for upload
      const localCopyPath = `${RNFS.CachesDirectoryPath}/upload_${Date.now()}_${
        file.fileName
      }`;
      await RNFS.copyFile(file.uri, localCopyPath);
      uploadUri = localCopyPath;
    }

    const tempId = `local-audio-${Date.now()}`;
    const newAudio: GridImage = {
      id: tempId,
      uri: uploadUri,
      isLocal: true,
      isAudio: true,
    };

    setLocalImages(prev => [...prev, newAudio]);
    setUploadingId(tempId);

    try {
      const { key } = await presignAndUpload(
        uploadUri,
        file.fileName,
        file.type,
        accessToken,
      );
      // Update the local audio with the actual key from S3
      setLocalImages(prev =>
        prev.map(img =>
          img.id === tempId
            ? {
                ...img,
                id: key,
                uri: `${ROUTES.MEDIA_URL}${key}`,
                isAudio: true, // Keep this
              }
            : img,
        ),
      );

      // Clean up temporary file if we created one
      if (
        uploadUri !== file.uri &&
        uploadUri.startsWith(RNFS.CachesDirectoryPath)
      ) {
        await RNFS.unlink(uploadUri).catch(() => {});
      }
    } catch (err) {
      console.log('Portfolio audio upload error:', err);
      setLocalImages(prev => prev.filter(img => img.id !== tempId));
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Could not upload audio. Please try again.',
      });
    } finally {
      setUploadingId(null);
    }
  };

  // Add these audio control functions
  const playAudio = async (uri: string) => {
    // Stop any currently playing audio
    if (sound) {
      sound.stop();
      sound.release();
      setSound(null);
    }

    // Get a playable URI (copy content:// if needed)
    let playableUri = uri;
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      // Extract filename from URI or generate one
      const fileName = `playback_${Date.now()}.mp3`;
      playableUri = await getLocalCopyForPlayback(uri, fileName);
    }

    // Create new sound instance
    const audioSound = new Sound(playableUri, '', error => {
      if (error) {
        console.log('Failed to load audio', error);
        Toast.show({
          type: 'error',
          text1: 'Playback failed',
          text2: 'Could not load audio file',
        });
        return;
      }

      setAudioDuration(audioSound.getDuration());

      audioSound.play(success => {
        if (success) {
          console.log('Audio finished playing');
          setIsPlaying(false);
          setAudioCurrentTime(0);
        } else {
          console.log('Playback failed');
        }
        audioSound.release();
        setSound(null);
      });

      const interval = setInterval(() => {
        if (audioSound && audioSound.isPlaying()) {
          audioSound.getCurrentTime(seconds => {
            setAudioCurrentTime(seconds);
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);

      setSound(audioSound);
      setIsPlaying(true);
    });
  };

  const pauseAudio = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (sound) {
      sound.play(success => {
        if (success) {
          setIsPlaying(false);
          setAudioCurrentTime(0);
        }
        sound.release();
        setSound(null);
      });
      setIsPlaying(true);

      // Restart the progress interval
      const interval = setInterval(() => {
        if (sound && sound.isPlaying()) {
          sound.getCurrentTime(seconds => {
            setAudioCurrentTime(seconds);
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  };
  const stopAudio = () => {
    if (sound) {
      sound.stop();
      sound.release();
      setSound(null);
    }
    setIsPlaying(false);
    setAudioCurrentTime(0);
    setAudioDuration(0);
  };

  const closeAudioModal = () => {
    stopAudio();
    setAudioModalVisible(false);
    setActiveAudioUri(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  // ── Upload video (with activity indicator) ─────────────────────────────

  const handleUploadVideo = async () => {
    const file = await pickSingleVideo();
    if (!file || !accessToken) return;

    const tempId = `local-video-${Date.now()}`;
    const newVideo: GridImage = {
      id: tempId,
      uri: file.uri,
      isLocal: true,
      isVideo: true,
    };

    setLocalImages(prev => [...prev, newVideo]);
    setUploadingId(tempId);

    try {
      const { key } = await presignAndUpload(
        file.uri,
        file.fileName,
        file.type,
        accessToken,
      );
      // Update the local video with the actual key from S3
      setLocalImages(prev =>
        prev.map(img =>
          img.id === tempId
            ? {
                ...img,
                id: key,
                uri: `${ROUTES.MEDIA_URL}${key}`,
              }
            : img,
        ),
      );

      // Don't auto-select - let user manually select after upload
    } catch (err) {
      console.log('Portfolio video upload error:', err);
      setLocalImages(prev => prev.filter(img => img.id !== tempId));
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Could not upload video. Please try again.',
      });
    } finally {
      setUploadingId(null);
    }
  };
  // Cleanup sound when component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [sound]);
  const isMaxReached = selectedIds.length >= MAX_SELECTED;
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Select Portfolio Samples</Text>
        <Text style={styles.subHeading}>Showcase your most relevant work.</Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <WorkSampleCard count={selectedIds.length} />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 3}>
        <View style={styles.grid}>
          {allImages.map(item => {
            console.log('item = ', item);
            const isSelected = selectedIds.includes(item.id);
            const isUploading = uploadingId === item.id;
            const isDisabled = (isMaxReached && !isSelected) || isUploading;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                style={styles.imageContainer}
                onPress={() => toggleSelect(item)}
                disabled={isDisabled}
              >
                <FastImage
                  source={{ uri: item.uri }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.image}
                />

                {/* Uploading overlay with activity indicator */}
                {isUploading && (
                  <>
                    <View style={styles.uploadingOverlay} />
                    <ActivityIndicator
                      style={styles.uploadingIndicator}
                      size="large"
                      color={colors.primary}
                    />
                  </>
                )}

                {isDisabled && !isUploading && (
                  <View style={styles.disabledOverlay} />
                )}

                {/* Video overlay and play button */}
                {item.isVideo && !isUploading && (
                  <>
                    <View style={styles.videoOverlay} pointerEvents="none" />
                    <TouchableOpacity
                      style={styles.playButton}
                      activeOpacity={0.9}
                      onPress={e => {
                        e.stopPropagation();
                        setActiveVideoUri(item.uri);
                        setModalVisible(true);
                      }}
                    >
                      <PlayIcon width={26} height={26} />
                    </TouchableOpacity>
                  </>
                )}

                {item.isAudio && !isUploading && (
                  <>
                    <View style={styles.videoOverlay} pointerEvents="none" />
                    <TouchableOpacity
                      style={styles.playButton}
                      activeOpacity={0.9}
                      onPress={e => {
                        e.stopPropagation();
                        setActiveAudioUri(item.uri);
                        setAudioModalVisible(true);
                      }}
                    >
                      <Text style={styles.audioIcon}>🎵</Text>
                    </TouchableOpacity>
                  </>
                )}

                {isSelected && !isUploading && <View style={styles.overlay} />}

                {isSelected && !isUploading && (
                  <View style={styles.iconContainer}>
                    <CheckIcon color={colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        {/* Opens ActionSheet instead of going straight to library */}
        <UploadMediaBtn onPress={() => actionSheetRef.current?.show()} />
      </SlideLeftFade>

      {/* ── Action Sheet ────────────────────────────────────────────────────── */}
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
              handleUploadPhoto();
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
              handleUploadVideo();
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
    </View>
  );
};

export default Portfolio;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
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
    transform: [{ translateX: -18 }, { translateY: -18 }],
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
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
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: correctSize(12),
    marginBottom: correctSize(14),
  },
  imageContainer: {
    height: correctSize(111),
    width: '49%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
  },
  disabledOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  uploadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: correctSize(8),
    right: correctSize(8),
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkgray_1,
  },

  audioIcon: {
    fontSize: 16,
    color: colors.white,
  },
});

// ─── Action Sheet Styles ──────────────────────────────────────────────────────

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
