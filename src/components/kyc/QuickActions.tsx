import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import ArrowUp from '../../assets/svg/kyc/ArrowUp';
import FileIcon from '../../assets/svg/kyc/FileIcon';
import HistoryIcon from '../../assets/svg/kyc/HistoryIcon';
import GearIcon from '../../assets/svg/kyc/GearIcon';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../../navigation/screenIds';
import { NavProp } from '../../navigation/navigationTypes';

// Helper function for shadow
const getShadow = (
  color: string = '#C7D2FE',
  height: number = 4,
  radius: number = 6,
  elevation: number = 8,
) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height },
  shadowOpacity: 0.3, // increase from 1 to 0.3 to look natural
  shadowRadius: radius,
  elevation: elevation, // Android
});

const QuickActions = () => {
  const navigation = useNavigation<NavProp>();
  const actionsList = [
    {
      id: 1,
      icon: <ArrowUp width={13.5} height={18} color={colors.black} />,
      label: 'Withdraw',
      active: true,
      onPress: () => {
        navigation.navigate(stackRoutes.WithDrawMoney);
      },
    },
    {
      id: 2,
      icon: <FileIcon />,
      label: 'Invoices',
    
    },
    { id: 3, icon: <HistoryIcon />, label: 'History',
        onPress: () => {
        navigation.navigate(stackRoutes.TransactionHistory);
      },
     },
    { id: 4, icon: <GearIcon />, label: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      {actionsList.map(item => (
        <TouchableOpacity
          style={styles.quickActionContainer}
          key={item.id}
          onPress={item?.onPress}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: item.active ? colors.primary : colors.white_1,
              },
              item.active && getShadow(), // apply shadow only if active
            ]}
          >
            {item.icon}
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: correctSize(21),
    flex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginTop: correctSize(24),
    borderWidth: 1,
    borderColor: colors.white_1,
  },
  quickActionContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 16,
    width: correctSize(48),
    height: correctSize(48),
    marginBottom: correctSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
});
