import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FlashIcon from '../../../assets/svg/Profile/FlashIcon';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import DayRadio from '../../onboarding/DayRadio';
import { useAddAvailabilityMutation } from '../../../services/profileAPI';
import Toast from 'react-native-toast-message';

const daysList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

type Props = {
  availableDays?: string[] | null;
};

const AvailabilityCard = ({ availableDays }: Props) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    availableDays ?? [],
  );
  const [addAvailability, { isLoading }] = useAddAvailabilityMutation();

  const toggleDay = async (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);

    try {
      await addAvailability({ days: updatedDays }).unwrap();
    } catch (err) {
      console.log("Avail", err);
      
      setSelectedDays(selectedDays);
      Toast.show({ type: 'error', text1: 'Failed to update availability' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlashIcon />
        <Text style={styles.title}>Weekly Availability</Text>
      </View>

      <View style={styles.dayRow}>
        {daysList.map(day => (
          <DayRadio
            key={day}
            day={day}
            isActive={selectedDays.includes(day)}
            onPress={() => !isLoading && toggleDay(day)}
          />
        ))}
      </View>

      <Text style={styles.summary}>
        {selectedDays.length} day{selectedDays.length !== 1 ? 's' : ''} / week
        available
      </Text>
    </View>
  );
};

export default AvailabilityCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    padding: correctSize(16),
    marginBottom: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(14),
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(10),
    gap: correctSize(6),
  },
  summary: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    marginTop: correctSize(4),
  },
});
