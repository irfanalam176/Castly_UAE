import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  ScrollView,
} from 'react-native-actions-sheet';
import CrossIcon from '../vectorIcons/CrossIcon';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CompanyInfoCard from './CompanyInfoCard';
import RoleCard from './RoleCard';
import PaymentSummaryCard from './PaymentSummaryCard';
import Icons from '../vectorIcons/Icons';
import CustomButton from '../common/CustomButton';
import { correctSize } from '../../utils';
import { requirementsList } from '../../utils/array';
import RequirementsCard from '../common/RequirementsCard';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../../navigation/screenIds';
import { getTotalBudgetPerMember } from '../../utils/getTotalBudgetPerMember ';
import { NavProp } from '../../navigation/navigationTypes';

const ApplyJobActionSheet = forwardRef<ActionSheetRef,any>(
  ({ selectedJob }: any, ref) => {
    const navigation = useNavigation<NavProp>();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleClose = useCallback(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.hide();
      }
    }, [ref]);

    const toggleConfirm = useCallback(() => {
      setIsConfirmed(prev => !prev);
    }, []);
    
    const handleConfirmApplication = useCallback(() => {
      navigation.navigate(stackRoutes.ApplyForJob, {id:selectedJob?.id });
    }, [navigation, selectedJob]);

    // Calculate baseRate more efficiently


    // Pre-calculate all job data - this runs BEFORE the sheet opens
    const jobData = useMemo(() => {
      if (!selectedJob) return null;

      return {
        title: selectedJob?.title,
        companyName: selectedJob?.user?.companyName,
        location: selectedJob?.specifyLocation || 'N/A',
        jobDate: selectedJob?.startDate,
        category: selectedJob?.category,
        duration: selectedJob?.workingHoursPerDay,
        currencyType: selectedJob?.currency,
        platformFee: selectedJob?.platformFee,
        position: selectedJob?.user?.role,
        baseRate:selectedJob?.subtotal
      };
    }, [selectedJob]);

    // Render content immediately - no conditional rendering
    return (
      <ActionSheet
        ref={ref}
        gestureEnabled={false}
        containerStyle={styles.sheetStyle}
        onClose={handleClose}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Confirm Application</Text>

          <Pressable onPress={handleClose}>
            <View style={styles.closeIcon}>
              <CrossIcon fillColor={colors.black} />
            </View>
          </Pressable>
        </View>

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: correctSize(40) }}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          removeClippedSubviews={true}
        >
          {jobData && (
            <>
              <CompanyInfoCard
                title={jobData.title}
                companyName={jobData.companyName}
                location={jobData.location}
                jobDate={jobData.jobDate}
              />

              <RoleCard
                category={jobData?.category}
                duration={jobData?.duration}
                position={jobData?.position}
              />

              <PaymentSummaryCard
                currencyType={jobData.currencyType}
                platformFee={jobData.platformFee}
                baseRate={jobData.baseRate}
              />

              <RequirementsCard
                data={requirementsList}
                title="Important Requirements"
                bgColor={colors.lightYellow}
                borderColor={colors.yellow}
              />

              <View style={styles.termContainer}>
                <TouchableOpacity
                  style={styles.leftContainer}
                  onPress={toggleConfirm}
                  activeOpacity={0.7}
                >
                  <Icons
                    family={'MaterialIcons'}
                    name={isConfirmed ? 'check-box' : 'check-box-outline-blank'}
                    color={isConfirmed ? colors.darkGreen_2 : colors.black}
                    size={20}
                  />
                </TouchableOpacity>
                <View style={styles.rightContainer}>
                  <Text style={styles.confirmationText}>
                    I confirm that I'm available for this job and agree to the{' '}
                    <Text style={styles.termsText}>terms and conditions</Text>.
                    I understand that cancellations may affect my rating.
                  </Text>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <CustomButton
                  title="Confirm Application"
                  onPress={handleConfirmApplication}
                  disabled={!isConfirmed}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
                <Text style={styles.bottomHelperText}>
                  You can cancel up to 24 hours before the job
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </ActionSheet>
    );
  },
);

export default React.memo(ApplyJobActionSheet);

const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: colors.white,
  },
  container: {
    padding: correctSize(24),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: correctSize(24),
    paddingBottom: correctSize(17),
    paddingTop: correctSize(40),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  closeIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  termContainer: {
    flexDirection: 'row',
    marginBottom: correctSize(24),
    backgroundColor: colors.lightBlue_5,
    borderRadius: 16,
    padding: 20,
    marginTop: correctSize(24),
  },
  rightContainer: {
    width: '95%',
  },
  leftContainer: {
    width: '8%',
  },
  confirmationText: {
    fontSize: 12,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginLeft: correctSize(10),
    lineHeight: 23,
  },
  termsText: {
    color: colors.purple,
    fontFamily: Fonts.Inter_Bold,
    fontSize: 14,
  },
  bottomContainer: {
    paddingTop: correctSize(21),
    borderTopWidth: 1,
    borderColor: colors.gray,
  },
  bottomHelperText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginLeft: 12,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: correctSize(60),
  },
   button: {
    backgroundColor: colors.primary, // will turn gray automatically when disabled
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: correctSize(44),
    paddingVertical:0,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 16,
    textTransform: 'none',
    color: colors.black, // will turn colors.gray_2 automatically when disabled
    textAlign: 'center',
  },
});
