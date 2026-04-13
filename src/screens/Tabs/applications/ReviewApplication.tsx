import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import NavBar from '../../../components/common/NavBar';
import { colors } from '../../../utils/colors';
import JobHeader from '../../../components/applications/JobHeader';
import StarIcon from '../../../assets/svg/applications/StarIcon';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import CheckIcon from '../../../assets/svg/applications/CheckIcon';
import EditHeader from '../../../components/applications/EditHeader';
import CustomInput from '../../../components/common/CustomInput';
import LinkIcon from '../../../assets/svg/applications/LinkIcon';
import FileCard from '../../../components/common/FileCard';
import PdfIcon from '../../../assets/svg/applications/PdfIcon';
import CheckCircleIcon from '../../../assets/svg/applications/CheckCircleIcon';
import CoinsIcon from '../../../assets/svg/applications/CoinsIcon';
import { LevelsList, optionsList } from '../../../utils/array';
import LevelRadio from '../../../components/applications/LevelRadio';
import OptionsCard from '../../../components/applications/OptionsCard';
import MatchScoreCard from '../../../components/applications/MatchScoreCard';
import CustomButton from '../../../components/common/CustomButton';
import CalendarFillIcon from '../../../assets/svg/Home/CalendarFillIcon';
import HorizontalDots from '../../../assets/svg/applications/HorizontalDots';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import {
  useApplyToProjectMutation,
  useGetSpecificJobsQuery,
} from '../../../services/applicationApi';
import Toast from 'react-native-toast-message';
import { stackRoutes } from '../../../navigation/screenIds';
import DatePicker from 'react-native-date-picker';

