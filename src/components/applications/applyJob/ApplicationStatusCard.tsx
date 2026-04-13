import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';
import { Fonts } from '../../../assets/fonts';

type StatusStep = {
  label: string;
  time?: string;
  completed: boolean;
  status?:string
};

interface ApplicationStatusCardProps {
  steps?: StatusStep[];
}

const DEFAULT_STEPS: StatusStep[] = [
  { label: 'Submitted', time: 'Just now', completed: true },
  { label: 'Under Review by Brand', time: 'Within 24–48h', completed: false },
  { label: 'Shortlisted / Rejectedd', time: 'By Dec 15', completed: false },
  { label: 'Booking Confirmed', time: 'By Dec 16', completed: false },
];

const ApplicationStatusCard = ({
  steps = DEFAULT_STEPS,
}: ApplicationStatusCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Status</Text>

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <View key={index} style={styles.statusContainer}>
            {/* Icon + Line column */}
            <View style={styles.iconColumn}>
              <View
                style={[
                  styles.iconContainer,
                  step.completed
                    ? styles.iconCompleted
                    : styles.iconPending,
                ]}>
                {step.completed ? (
                  <CheckIcon color={colors.primary} width={10} height={10} />
                ) : null}
              </View>
              {!isLast && <View style={styles.verticalLine} />}
            </View>

            {/* Text column */}
            <View style={styles.textColumn}>
              <Text
                style={[
                  styles.statusText,
                  !step.completed && styles.statusTextPending,
                ]}>
                {step.label}
              </Text>
              {/* {step.time ? (
                <Text style={styles.statusTime}>{step.time}</Text>
              ) : null} */}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ApplicationStatusCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: correctSize(16),
    borderWidth: correctSize(0.7),
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: correctSize(1) },
    shadowOpacity: 0.1,
    shadowRadius: correctSize(3),
    elevation: 2,
    padding: correctSize(16),
    marginTop:correctSize(24)
  },
  title: {
    color: colors.gray_3,
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: correctSize(10),
    lineHeight: correctSize(15),
    textTransform: 'uppercase',
    marginBottom: correctSize(12),
  },
  statusContainer: {
    flexDirection: 'row',
    gap: correctSize(12),
  },
  iconColumn: {
    alignItems: 'center',
    width: correctSize(20),
  },
  iconContainer: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: correctSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCompleted: {
    backgroundColor: colors.darkgray_1,
  },
  iconPending: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gray,
  },
  verticalLine: {
    width: 1.5,
    flex: 1,
    minHeight: correctSize(16),
    backgroundColor: colors.gray,
    marginVertical: correctSize(3),
  },
  textColumn: {
    flex: 1,
    paddingBottom: correctSize(12),
  },
  statusText: {
    color: colors.darkgray_1,
    fontFamily: Fonts.Inter_Medium,
    fontSize: correctSize(13),
    lineHeight: correctSize(20),
  },
  statusTextPending: {
    color: colors.gray_3,
  },
  statusTime: {
    color: colors.gray_3,
    fontFamily: Fonts.Inter_Regular,
    fontSize: correctSize(11),
    lineHeight: correctSize(17),
  },
});