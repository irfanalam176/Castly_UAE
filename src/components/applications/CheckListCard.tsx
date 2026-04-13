import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CheckCircleIcon from '../../assets/svg/common/CheckCircleIcon';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

interface CheckListCardProps {
  title?: string;
  icon?: React.ReactNode;
  list?: string[];
  bgColor?: string;
}
const CheckListCard = ({ title, icon, list, bgColor }: CheckListCardProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.body}>
        {list?.map((item, index) => (
          <View key={index} style={styles.listItemContainer}>
            <CheckCircleIcon />
            <Text key={index} style={styles.listItem}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CheckListCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightBlue_5,
    marginBottom:correctSize(14),
    backgroundColor:colors.white,
    overflow:"hidden"
  },
  body: {
    paddingVertical: correctSize(14),
    paddingHorizontal: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    paddingVertical: correctSize(14),
    paddingHorizontal: correctSize(16),
  },
  title: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: correctSize(12),
    lineHeight: correctSize(18),
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginTop: correctSize(8),
  },
  listItem: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_Regular,
    fontSize: correctSize(12),
    lineHeight: correctSize(18),
  },
});