import { ActivityIndicator } from 'react-native';
import { pick } from '@react-native-documents/picker';
import { useFilesPresignMutation } from '../../../services/profileAPI';
import { uploadToS3 } from '../../../utils/uploadToS3';
import CrossIcon from '../../../components/vectorIcons/CrossIcon';
import UploadIcon from '../../../assets/svg/applications/UploadIcon';
import { NavProp } from '../../../navigation/navigationTypes';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const ReviewApplication = () => {
  const [applyToProject, { isError, isLoading, isSuccess, error }] =
    useApplyToProjectMutation();
  const route = useRoute<RouteProp<{ params: { id: string } }>>();

  const navigation = useNavigation<NavProp>();
  const { applicationData, id }: any = route.params;

  const params = {
    id: id,
  };

  const { data } = useGetSpecificJobsQuery(params);
  const selectedJob = data?.data || {};
  // Individual editing states for each section
  const [isEditingCoverLetter, setIsEditingCoverLetter] = useState(false);
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [isEditingOptions, setIsEditingOptions] = useState(false);

  // Local state for editable fields
  const [coverLetter, setCoverLetter] = useState(
    applicationData.coverLetter || '',
  );
  const [portfolioUrl, setPortfolioUrl] = useState(
    applicationData.portfolioUrl || null,
  );
  const [resumeUrl, setResumeUrl] = useState(applicationData.resumeUrl || '');

  const [availabilityStart, setAvailabilityStart] = useState<Date | null>(
    applicationData.availabilityStart
      ? new Date(applicationData.availabilityStart)
      : null,
  );

  const [availabilityEnd, setAvailabilityEnd] = useState<Date | null>(
    applicationData.availabilityEnd
      ? new Date(applicationData.availabilityEnd)
      : null,
  );

  const [expectedRate, setExpectedRate] = useState(
    `${applicationData?.expectedRate}` || '',
  );

  const [xpLevel, setXpLevel] = useState(() => {
    const level = LevelsList.find(
      l => l.value === applicationData.experienceLevel,
    );
    return level ? level.id : 1;
  });

  const [shareContactDetails, setShareContactDetails] = useState(
    applicationData.shareContactDetails,
  );
  const [availableForTravel, setAvailableForTravel] = useState(
    applicationData.availableForTravel,
  );
  const [flexibleWithTiming, setFlexibleWithTiming] = useState(
    applicationData.flexibleWithTiming,
  );

  // Date picker state
  const [open, setOpen] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<'start' | 'end'>(
    'start',
  );

  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    fileName: string;
    fileSize?: number;
  } | null>(applicationData.uploadedFile || null);
  const [filesPresign] = useFilesPresignMutation();

  // Format single date for display
  const formatSelectedDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get experience level ID from value
  const getExperienceLevelId = () => {
    return xpLevel;
  };

  // Options values from state
  const optionsValues = {
    '1': shareContactDetails,
    '2': availableForTravel,
    '3': flexibleWithTiming,
  };

  const handleOptionsChange = (id: string, value: boolean) => {
    if (id === '1') setShareContactDetails(value);
    if (id === '2') setAvailableForTravel(value);
    if (id === '3') setFlexibleWithTiming(value);
  };

  async function submitApplication() {
    try {
      // Prepare payload from current state
      const payload = {
        coverLetter,
        portfolioUrl: portfolioUrl || null,
        resumeUrl,
        availabilityStart: availabilityStart?.toISOString(),
        availabilityEnd: availabilityEnd?.toISOString(),
        expectedRate: parseInt(expectedRate.replace(/[^0-9]/g, '')) || 0,
        currency: applicationData.currency || 'AED',
        experienceLevel:
          LevelsList.find(l => l.id === xpLevel)?.value || 'INTERMEDIATE',
        shareContactDetails,
        availableForTravel,
        flexibleWithTiming,
        matchScore: applicationData.matchScore,
      };


      const result = await applyToProject({
        projectId: selectedJob?.id,
        payload: payload,
      }).unwrap();
      
      Toast.show({ text1: 'Application submitted successfully' });
      navigation.navigate(stackRoutes.TabNavigator, {
        screen: stackRoutes.StackApplications,
      });
    } catch (err) {
      console.log(err);

      Toast.show({ text1: 'Something went wrong', type: 'error' });
    }
  }

  const datePicker = () => (
    <DatePicker
      modal
      open={open}
      date={
        (datePickerMode === 'start' ? availabilityStart : availabilityEnd) ??
        new Date()
      }
      mode="date"
      minimumDate={
        datePickerMode === 'end' && availabilityStart
          ? availabilityStart
          : new Date()
      }
      onConfirm={date => {
        setOpen(false);
        if (datePickerMode === 'start') {
          setAvailabilityStart(date);
          // Reset end date if it's before the new start date
          if (availabilityEnd && date > availabilityEnd) {
            setAvailabilityEnd(null);
          }
        } else {
          setAvailabilityEnd(date);
        }
      }}
      onCancel={() => setOpen(false)}
    />
  );

  async function uploadResume() {
    type MediaType = {
      uri: string;
      fileName: string;
      type: string;
      fileSize?: number;
    };

    try {
      setUploading(true);
      const [resume] = await pick({
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      });

      const MAX_SIZE = 10 * 1024 * 1024; // 10MB

      if (resume.size && resume.size > MAX_SIZE) {
        Toast.show({
          type: 'error',
          text1: 'File too large',
          text2: 'Max file size is 10MB',
        });
        return;
      }

      const media: MediaType = {
        uri: resume.uri,
        fileName: resume.name ?? 'resume',
        type: resume.type ?? 'application/octet-stream',
        fileSize: resume.size ?? undefined,
      };

      const payload = {
        fileName: media.fileName,
        contentType: media.type,
        size: media.fileSize,
        acl: 'public-read',
      };

      const presignRes = await filesPresign(payload).unwrap();
      const { uploadUrl, key } = presignRes.data;

      await uploadToS3(uploadUrl, media, percent => {});
      setResumeUrl(key);
      setUploadedFile({
        fileName: media.fileName,
        fileSize: media.fileSize,
      });
    } catch (err) {
      console.log('file picker error === ', err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <ScreenWrapper>
      {datePicker()}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <NavBar
          title="Review Application"
          hideLeftIcon={false}
          showRightIcon={true}
          svgIcon={<HorizontalDots />}
          rightIconName="ellipsis-vertical"
          rightIconFamily="FontAwesome6"
          rightIconColor={colors.black}
          rightButtonColor={colors.white_1}
          border={true}
          onRightPress={() => {}}
        />

        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.container}>
            <JobHeader
              title={selectedJob?.title}
              brand={selectedJob?.user?.companyName}
            >
              <View style={styles.row}>
                <View style={styles.rating}>
                  <StarIcon color={colors.orange} />
                  <Text style={styles.ratingText}>{selectedJob?.user?.rating || 0}</Text>
                </View>
                <Text style={styles.locationText}> ({selectedJob?.user?.receivedRatings?.length || 0} reviews)</Text>
              </View>
            </JobHeader>
          </View>

          <View style={[styles.container, { marginBottom: correctSize(12) }]}>
            <View style={styles.titleHeader}>
              <View style={styles.iconContainer}>
                <CheckIcon color={colors.darkgray_1} />
              </View>
              <Text style={styles.heading}>Review Your Application</Text>
            </View>
            <Text style={styles.mainText}>
              Please review all information before submitting. You can edit any
              section by tapping on it.
            </Text>
          </View>

          <View style={styles.container}>
            <EditHeader
              title="Cover Letter"
              onEditPress={() => setIsEditingCoverLetter(!isEditingCoverLetter)}
            />

            <View style={styles.textArea}>
              <TextInput
                multiline
                maxLength={500}
                numberOfLines={7}
                placeholder={`Tell us why you're perfect for this role...`}
                value={coverLetter}
                onChangeText={setCoverLetter}
                placeholderTextColor={colors.darkgray}
                editable={isEditingCoverLetter}
                style={styles.textInput}
              />
              <Text style={styles.countText}>
                {coverLetter?.length || 0}/500 characters
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <EditHeader
              title="Portfolio Link (Optional)"
              onEditPress={() => setIsEditingPortfolio(!isEditingPortfolio)}
            />
            <CustomInput
              editable={isEditingPortfolio}
              leftSvgIcon={<LinkIcon />}
              placeholder="https://yourportfolio.com"
              placeholderTextColor={colors.gray_3}
              value={portfolioUrl}
              onChangeText={setPortfolioUrl}
              inputContainerStyle={{
                backgroundColor: colors.lightBlue_5,
                borderColor: colors.gray,
              }}
            />
          </View>

          <View style={styles.container}>
            <EditHeader
              title="Resume"
              onEditPress={() => setIsEditingResume(!isEditingResume)}
            />

            {isEditingResume ? (
              // ── EDIT MODE: show upload UI ──────────────────────────────
              <>
                <TouchableOpacity
                  style={styles.uploadContainer}
                  onPress={uploadResume}
                  disabled={uploading}
                >
                  {uploadedFile ? (
                    <View style={styles.fileRow}>
                      <Text style={styles.fileName}>
                        {uploadedFile.fileName}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setResumeUrl('');
                          setUploadedFile(null);
                        }}
                      >
                        <CrossIcon fillColor={colors.red} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={[
                        { alignItems: 'center' },
                        uploading && { opacity: 0.6 },
                      ]}
                    >
                      {uploading ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.orange_3}
                        />
                      ) : (
                        <>
                          <UploadIcon />
                          <Text style={styles.uploadText}>Click to upload</Text>
                          <Text style={styles.formateText}>
                            PDF, DOC up to 10MB
                          </Text>
                        </>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              </>
            ) : // ── VIEW MODE: show FileCard if a file exists ──────────────
            uploadedFile ? (
              <FileCard
                borderWidth={1}
                icon={<PdfIcon />}
                name={uploadedFile.fileName}
                size={
                  uploadedFile.fileSize
                    ? (uploadedFile.fileSize / (1024 * 1024)).toFixed(2)
                    : '—'
                }
                rightIcon={
                  <CheckCircleIcon
                    width={24}
                    height={20}
                    color={colors.green}
                  />
                }
              />
            ) : (
              <Text style={styles.noFileText}>No resume uploaded</Text>
            )}
          </View>

          <View style={styles.container}>
            <EditHeader
              title="Availability"
              onEditPress={() =>
                setIsEditingAvailability(!isEditingAvailability)
              }
            />

            {/* Start Date */}
            <Text style={styles.dateLabel}>Start Date</Text>
            <View style={styles.datePickerRow}>
              <Text style={styles.dateText}>
                {formatSelectedDate(availabilityStart)}
              </Text>

              <TouchableOpacity
                style={styles.datePickerBtn}
                onPress={() => {
                  if (isEditingAvailability) {
                    setDatePickerMode('start');
                    setOpen(true);
                  }
                }}
                disabled={!isEditingAvailability}
              >
                <CalendarFillIcon
                  color={isEditingAvailability ? colors.black_1 : colors.gray_3}
                  width={17}
                  height={18}
                />
              </TouchableOpacity>
            </View>

            {/* End Date */}
            <Text style={styles.dateLabel}>End Date</Text>
            <View style={styles.datePickerRow}>
              <Text style={styles.dateText}>
                {formatSelectedDate(availabilityEnd)}
              </Text>

              <TouchableOpacity
                style={styles.datePickerBtn}
                onPress={() => {
                  if (isEditingAvailability) {
                    setDatePickerMode('end');
                    setOpen(true);
                  }
                }}
                disabled={!isEditingAvailability}
              >
                <CalendarFillIcon
                  color={isEditingAvailability ? colors.black_1 : colors.gray_3}
                  width={17}
                  height={18}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            <EditHeader
              title="Expected Rate"
              onEditPress={() => setIsEditingRate(!isEditingRate)}
            />
            <CustomInput
              editable={isEditingRate}
              leftSvgIcon={<CoinsIcon color={colors.gray_3} />}
              placeholder="AED 2,500"
              value={expectedRate}
              onChangeText={setExpectedRate}
              keyboardType="numeric"
              leftText={applicationData?.currency}
              leftIconContainerStyle={styles.expectedRate}
              inputStyle={styles.expectedRateInput}
              inputContainerStyle={{
                backgroundColor: colors.lightBlue_5,
                borderColor: colors.gray,
              }}
            />
            <Text style={styles.suggestText}>
              Suggested: {applicationData?.currency}{" "}{expectedRate}/day
            </Text>
          </View>

          <View style={styles.container}>
            <EditHeader
              title="Experience Level"
              onEditPress={() => setIsEditingLevel(!isEditingLevel)}
            />

            <View style={styles.levelRow}>
              {LevelsList.map(item => (
                <LevelRadio
                  label={item.label}
                  isActive={item.id === getExperienceLevelId()}
                  key={item.id}
                  onPress={
                    isEditingLevel ? () => setXpLevel(item.id) : undefined
                  }
                />
              ))}
            </View>
          </View>

          <View style={styles.grayContainer}>
            <OptionsCard
              options={optionsList}
              title="Additional Information"
              values={optionsValues}
              onValueChange={isEditingOptions ? handleOptionsChange : undefined}
            />

            <MatchScoreCard percentage={applicationData.matchScore} />

            <View>
              {/* Submit Application Button */}
              <CustomButton
                title="Submit Application"
                onPress={submitApplication}
                disabled={
                  coverLetter.trim().length === 0 ||
                  isLoading ||
                  !resumeUrl.trim()
                } // Disable if cover letter is empty or resume not uploaded
                loading={isLoading}
                style={styles.submitButton}
                textStyle={styles.submitButtonText}
              />

              {/* Save as Draft Button */}
              <CustomButton
                title="Go Back to Edit"
                style={styles.draftButton}
                textStyle={styles.draftButtonText}
                onPress={() => navigation.goBack()} // Just go back to edit, no need to save as draft since data is in local state
              />
              <Text style={styles.footerText}>
                By applying, you agree to our Terms & Conditions
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default ReviewApplication;

const styles = StyleSheet.create({
   expectedRate:{
      flexDirection:"row",
      alignItems:"center",
      gap:correctSize(16)
    },
    expectedRateInput:{
      fontSize:18,
      fontFamily:Fonts.Inter_Regular,
      color:colors.darkgray
    },
  dateLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray_1,
    marginBottom: correctSize(8),
    marginTop: correctSize(12),
  },
  levelRow: {
    flexDirection: 'row',
    gap: correctSize(10),
  },
  suggestText: {
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    fontSize: 14,
    marginTop: correctSize(5),
  },
  body: {
    backgroundColor: colors.lightBlue_5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: correctSize(12),
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
  },
  ratingText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  locationText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  container: {
    padding: correctSize(24),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  grayContainer: {
    padding: correctSize(24),
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    marginTop: correctSize(30),
    marginBottom: correctSize(16),
  },
  iconContainer: {
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  mainText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  textArea: {
    height: correctSize(198),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: correctSize(8),
    backgroundColor: colors.lightBlue_5,
  },
  textInput: {
    color: colors.darkgray,
    verticalAlign: 'top',
    flex: 1,
  },
  countText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_3,
    marginVertical: correctSize(5),
  },
  footerText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    textAlign: 'center',
    marginTop: correctSize(12),
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  datePickerBtn: {
    width: correctSize(58),
    height: correctSize(58),
    borderRadius: 14,
    backgroundColor: colors.white_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 17,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.black,
    borderRadius: 14,
    height: correctSize(58),
    marginRight: correctSize(10),
    verticalAlign: 'middle',
    textAlign: 'center',
    flex: 1,
    backgroundColor: colors.primary,
  },

  submitButton: {
    backgroundColor: colors.primary, // will automatically turn gray if disabled
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    marginTop: correctSize(24),
    marginBottom: correctSize(12),
    height: correctSize(50),
    fontFamily: Fonts.Inter_Bold,
  },
  submitButtonText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 18,
    color: colors.black, // will turn colors.gray_2 when disabled
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  draftButton: {
    paddingVertical: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: correctSize(50),
  },
  draftButtonText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 16,
    color: colors.black,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: correctSize(10),
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 12,
    borderStyle: 'dotted',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.white,
    width: '100%',
  },
  fileName: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.black,
    flex: 1,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    marginVertical: correctSize(12),
  },
  formateText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_3,
  },
  noFileText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginTop: correctSize(8),
  },
});
