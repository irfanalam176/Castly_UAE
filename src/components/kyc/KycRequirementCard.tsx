import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import InfoIcon from '../../assets/svg/Home/InfoIcon';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';

interface Items {
  id?: string | number;
  label?: string;
}
interface KycRequirementCardProps {
  title?: string;
  infoIconColor?: string;
  checkIconColor?: string;
  style?: ViewStyle;
  titleColor?: string;
  labelColor?: string;
  items?: Items[];
}

const KycRequirementCard = ({
  title,
  infoIconColor,
  checkIconColor,
  style,
  titleColor,
  labelColor,
  items,
}: KycRequirementCardProps) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <InfoIcon width={18} height={18} color={infoIconColor} />
      </View>
      <View>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>

        {items?.map(item => (
          <View style={styles.row} key={item.id}>
            <CheckIcon width={12} height={10} color={checkIconColor} />
            <Text style={[styles.label, { color: labelColor }]}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default KycRequirementCard;
const styles = StyleSheet.create({
  container: {
    padding: correctSize(17),
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: correctSize(12),
    marginBottom:correctSize(40)
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    marginBottom: correctSize(8),
  },
  label: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(10),
  },
});
