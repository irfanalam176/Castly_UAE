import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import DayRadio from '../../components/onboarding/DayRadio';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import {
  setField,
  toggleAvailabilityDay,
} from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';

const daysList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const shootDurationOptions = [
  { label: 'Single day shoots only', value: 'SINGLE_DAY' },
  { label: 'Multi-day shoots (up to 3 days)', value: 'MULTI_DAY' },
  { label: 'Extended campaigns (1 week+)', value: 'EXTENDED_CAMPAIGNS' },
];
const notice = ['Same day', '24 hours', '48 hours', '1 week+'];
const STAGGER = 150;

const Availability = () => {
  const dispatch = useDispatch();
  const { availability, shootDurationPreference, noticeRequired } = useSelector(
    (state: RootState) => state.onboarding,
  );

  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Your availability</Text>
        <Text style={styles.subHeading}>When are you available to shoot?</Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <Text style={styles.inputLabel}>Available Days</Text>
        <View style={styles.dayRow}>
          {daysList.map(item => (
            <DayRadio
              key={item}
              day={item}
              isActive={availability.includes(item)}
              onPress={() => dispatch(toggleAvailabilityDay(item))}
            />
          ))}
        </View>
        <Text style={styles.perWeek}>
          {availability.length} day{availability.length !== 1 ? 's' : ''} / week
          selected
        </Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 3}>
        <Text style={styles.inputLabel}>Shoot Duration Preference</Text>
      </SlideLeftFade>

      {shootDurationOptions.map((item, index) => {
        const isActive = shootDurationPreference === item.value;
        return (
          <SlideLeftFade key={item.value} delay={STAGGER * (4 + index)}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                dispatch(
                  setField({
                    shootDurationPreference: isActive ? null : item.value,
                  }),
                )
              }
              style={
                isActive ? [styles.radio, styles.radioActive] : styles.radio
              }
            >
              <Text
                style={
                  isActive
                    ? [styles.radioText, styles.radioTextActive]
                    : styles.radioText
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          </SlideLeftFade>
        );
      })}

      <SlideLeftFade delay={STAGGER * 8}>
        <Text style={[styles.inputLabel, styles.noticeLabel]}>
          Notice Required
        </Text>
        <View style={styles.noticeGrid}>
          {notice.map(item => {
            const isActive = noticeRequired === item;
            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() =>
                  dispatch(setField({ noticeRequired: isActive ? null : item }))
                }
                style={
                  isActive
                    ? [styles.noticeRadio, styles.radioActive]
                    : styles.noticeRadio
                }
              >
                <Text
                  style={
                    isActive
                      ? [styles.radioText, styles.radioTextActive]
                      : styles.radioText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  inputLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
    marginBottom: correctSize(6),
  },
  noticeLabel: { marginTop: correctSize(8) },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(8),
    gap: correctSize(6),
  },
  perWeek: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    marginBottom: correctSize(16),
  },
  radio: {
    borderWidth: 1.4,
    borderRadius: 14,
    borderColor: colors.gray,
    paddingHorizontal: correctSize(15),
    paddingVertical: correctSize(13),
    marginBottom: correctSize(8),
  },
  radioActive: {
    backgroundColor: colors.darkgray_1,
    borderColor: colors.darkgray_1,
  },
  radioText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 13,
    color: colors.darkgray,
  },
  radioTextActive: { color: colors.primary },
  noticeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: correctSize(8) },
  noticeRadio: {
    borderWidth: 1.4,
    borderRadius: 14,
    borderColor: colors.gray,
    paddingHorizontal: correctSize(15),
    paddingVertical: correctSize(13),
    width: '48%',
  },
});
