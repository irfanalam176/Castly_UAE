import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../../../assets/fonts';
import { colors } from '../../../../utils/colors';
import { correctSize } from '../../../../utils';
import ProfileCard from '../../../../components/applications/applyJob/ProfileCard';
import ShineIcon from '../../../../assets/svg/Profile/ShineIcon';
import ApplicationsDetail from '../../../../components/applications/applyJob/ApplicationDetails';
import { SlideLeftFade } from '../../../../components/Animation';

const ConfirmProfile = () => {
  const STAGGER = 150;
  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Confirm Your Profile</Text>
        <Text style={styles.subHeading}>
          Make sure your details match the job requirements.
        </Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <ProfileCard />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 3}>
        <ApplicationsDetail />
      </SlideLeftFade>

      {/* <SlideLeftFade delay={STAGGER * 4}>
        <View style={styles.infoCard}>
          <ShineIcon color={colors.orange_4} />
          <Text style={styles.infoText}>
            Your measurements match Nike's requirements (Height: 175–185 cm,
            Size: S/M). You're a great physical fit for this role.
          </Text>
        </View>
      </SlideLeftFade> */}
    </View>
  );
};

export default ConfirmProfile;
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
    backgroundColor: colors.yellow_4,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    padding: correctSize(12),
  },
  infoText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkBrown_2,
    flex: 1,
    lineHeight: correctSize(20),
  },
});
