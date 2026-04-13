import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import Badge from '../../common/Badge';
import { Fonts } from '../../../assets/fonts';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';

interface Props {
  checked: boolean;
  onPress: () => void;
  day: string;
  time: string;
  badge: string;
  duration?:string|number
}

const AvailabilityCard = ({ checked, onPress, day, time, badge,duration }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.checkBox,
        checked && styles.checkBoxChecked,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.day}>{day}</Text>

        <Text style={styles.time}>🕐 {time} {duration}</Text>

        <Badge
          title={badge}
          containerStyle={styles.badge}
          textStyle={styles.badgeText}
        />
      </View>

      {/* Checkbox */}
      <View style={styles.checkboxWrapper}>
        <View
          style={[
            styles.checkedCircle,
            checked && styles.checked,
          ]}
        >
          {checked && (
            <CheckIcon color={colors.primary} width={12} height={12} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AvailabilityCard;

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 16,
    padding: correctSize(17),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: correctSize(12),
  },
  checkBoxChecked: {
    backgroundColor: colors.yellow_4,
    borderColor: colors.primary,
  },
  checkboxWrapper: {
    justifyContent: 'center',
  },
  day: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_4,
    marginVertical: correctSize(8),
  },
  badge: {
    paddingVertical: correctSize(2),
    paddingHorizontal: correctSize(8), 
    backgroundColor: colors.lightBlue_2,
    alignSelf: 'flex-start', 
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.blue_5,
  },
  checkedCircle: {
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.gray_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.darkgray_1,
    borderColor: colors.darkgray_1,
  },
});