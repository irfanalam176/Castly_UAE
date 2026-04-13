import { View, Text, StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { correctSize } from '../../utils';

interface KycSectionHeaderProps {
  title?: string;
  tag?: string;
  icon?: React.ReactNode;
  style?:TextStyle,
  tagTextStyle?:TextStyle
}
const KycSectionHeader = ({ title,icon,style ,tag,tagTextStyle}: KycSectionHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.heading}>{title}</Text>
      <View style={[styles.tag,style]}>
        {icon??<CheckIcon width={10.5} height={12} color={colors.green_5} />}
        <Text style={[styles.tagText,tagTextStyle]}>{tag??'UPLOADED'}</Text>
      </View>
    </View>
  );
};

export default KycSectionHeader;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  heading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  tagText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.green_5,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    borderRadius:99,
    backgroundColor:colors.lightGreen_1,
    paddingHorizontal:correctSize(10),
    paddingVertical:correctSize(5)
  },
});
