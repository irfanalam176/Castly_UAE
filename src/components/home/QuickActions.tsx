import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionBox from './ActionBox';
import { colors } from '../../utils/colors';
import FileIcon from '../../assets/svg/Home/FileIcon';
import CalendarIcon from '../../assets/svg/Home/CalendarIcon';
import WalletIcon from '../../assets/svg/Home/WalletIcon';
import MessageIcon from '../../assets/svg/Home/MessageIcon';
import { correctSize } from '../../utils';
import { stackRoutes } from '../../navigation/screenIds';

interface QuickActionsProps {
    onQuickActionPress: (route:string) => void;
}


interface QuickActionsProps {
  onQuickActionPress: (route: string) => void;
}

const QuickActions = ({ onQuickActionPress }: QuickActionsProps) => {
  const actions = [
    {
      id: 1,
      label: 'Applications',
      icon: <FileIcon />,
      gradientColors: [colors.lightBlue_3, colors.purple_2],
      route: stackRoutes.StackApplications,
    },
    {
      id: 2,
      label: 'Bookings',
      icon: <CalendarIcon />,
      gradientColors: [colors.purple_2, colors.pink_1],
      route: stackRoutes.BookingRequest
    },
    {
      id: 3,
      label: 'Wallet',
      icon: <WalletIcon />,
      gradientColors: [colors.lightGreen_1, colors.lightGreen_2],
      route: stackRoutes.Wallet,
    },
    {
      id: 4,
      label: 'Messages',
      icon: <MessageIcon fill={colors.black_1} />,
      gradientColors: [colors.light_orange, colors.yellow_2],
      badge: 3,
      route: stackRoutes.Messages,
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <ActionBox
          key={action.id}
          index={index}
          label={action.label}
          icon={action.icon}
          gradientColors={action.gradientColors}
          badge={action.badge}
          onPress={() => onQuickActionPress(action.route)} // ✅
        />
      ))}
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 24,
        marginTop: correctSize(10),
        marginBottom: correctSize(20),
    },
});

export default QuickActions;
