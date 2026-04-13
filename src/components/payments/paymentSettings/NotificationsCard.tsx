import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import CustomSwitch from '../../common/CustomSwitch';

type NotificationItem = {
  key: string
  label: string
  description: string
}

type Props = {
  settings: { [key: string]: boolean }
  onToggle: (key: string) => void
}

const NOTIFICATION_SETTINGS: NotificationItem[] = [
  { key: 'paymentAlerts', label: 'Payment Alerts', description: 'Push when escrow is locked or released' },
  { key: 'bookingNotifications', label: 'Booking Notifications', description: 'Shortlists, bookings & shoot reminders' },
  { key: 'messageNotifications', label: 'Message Notifications', description: 'New messages from brands' },
  { key: 'autoWithdraw', label: 'Auto-Withdraw', description: 'Auto-transfer when balance ≥ AED 500' },
  { key: 'weeklySummary', label: 'Weekly Summary', description: 'Email digest every Sunday' },
]

const NotificationsCard = ({ settings, onToggle }: Props) => {
  return (
    <View>
      <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
      <View style={styles.card}>
        {NOTIFICATION_SETTINGS.map((item, index) => {
          const isLast = index === NOTIFICATION_SETTINGS.length - 1
          return (
            <View key={item.key}>
              <View style={styles.row}>
                <View style={styles.rowInfo}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowDescription}>{item.description}</Text>
                </View>
                <CustomSwitch
                  value={settings[item.key]}
                  onValueChange={() => onToggle(item.key)}
                />
              </View>
              {!isLast && <View style={styles.divider} />}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default NotificationsCard

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_3,
    letterSpacing: 1,
    marginBottom: correctSize(10),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: correctSize(16),
    borderWidth: 1,
    borderColor: colors.white_1,
    overflow: 'hidden',
    marginBottom:correctSize(16)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(16),
    gap: correctSize(12),
  },
  rowInfo: {
    flex: 1,
    gap: correctSize(3),
  },
  rowLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  rowDescription: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.white_1,
  },
})