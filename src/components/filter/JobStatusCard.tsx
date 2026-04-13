import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CheckIcon from '../../assets/svg/Home/CheckIcon';

interface JobStatusCardProps {
  label?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  checked?: boolean;
  style?: ViewStyle;
}

const JobStatusCard = ({
  label,
  icon,
  onPress,
  style,
  checked,
}: JobStatusCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        {checked ? (
          <View style={styles.check}>
            <CheckIcon color={colors.black} width={10.5} height={12} />
          </View>
        ) : (
          <View style={styles.unCheck} />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>

      {icon}
    </TouchableOpacity>
  );
};

export default JobStatusCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(18),
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
    marginBottom: correctSize(12),
  },
  label: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 14,
    color: colors.darkgray,
  },
  unCheck: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray_5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
  },
  check: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
