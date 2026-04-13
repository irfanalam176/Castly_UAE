import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import Video from 'react-native-video';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import PlusIcon from '../../assets/svg/common/PlusIcon';
import PlayIcon from '../../assets/svg/common/PlayIcon';
import VideoPlayerModal from '../players/VideoPlayerModal';

interface AddButtonProps {
  uri?: string | null;
  onPress?: () => void;
  onRemove?: () => void;
  isVideo?: boolean;
  isAudio?: boolean;
  onAudioPress?: () => void;
}

const AddButton = ({
  uri,
  onPress,
  onRemove,
  isVideo,
  onAudioPress,
  isAudio,
}: AddButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (uri) {
    return (
      <>
        <View style={styles.previewWrapper}>
          {isVideo ? (
            <Video
              source={{ uri }}
              style={styles.previewImage}
              paused
              resizeMode="cover"
              muted
            />
          ) : (
            <Image source={{ uri }} style={styles.previewImage} />
          )}

          {isVideo && (
            <TouchableOpacity
              style={styles.videoBadge}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
            >
              <PlayIcon width={20} height={20} />
            </TouchableOpacity>
          )}
          {isAudio && (
            <TouchableOpacity
              style={styles.videoBadge}
              onPress={onAudioPress}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 20 }}>🎵</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={onRemove}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.removeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* ── Video Player Modal ── */}

        <VideoPlayerModal
          visible={modalVisible}
          videoUri={uri}
          onClose={() => setModalVisible(false)}
        />
      </>
    );
  }

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <PlusIcon width={12} height={12} color={colors.gray_3} />
      <Text style={styles.text}>Add</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const THUMB = correctSize(112.5);

const styles = StyleSheet.create({
  button: {
    width: THUMB,
    height: THUMB,
    borderRadius: 14,
    borderStyle: 'dashed',
    borderWidth: 1.4,
    borderColor: colors.gray_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 9,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_3,
    marginTop: correctSize(5),
  },
  previewWrapper: {
    width: THUMB,
    height: THUMB,
  },
  previewImage: {
    width: THUMB,
    height: THUMB,
    borderRadius: 14,
    overflow: 'hidden',
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.darkgray_1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  removeBtnText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '600',
    lineHeight: 13,
  },
  videoBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 14,
    zIndex: 5,
  },
  // ── Modal ──
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
});
