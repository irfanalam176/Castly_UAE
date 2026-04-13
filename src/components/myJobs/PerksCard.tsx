import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import Badge from '../common/Badge';
import CheckCircleIcon from '../../assets/svg/common/CheckCircleIcon';

interface PerksCardProps {
  perks: string[];
}
const PerksCard = ({ perks }: PerksCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Included Perks</Text>

      <View style={styles.row}>
        {perks?.map((item, key) => (

          <Badge
            leftIcon={
              <CheckCircleIcon
                width={10}
                height={10}
                color={colors.white}
                fill={colors.green_5}
              />
            }
            title={item}
            containerStyle={styles.badge}
            textStyle={styles.badgeText}
            key={key}
          />
        ))}
      </View>
    </View>
  );
};

export default PerksCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: correctSize(16),
    borderWidth: 1,
    borderColor: colors.white_1,
    marginTop: correctSize(16),
  },
  heading: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
    marginBottom:correctSize(8)
  },
  badge: {
    backgroundColor: colors.green_1,
    paddingVertical: correctSize(2),
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.green_5,
  },
  row:{
    flexDirection:"row",
    gap:correctSize(8),
    flexWrap:"wrap"
  }
});
