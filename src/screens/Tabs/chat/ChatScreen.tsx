import { View, Text, StyleSheet, FlatList, Keyboard } from 'react-native';
import React from 'react';
import ChatHeader from '../../../components/chat/ChatHeader';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { CHAT_DATA } from '../../../utils/array';
import MessageBox from '../../../components/chat/MessageBox';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import MessageInput from '../../../components/chat/MessageInput';
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

const ChatScreen = () => {

  function handleSend() {
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScreenWrapper>

        <ChatHeader name="Luxury Fashion UAE" status={true} />

        <View style={styles.body}>
          <FlatList
            style={{ flex: 1 }}
            data={CHAT_DATA}
            renderItem={({ item }) => <MessageBox item={item} />}
          />
        </View>

        <KeyboardStickyView>
          <MessageInput onSend={handleSend} />
        </KeyboardStickyView>

      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: correctSize(16),
    backgroundColor: colors.lightBlue_5,
  },
});
