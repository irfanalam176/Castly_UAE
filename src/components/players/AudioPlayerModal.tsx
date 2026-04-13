import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import PlayIcon from '../../assets/svg/common/PlayIcon';
import PauseIcon from '../../assets/svg/common/PauseIcon';
import ForwardIcon from '../../assets/svg/common/ForwardIcon';
import BackwardIcon from '../../assets/svg/common/BackwardIcon';

interface AudioPlayerModalProps {
  visible: boolean;
  audioUri: string | null;
  onClose: () => void;
}

const AudioPlayerModal = ({ visible, audioUri, onClose }: AudioPlayerModalProps) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startProgressInterval = (audioSound: Sound) => {
    clearProgressInterval();
    intervalRef.current = setInterval(() => {
      if (audioSound.isPlaying()) {
        audioSound.getCurrentTime(seconds => {
          setAudioCurrentTime(seconds);
        });
      } else {
        clearProgressInterval();
      }
    }, 1000);
  };

  const stopAudio = () => {
    clearProgressInterval();
    if (sound) {
      sound.stop();
      sound.release();
      setSound(null);
    }
    setIsPlaying(false);
    setAudioCurrentTime(0);
    setAudioDuration(0);
  };

  const getLocalCopyForPlayback = async (uri: string, fileName: string): Promise<string> => {
    if (Platform.OS === 'ios') return uri;
    const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`;
    if (await RNFS.exists(localPath)) return localPath;
    await RNFS.copyFile(uri, localPath);
    return localPath;
  };

  const playAudio = async (uri: string) => {
    stopAudio();

    let playableUri = uri;
    if (Platform.OS === 'android' && uri.startsWith('content://')) {
      const fileName = `playback_${Date.now()}.mp3`;
      playableUri = await getLocalCopyForPlayback(uri, fileName);
    }

    const audioSound = new Sound(playableUri, '', error => {
      if (error) {
        console.log('Failed to load audio', error);
        return;
      }

      setAudioDuration(audioSound.getDuration());

      audioSound.play(success => {
        if (success) {
          setIsPlaying(false);
          setAudioCurrentTime(0);
        }
        clearProgressInterval();
        audioSound.release();
        setSound(null);
      });

      startProgressInterval(audioSound);
      setSound(audioSound);
      setIsPlaying(true);
    });
  };

  const pauseAudio = () => {
    if (sound) {
      sound.pause();
      clearProgressInterval();
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
        clearProgressInterval();
        sound.release();
        setSound(null);
      });
      startProgressInterval(sound);
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    stopAudio();
    onClose();
  };

  // Auto-play when modal opens with a URI
  useEffect(() => {
    if (visible && audioUri) {
      playAudio(audioUri);
    }
  }, [visible, audioUri]);

  // Stop audio when modal closes
  useEffect(() => {
    if (!visible) {
      stopAudio();
    }
  }, [visible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.audioModalContent}>
          <View style={styles.audioPlayerContainer}>
            <Text style={styles.audioTitle}>Now Playing</Text>

            <View style={styles.audioIconLarge}>
              <Text style={styles.audioIconLargeText}>🎵</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(audioCurrentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(audioDuration)}</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: audioDuration > 0
                      ? `${(audioCurrentTime / audioDuration) * 100}%`
                      : '0%',
                  },
                ]}
              />
            </View>

            <View style={styles.controlsContainer}>
              <TouchableOpacity
                onPress={() => sound?.setCurrentTime(Math.max(0, audioCurrentTime - 10))}
              >
                <BackwardIcon color={colors.black} size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButtonLarge}
                onPress={() => {
                  if (isPlaying) {
                    pauseAudio();
                  } else {
                    sound ? resumeAudio() : audioUri && playAudio(audioUri);
                  }
                }}
              >
                {isPlaying
                  ? <PauseIcon color={colors.black} width={25} height={25} />
                  : <PlayIcon color={colors.black} width={25} height={25} />
                }
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => sound?.setCurrentTime(Math.min(audioDuration, audioCurrentTime + 10))}
              >
                <ForwardIcon size={30} color={colors.black} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.audioCloseBtn} onPress={handleClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AudioPlayerModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioModalContent: {
    width: '85%',
    padding: correctSize(24),
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  audioPlayerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: correctSize(20),
  },
  audioTitle: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 18,
    color: colors.darkgray_1,
    marginBottom: correctSize(10),
  },
  audioIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: correctSize(20),
  },
  audioIconLargeText: { fontSize: 40 },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: correctSize(10),
  },
  timeText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_3,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: colors.gray_5,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: correctSize(10),
  },
  playButtonLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioCloseBtn: {
    position: 'absolute',
    top: correctSize(0),
    right: correctSize(0),
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
  },
});