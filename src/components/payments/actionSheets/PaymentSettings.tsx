import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CrossIcon from '../../vectorIcons/CrossIcon';
import NotificationsCard from '../paymentSettings/NotificationsCard';
import AccountCard from '../AccountCard';
import ClockIcon from '../../../assets/svg/Home/ClockIcon';
import FileIcon from '../../../assets/svg/common/FileIcon';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import GlobeIcon from '../../../assets/svg/applications/GlobeIcon';
import LockIcon from '../../../assets/svg/common/LockIcon';
import HelpIcon from '../../../assets/svg/common/HelpIcon';
import WarningIcons from '../../../assets/svg/common/WarningIcons';

interface Props {
  settingModalRef: React.RefObject<ActionSheetRef | null>;
}
const PaymentSettings = ({ settingModalRef }: Props) => {
  const [settings, setSettings] = useState<{ [key: string]: boolean }>({
    paymentAlerts: true,
    bookingNotifications: true,
    messageNotifications: true,
    autoWithdraw: false,
    weeklySummary: true,
  });

  const toggleSwitch = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClose = () => {
    settingModalRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={settingModalRef}
      containerStyle={styles.actionSheet}
      keyboardHandlerEnabled={false}
      gestureEnabled={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Payment Settings</Text>
          <Text style={styles.smText}>Notifications & preferences</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={handleClose}>
          <CrossIcon fillColor={colors.gray_4} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.body}>
          <NotificationsCard settings={settings} onToggle={toggleSwitch} />

          <AccountCard
            items={[
              {
                key: 'payout',
                icon: (
                  <ClockIcon width={14} height={14} color={colors.darkgray} />
                ),
                label: 'Payout Schedule',
                description: '14 business days after shoot',
                onPress: () => {},
              },
              {
                key: 'tax',
                icon: (
                  <FileIcon width={14} height={14} color={colors.darkgray} />
                ),
                label: 'Tax Invoices',
                description: 'Download past invoices',
                onPress: () => {},
              },
              {
                key: 'dispute',
                icon: (
                  <ShieldIcon width={14} height={14} color={colors.darkgray} />
                ),
                label: 'Dispute History',
                description: 'View past disputes & outcomes',
                onPress: () => {},
              },
              {
                key: 'currency',
                icon: (
                  <GlobeIcon width={14} height={14} color={colors.darkgray} />
                ),
                label: 'Currency & Region',
                description: 'AED · UAE',
                onPress: () => {},
              },
              {
                key: 'privacy',
                icon: <LockIcon />,
                label: 'Privacy & Data',
                description: 'Manage your data',
                onPress: () => {},
              },
              {
                key: 'help',
                icon: <HelpIcon />,
                label: 'Help & Support',
                description: 'Chat with Castly support',
                onPress: () => {},
              },
              {
                key: 'report',
                icon: (
                  <WarningIcons
                    width={14}
                    height={14}
                    color={colors.darkgray}
                  />
                ),
                label: 'Report an Issue',
                description: 'Something wrong? Let us know',
                onPress: () => {},
              },
            ]}
          />
        </View>
      </ScrollView>
    </ActionSheet>
  );
};

export default PaymentSettings;

const styles = StyleSheet.create({
  actionSheet: { height: correctSize(700) },
  body: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(120),
    paddingTop: correctSize(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(18),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: colors.white_1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(24),
  },
  smText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
});
