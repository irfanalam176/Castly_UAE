import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import CustomSwitch from '../../common/CustomSwitch';

const JobPrefrences: React.FC = () => {
  const [settings, setSettings] = useState({
    openToWork: false,
    verifiedBrands: false,
    escrow: false,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const data = [
    {
      key: 'openToWork',
      title: 'Open to Work',
      desc: 'Brands can see your profile',
    },
    {
      key: 'escrow',
      title: 'Escrow-Only Jobs',
      desc: 'Only show escrow-protected jobs',
    },
    {
      key: 'verifiedBrands',
      title: 'Verified Brands Only',
      desc: 'Filter to verified brand accounts',
    },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Preferences</Text>

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

export default JobPrefrences;

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