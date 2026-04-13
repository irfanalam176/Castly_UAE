import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import CustomSwitch from '../../common/CustomSwitch';

const NotificationsCard: React.FC = () => {
  const [settings, setSettings] = useState({
    appUpdates: false,
    jobMatches: false,
    messages: false,
    escrow: false,
    weekly: false,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const data = [
    {
      key: 'appUpdates',
      title: 'Application Updates',
      desc: 'Shortlisted, booked, rejected alerts',
    },
    {
      key: 'jobMatches',
      title: 'New Job Matches',
      desc: 'When jobs match your 90%+ criteria',
    },
    {
      key: 'messages',
      title: 'Messages from Brands',
      desc: 'Incoming brand messages',
    },
    {
      key: 'escrow',
      title: 'Escrow Updates',
      desc: 'Payment deposited, released',
    },
    {
      key: 'weekly',
      title: 'Weekly Opportunities',
      desc: 'Summary of new matching jobs',
    },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {data.map((item, index) => {
        const isLast = index === data.length - 1;

        return (
          <View
            key={item.key}
            style={[styles.row, isLast && styles.lastRow]}
          >
            <View>
              <Text style={styles.heading}>{item.title}</Text>
              <Text style={styles.description}>{item.desc}</Text>
            </View>

            <CustomSwitch
              value={settings[item.key]}
              onValueChange={() => toggleSwitch(item.key)}
            />
          </View>
        );
      })}
    </View>
  );
};

export default NotificationsCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    padding: correctSize(16),
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
    textTransform: 'uppercase',
    color: colors.gray_3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: correctSize(12),
    borderBottomWidth: 0.7,
    borderBottomColor: colors.lightBlue_5,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  heading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
    lineHeight: correctSize(20),
  },
  description: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
});