import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';

interface JobInfoBadgeProps {
  label?: string;
  value?: string;
  icon?: React.ReactNode;
  withGradient?: boolean;
}

const JobInfoBadge = ({
  label,
  value,
  icon,
  withGradient,
}: JobInfoBadgeProps) => {
  const Content = () => (
    <>
      <View style={styles.labelContain}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </>
  );

  if (withGradient) {
    return (
      <LinearGradient
        colors={[colors.lightBlue_2, colors.lightBlue_4]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.jobInfoBadge}
      >
        <Content />
      </LinearGradient>
    );
  }

  return (
    <View style={styles.jobInfoBadge}>
      <Content />
    </View>
  );
};

export default JobInfoBadge;

const styles = StyleSheet.create({
  jobInfoBadge: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
    padding: correctSize(16),
    // flexGrow:1,
    width: '47%',
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 12,
  },
  value: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 14,
    marginTop: correctSize(5),
  },
  labelContain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
});
