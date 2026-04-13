import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import { colors } from '../../utils/colors';

interface VideoPlayerModalProps {
  visible: boolean;
  videoUri: string | null;
  onClose: () => void;
}

const VideoPlayerModal = ({ visible, videoUri, onClose }: VideoPlayerModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <Video
            source={{ uri: videoUri ?? '' }}
            style={styles.fullVideo}
            resizeMode="contain"
            controls
            paused={false}
          />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoPlayerModal;

const styles = StyleSheet.create({
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