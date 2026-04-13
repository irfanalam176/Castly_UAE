import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { colors } from '../../../utils/colors';
import MessagesHeader from '../../../components/chat/MessagesHeader';
import { Fonts } from '../../../assets/fonts';
import { correctSize } from '../../../utils';
import MessageListItem from '../../../components/chat/MessageListItem';
import PinnedMessageCard from '../../../components/chat/PinnedMessageCard';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../navigation/navigationTypes';
import { stackRoutes } from '../../../navigation/screenIds';

const Messages = () => {
   const navigation = useNavigation<NavProp>() 
  const dummyMessages = [
    {
      id: 1,
      name: 'Zara UAE',
      lastMessage: 'See you on Dec 22 at 7:30 AM! 📸',
      time: '1d',
      online: true,
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'H&M Middle East',
      lastMessage: "Thank you for applying! We'll review and get back to you by Dec 20. 📸",
      time: '1d',
      online: false,
      unreadCount: 0,
    },
    {
      id: 3,
      name: 'LVMH MENA',
      lastMessage: 'It was a pleasure working with you, Sarah! 📸',
      time: '1d',
      online: false,
      unreadCount: 0,
    },
  ];

  const pinnedDummyMessages = [
    {
      id: 1,
      name: 'Zara UAE',
      lastMessage: 'See you on Dec 22 at 7:30 AM! 📸',
      time: '1d',
      online: true,
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'H&M Middle East',
      lastMessage: "Thank you for applying! We'll review and get back to you by Dec 20. 📸",
      time: '1d',
      online: false,
      unreadCount: 0,
    },
  ];

  function openChat(){
    navigation.navigate(stackRoutes.ChatScreen)
  }

  const ListHeader = () => (
    <View>
      <Text style={styles.title}>Pinned</Text>
      {pinnedDummyMessages.map(item => (
        <PinnedMessageCard item={item} key={item.id} onPress={openChat}/>
      ))}
      <Text style={styles.title}>All Messages</Text>
      <View style={styles.listContainerTop} />
    </View>
  );

  const ListFooter = () => <View style={styles.listContainerBottom} />;

  function MessageListItems({ item, index }: any) {
    return (
      <View
        style={[
          styles.item,
          index === 0 && styles.firstItem,
          index === dummyMessages.length - 1 && styles.lastItem,
        ]}
      >
        <MessageListItem item={item} onPress={openChat}/>
      </View>
    );
  }

  return (
    <ScreenWrapper backgroundColor={colors.lightBlue_5}>
      <MessagesHeader unread={2} onSearch={() => {}} />

      <FlatList
        data={dummyMessages}
        keyExtractor={item => item.id.toString()}
        renderItem={MessageListItems}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}
      />
    </ScreenWrapper>
  );
};

export default Messages;

const styles = StyleSheet.create({
  body: {
    padding: correctSize(16),
    paddingBottom: correctSize(50),
  },

  title: {
    color: colors.gray_3,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 10,
    marginBottom: correctSize(12),
    textTransform: 'uppercase',
  },

  // Splits the white rounded container across header/items/footer
  // so the FlatList rows sit inside a visually seamless white card
  listContainerTop: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  listContainerBottom: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: correctSize(1), // just enough to close the bottom curve
  },

  item: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlue_5,
  },

  firstItem: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});