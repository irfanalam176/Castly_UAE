import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import ActionSheet, { ActionSheetRef, ScrollView } from 'react-native-actions-sheet';
import { correctSize } from '../../../utils';
import CrossIcon from '../../../components/vectorIcons/CrossIcon';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import WarningIcons from '../../../assets/svg/common/WarningIcons';
import CustomButton from '../../../components/common/CustomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReportIssueMutation } from '../../../services/applicationApi';
import Toast from 'react-native-toast-message';

interface Props {
  actionSheetRef: React.RefObject<ActionSheetRef | null>;
  jobTitle?: string;
  brandName?: string;
  escrowAmount?: number;
  applicationId?: string;
}

const ISSUE_OPTIONS = [
  {
    id: 'cancelled',
    emoji: '❌',
    label: 'Brand cancelled last minute',
    issueType: 'BRAND_CANCELLED',
  },
  {
    id: 'payment',
    emoji: '💸',
    label: 'Payment not received',
    issueType: 'PAYMENT_NOT_RECEIVED',
  },
  {
    id: 'conditions',
    emoji: '📋',
    label: 'Shoot conditions different to brief',
    issueType: 'CONDITIONS_DIFFERENT',
  },
  {
    id: 'safety',
    emoji: '🚨',
    label: 'Safety concern on set',
    issueType: 'SAFETY_CONCERN',
  },
  {
    id: 'noshow',
    emoji: '👥',
    label: "Brand/crew didn't show up",
    issueType: 'NO_SHOW',
  },
  { id: 'other', emoji: '❓', label: 'Other issue', issueType: 'OTHER' },
];

const showToast = (message: string,type:string) => {
 Toast.show({
    type:type,
    text1:message
 })
};

const ReportIssueSheet = ({
  actionSheetRef,
  jobTitle,
  brandName,
  escrowAmount,
  applicationId,
}: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const insets = useSafeAreaInsets();
  const bottomInset =
    Platform.OS === 'android' ? correctSize(48) : insets.bottom;

  const [reportIssue, { isLoading }] = useReportIssueMutation();

  const handleSubmit = async () => {
    const selectedOption = ISSUE_OPTIONS.find(o => o.id === selectedId);
    if (!selectedOption || !applicationId) return;

    try {
        const payload={
        applicationId,
        issueType: selectedOption.issueType,
        details: details.trim(),
      }
      console.log(payload);
      
      await reportIssue(payload).unwrap();

      showToast('Your dispute has been submitted successfully.',"success");
      actionSheetRef.current?.hide();
    } catch(e) {
        console.log("Submit error",e);
        
      showToast('Failed to submit dispute. Please try again.',"error");
      actionSheetRef.current?.hide();
    }
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled={false}
      containerStyle={[
        styles.actionSheet,
        { height: correctSize(700) + bottomInset },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.warningIcon}>
            <WarningIcons width={17} height={17} />
          </View>
          <View>
            <Text style={styles.title}>Report an Issue</Text>
            <Text style={styles.subtitle}>
              Castly will investigate within 24h
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => actionSheetRef.current?.hide()}
        >
          <CrossIcon fillColor={colors.darkgray_1} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
      >
        {/* Job Info Card */}
        {(jobTitle || brandName) && (
          <View style={styles.jobCard}>
            <WarningIcons width={14} height={14} />
            <View style={{ flex: 1 }}>
              <Text style={styles.jobTitle} numberOfLines={1}>
                {jobTitle}
              </Text>
              <Text style={styles.jobMeta}>
                {brandName}
                {escrowAmount
                  ? ` · AED ${escrowAmount.toLocaleString()} in escrow`
                  : ''}
              </Text>
            </View>
          </View>
        )}

        {/* Issue Options */}
        <Text style={styles.sectionLabel}>What happened? *</Text>
        <View style={styles.optionsList}>
          {ISSUE_OPTIONS.map(option => {
            const isSelected = selectedId === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionRow,
                  isSelected && styles.optionRowSelected,
                ]}
                onPress={() => setSelectedId(option.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Additional Details */}
        <Text style={styles.sectionLabel}>Additional Details</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Describe what happened in as much detail as possible"
          placeholderTextColor={colors.gray_3}
          multiline
          value={details}
          onChangeText={setDetails}
        />
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(bottomInset, correctSize(16)) },
        ]}
      >
        <CustomButton
          title={isLoading ? 'Submitting...' : 'Submit Dispute'}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          disabledTextColor={colors.white}
          disabled={!selectedId || isLoading}
          onPress={handleSubmit}
        />
      </View>
    </ActionSheet>
  );
};

export default ReportIssueSheet;

const styles = StyleSheet.create({
  actionSheet: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(18),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
  },
  warningIcon: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 14,
    backgroundColor: colors.light_red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginTop: correctSize(2),
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: colors.white_1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: correctSize(20),
    paddingTop: correctSize(16),
    paddingBottom: correctSize(8),
    gap: correctSize(4),
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
    backgroundColor: colors.light_red,
    borderRadius: correctSize(10),
    borderWidth: 0.7,
    borderColor: colors.red_3,
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(12),
    marginBottom: correctSize(16),
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.red_3,
  },
  jobMeta: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.red_3,
    marginTop: correctSize(2),
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(10),
    marginTop: correctSize(4),
  },
  optionsList: {
    gap: correctSize(8),
    marginBottom: correctSize(20),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
    borderRadius: correctSize(12),
    borderWidth: 0.7,
    borderColor: colors.gray,
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(14),
    backgroundColor: colors.white,
  },
  optionRowSelected: {
    borderColor: colors.red_3,
    backgroundColor: colors.light_red,
  },
  optionEmoji: {
    fontSize: 18,
  },
  optionLabel: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray_1,
  },
  optionLabelSelected: {
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.red_3,
  },
  checkmark: {
    fontSize: 14,
    color: colors.red_3,
    fontFamily: Fonts.Inter_Bold,
  },
  textInput: {
    backgroundColor: colors.lightBlue_5,
    borderWidth: 0.7,
    borderColor: colors.gray,
    borderRadius: correctSize(12),
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(12),
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
    minHeight: correctSize(90),
    textAlignVertical: 'top',
    marginBottom: correctSize(8),
  },
  footer: {
    paddingHorizontal: correctSize(20),
    paddingTop: correctSize(16),
    borderTopWidth: 0.5,
    borderTopColor: colors.gray,
    backgroundColor: colors.white,
  },
  submitBtn: {
    backgroundColor: colors.red_3,
    borderRadius: correctSize(14),
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 15,
    fontFamily: Fonts.Inter_SemiBold,
  },
});
