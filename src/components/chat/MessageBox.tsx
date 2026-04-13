import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import ReadIcon from '../../assets/svg/chat/ReadIcon';
import FileCard from '../common/FileCard';
import PdfIcon from '../../assets/svg/applications/PdfIcon';
import DownloadIcon from '../../assets/svg/chat/DownloadIcon';
import Typing from './Typing';
import FastImage from 'react-native-fast-image';

type MessageStatus = string;

interface FileMessage {
  name: string;
  size: string;
  icon: string;
}
interface ChatMessage {
  id: string;
  type: string;
  message?: string;
  timestamp?: string;
  avatar?: string;
  status?: MessageStatus;
  file?: FileMessage;
  isTyping?: boolean;
}

interface ChatProps {
  item?: ChatMessage;
}

const MessageBox = ({ item }: ChatProps) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          //   justifyContent: item?.type == 'sent' ? 'flex-end' : 'flex-start',
          flexDirection: item?.type === 'sent' ? 'row-reverse' : 'row',
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: item?.avatar }} style={styles.image} />
      </View>

      {item?.isTyping ? (
        <Typing />
      ) : (
        <View style={styles.container}>
          <View
            style={[
              styles.messageContainer,
              {
                backgroundColor:
                  item?.type == 'sent' ? colors.gray_1 : colors.white,
              },
              item?.type == 'sent'
                ? {
                    borderTopRightRadius: 6,
                  }
                : {
                    borderTopLeftRadius: 6,
                  },
            ]}
          >
            {item?.file && (
              <View style={styles.fileContainer}>
                <FileCard
                  icon={<PdfIcon color={colors.gray_1} />}
                  padding={0}
                  cardBg={colors.white}
                  rightIcon={<DownloadIcon />}
                  iconBg={colors.lightBlue_3}
                  rightIconBg={colors.white_1}
                  name={item.file.name}
                  size={item.file.size}
                />
              </View>
            )}
            <Text
              style={[
                styles.messageText,
                {
                  color: item?.type == 'sent' ? colors.white : colors.black,
                },
              ]}
            >
              {item?.message}
            </Text>
          </View>

          <View
            style={[
              styles.footer,
              {
                justifyContent:
                  item?.type == 'sent' ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text style={styles.time}>{item?.timestamp}</Text>
            {item?.type == 'sent' && <ReadIcon />}
          </View>
        </View>
      )}
    </View>
  );
};

export default MessageBox;
const styles = StyleSheet.create({
  imageContainer: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 100,
  },
  image: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    gap: correctSize(8),
    marginTop: correctSize(16),
    marginBottom: correctSize(6),
  },
  container: {
    width: correctSize(260),
  },
  messageContainer: {
    borderRadius: 16,
    shadowColor: colors.black,
    paddingVertical: correctSize(12),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: 20,
    paddingHorizontal: correctSize(16),
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
  },
  fileContainer: {
    paddingBottom: correctSize(13),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginBottom: correctSize(13),
    paddingHorizontal: correctSize(16),
  },
});
