import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import EditIcon from '../../../assets/svg/common/EditIcon';
import ChevronRight from '../../../assets/svg/common/ChevronRight';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import BadgeIcon from '../../../assets/svg/Profile/BadgeIcon';

interface AccountCardProp{
  onEdit?:()=>void
}
const AccountCard = ({onEdit}:AccountCardProp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>

      <TouchableOpacity activeOpacity={0.7} style={styles.action} onPress={onEdit}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <EditIcon color={colors.darkgray_1} width={15} height={15} />
          </View>
          <View>
            <Text style={styles.heading}>Edit Profile</Text>
            <Text style={styles.description}>Name, bio, contact</Text>
          </View>
        </View>
        <ChevronRight />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} style={styles.action}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <ShieldIcon/>
          </View>
          <View>
            <Text style={styles.heading}>Privacy Settings</Text>
            <Text style={styles.description}>Who can see your profile</Text>
          </View>
        </View>
        <ChevronRight />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} style={styles.action}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <BadgeIcon/>
          </View>
          <View>
            <Text style={styles.heading}>Help & Support</Text>
            <Text style={styles.description}>FAQ, dispute centre</Text>
          </View>
        </View>
        <ChevronRight />
      </TouchableOpacity>

    </View>
  );
};

export default AccountCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
    textTransform: 'uppercase',
    color: colors.gray_3,
    padding: correctSize(16),
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
  },
  heading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    lineHeight: correctSize(20),
    color: colors.darkgray,
  },
  description: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 11,
    color: colors.gray_3,
  },
});
