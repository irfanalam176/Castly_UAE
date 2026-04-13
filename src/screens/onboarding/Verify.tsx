import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import CustomInput from '../../components/common/CustomInput';
import IdVerificationCard from '../../components/onboarding/IdVerificationCard';
import ProfileSummaryTable from '../../components/onboarding/ProfileSummaryTable';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestPhotoLibraryPermission } from '../../utils/permissions';
import { presignAndUpload } from '../../utils/uploadToS3';
import Toast from 'react-native-toast-message';

const STAGGER = 150;

const Verify = () => {
  const dispatch = useDispatch();
  const { referralCode, idVerified, termsAgreed } = useSelector(
    (state: RootState) => state.onboarding,
  );
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const [idImageUri, setIdImageUri] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState(false);

  const handleIdUpload = async () => {
    const granted = await requestPhotoLibraryPermission();
    if (!granted) return;

    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (response.didCancel || response.errorCode) return;

    const asset = response.assets?.[0];
    if (!asset?.uri || !accessToken) return;

    try {
      setUploadingId(true);
      setIdImageUri(asset.uri); // show in UI immediately

      const { fileUrl, key } = await presignAndUpload(
        asset.uri,
        asset.fileName ?? `id_${Date.now()}.jpg`,
        asset.type ?? 'image/jpeg',
        accessToken,
      );

      dispatch(setField({ emiratesId: key, idVerified: true }));
    } catch (err) {
      console.log('upload error', err);

      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Could not upload ID. Please try again.',
      });
      setIdImageUri(null);
    } finally {
      setUploadingId(false);
    }
  };

  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Almost done 🎉</Text>
        <Text style={styles.subHeading}>Final step — verify & agree.</Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <CustomInput
          label="Referral Code (optional)"
          placeholder="e.g. CASTLY10"
          placeholderTextColor={colors.gray_3}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          labelStyle={styles.inputLabel}
          value={referralCode}
          onChangeText={v => dispatch(setField({ referralCode: v }))}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 3}>
        {/* Pass handler and state to IdVerificationCard */}
        <IdVerificationCard
          onUpload={handleIdUpload}
          uploading={uploadingId}
          imageUri={idImageUri}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        <TouchableOpacity
          style={styles.terms}
          onPress={() => dispatch(setField({ idVerified: !idVerified }))}
          activeOpacity={0.7}
        >
          <View style={[styles.check, idVerified && styles.checked]}>
            {idVerified && (
              <CheckIcon color={colors.white} width={12} height={13} />
            )}
          </View>
          <Text style={styles.termText}>
            I agree to Castly's ID Verification consent. My data is encrypted
            and never shared without consent.
          </Text>
        </TouchableOpacity>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 5}>
        <TouchableOpacity
          style={styles.terms}
          onPress={() => dispatch(setField({ termsAgreed: !termsAgreed }))}
          activeOpacity={0.7}
        >
          <View style={[styles.check, termsAgreed && styles.checked]}>
            {termsAgreed && (
              <CheckIcon color={colors.white} width={12} height={13} />
            )}
          </View>
          <Text style={styles.termText}>
            I agree to Castly's Terms of Service, Privacy Policy, and Talent
            Code of Conduct.
          </Text>
        </TouchableOpacity>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 6}>
        <ProfileSummaryTable />
      </SlideLeftFade>
    </View>
  );
};

export default Verify;

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
  inputStyle: { fontSize: 13, fontFamily: Fonts.Inter_Regular },
  inputContainer: {
    height: correctSize(45),
    backgroundColor: colors.lightBlue_5,
    marginBottom: correctSize(16),
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  terms: {
    flexDirection: 'row',
    gap: correctSize(12),
    marginBottom: correctSize(12),
  },
  check: {
    width: correctSize(20),
    height: correctSize(20),
    borderWidth: 1.4,
    borderColor: colors.gray_5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: colors.darkgray_1,
    borderColor: colors.darkgray_1,
  },
  termText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    lineHeight: correctSize(20),
    flex: 1,
  },
});
