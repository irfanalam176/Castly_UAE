import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomButton from '../../common/CustomButton';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import FlashIconFill from '../../../assets/svg/Profile/FlashIconFill';

interface FooterStepProps {
  totalSteps: number;
  currentStep: number;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const FooterStep = ({
  totalSteps,
  currentStep,
  onPress,
  loading,
  disabled,
}: FooterStepProps) => {
  return (
    <View style={styles.footer}>
      <View style={styles.bullets}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === currentStep;

          return (
            <View
              key={index}
              style={[styles.bullet, isActive && styles.bulletActive]}
            />
          );
        })}
      </View>

      <CustomButton
        title={
          currentStep === totalSteps - 1 ? 'Submit Application' : 'Continue'
        }
        arrow={currentStep === totalSteps - 1 ? false : true}
        icon={
          currentStep === totalSteps - 1 && (
            <FlashIconFill color={colors.darkgray_1} width={12} height={14} />
          )
        }
        onPress={onPress}
        loading={loading}
        disabled={disabled}
      />
    </View>
  );
};

export default FooterStep;
const styles = StyleSheet.create({
  footer: {
    padding: correctSize(16),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.white_1,
  },
  bullets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: correctSize(6),
    marginBottom: correctSize(12),
  },
  bullet: {
    width: correctSize(6),
    height: correctSize(6),
    borderRadius: 100,
    backgroundColor: colors.gray,
  },
  bulletActive: {
    width: correctSize(20),
    backgroundColor: colors.darkgray_1,
  },
});
