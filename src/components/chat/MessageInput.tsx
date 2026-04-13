import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import PlusIcon from '../../assets/svg/common/PlusIcon';
import { TextInput } from 'react-native-gesture-handler';
import EmojiIcon from '../../assets/svg/chat/EmojiIcon';
import SendIcon from '../../assets/svg/applications/SendIcon';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

interface MessageInputProps {
  onChangeText?: () => void;
  onSend?: () => void;
}

const MessageInput = ({ onChangeText, onSend }: MessageInputProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fileBtn}>
        <PlusIcon />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor={colors.gray_2}
          style={styles.input}
          onChangeText={onChangeText}
        />
        <TouchableOpacity>
          <EmojiIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.fileBtn, styles.sentBtn]} onPress={onSend}>
        <SendIcon color={colors.black} width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: correctSize(13),
    paddingHorizontal: correctSize(16),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white_1,
    paddingLeft: correctSize(16),
    paddingRight: correctSize(23),
    borderRadius: 24,
    height: correctSize(52),
    flex: 1,
    marginHorizontal: correctSize(8),
  },
  fileBtn: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
  },
  sentBtn: {
    backgroundColor: colors.primary,
  },
  input: {
    flex: 1,
    color: colors.black_1
  },
});
