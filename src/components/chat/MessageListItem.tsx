import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';

export interface MessageListItemProps {
  item: {
    id?: string | number;
    name?: string;
    lastMessage?: string;
    time?: string;
    online?: boolean;
    unreadCount: number;
  };
  onPress?: () => void;
}
const MessageListItem = ({ item, onPress }: MessageListItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.initialContainer}>
        {item?.unreadCount > 0 && (
          <Text style={styles.unread}>{item?.unreadCount}</Text>
        )}
        <Text style={styles.initial}>{item?.name?.trim()[0]}</Text>
        {item?.online && <Text style={styles.status}>{item?.online}</Text>}
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.time}>{item?.time}</Text>
        </View>
        <Text style={styles.lastMessage} ellipsizeMode="tail" numberOfLines={1}>
          {item?.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageListItem;
const styles = StyleSheet.create({
  container: {
    padding: correctSize(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialContainer: {
    width: correctSize(44),
    height: correctSize(44),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkgray_1,
    marginRight: correctSize(12),
    position: 'relative',
  },
  initial: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: colors.darkgray,
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    lineHeight: correctSize(21),
  },
  time: {
    color: colors.gray_3,
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
  },
  lastMessage: {
    color: colors.gray_4,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    flex: 1,
  },
  unread: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 9,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    backgroundColor: colors.red,
    position: 'absolute',
    right: correctSize(-7),
    top: correctSize(-7),
  },
  status: {
    width: correctSize(12),
    height: correctSize(12),
    borderRadius: 100,
    backgroundColor: colors.darkGreen3,
    position: 'absolute',
    right: correctSize(-4),
    bottom: correctSize(-4),
    borderColor: colors.white,
    borderWidth: 1,
  },
  rightContainer: {
    flex: 1,
  },
});
