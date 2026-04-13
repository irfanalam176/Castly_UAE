import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Fonts } from '../../../../assets/fonts';
import { colors } from '../../../../utils/colors';
import { correctSize } from '../../../../utils';

import InfoIcon from '../../../../assets/svg/common/InfoIcon';
import AvailabilityCard from '../../../../components/applications/applyJob/AvailabilityCard';
import MapPin from '../../../../assets/svg/common/MapPin';
import { RootState } from '../../../../redux/stores/store';

import {
  setDays,
  updateDayConfirmation,
} from '../../../../redux/reducers/availabilitySlice';
import { formatTime } from '../../../../utils/formatTime';
import { SlideLeftFade } from '../../../../components/Animation';
import { formatDate } from '../../../../utils/formatDate';

const Availability = () => {
  const dispatch = useDispatch();
  const days = useSelector((state: RootState) => state.availability.days);
  const { data } = useSelector((state: RootState) => state.applyJobProgress);

  useEffect(() => {
    if (!data?.availabilitySelections?.length) return;
    dispatch(setDays(data.availabilitySelections));
  }, [data?.availabilitySelections]);

  const toggleDay = (dayNumber: number) => {
    const currentDay = days.find(d => d.dayNumber === dayNumber);
    if (currentDay) {
      dispatch(
        updateDayConfirmation({ dayNumber, confirmed: !currentDay.confirmed }),
      );
    }
  };

  const jobLocation = data?.availabilitySelections?.[0]?.location ?? '...';

  const STAGGER = 150;
  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Confirm Availability</Text>
        <Text style={styles.subHeading}>
          Confirm you are available for all shoot days.
        </Text>
      </SlideLeftFade>
      
      <SlideLeftFade delay={STAGGER * 2}>
        <View style={styles.infoCard}>
          <InfoIcon />
          <Text style={styles.infoText}>
            This job requires availability for
            <Text style={styles.boldText}> {days.length}</Text> days. Please
            confirm you are free for each day below.
          </Text>
        </View>
      </SlideLeftFade>
      <View style={{ marginTop: correctSize(16) }}>
        {days.map((item:any, index:any) => (
          <SlideLeftFade key={item?.dayNumber} delay={STAGGER * (3 + index)}>
            <AvailabilityCard
              checked={item?.confirmed}
              onPress={() => toggleDay(item.dayNumber)}
              day={`Day ${item?.dayNumber} - ${formatDate(item?.date)}`}
              time={
                item.startTimeLabel && item.endTimeLabel
                  ? `${formatTime(item.startTimeLabel)} – ${formatTime(
                      item.endTimeLabel,
                    )}`
                  : '..:.. – ..:..'
              }
              duration={item?.durationHours}
              badge={item?.label || '...'}
            />
          </SlideLeftFade>
        ))}
      </View>

      <SlideLeftFade delay={STAGGER * 4}>
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>Location</Text>
          <View style={styles.locationRow}>
            <MapPin color={colors.red} />
            <Text style={styles.location}>{jobLocation}</Text>
          </View>
        </View>
      </SlideLeftFade>
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.darkgray_1,
  },
  subHeading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(16),
  },
  infoCard: {
    flexDirection: 'row',
    gap: correctSize(8),
    backgroundColor: colors.lightBlue_7,
    borderWidth: 1,
    borderColor: colors.lightBlue_6,
    borderRadius: 14,
    padding: correctSize(12),
  },
  infoText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.blue_8,
    flex: 1,
    lineHeight: correctSize(20),
  },
  boldText: {
    fontFamily: Fonts.Inter_Bold,
  },
  locationCard: {
    padding: correctSize(16.7),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white_1,
    borderRadius: 14,
  },
  locationTitle: {
    fontSize: 11,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  location: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  locationRow: {
    marginTop: correctSize(5),
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
  },
});
