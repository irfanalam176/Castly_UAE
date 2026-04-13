import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { correctSize } from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../utils/colors';
import ShieldIcon from '../../../assets/svg/applications/ShieldIcon';
import { Fonts } from '../../../assets/fonts';
import KycInfoCard from '../../../components/kyc/KycInfoCard';
import ClockFill from '../../../assets/svg/applications/ClockFill';
import LockIcon from '../../../assets/svg/applications/LockIcon';
import KycSectionHeader from '../../../components/kyc/KycSectionHeader';
import KycVerificationCard from '../../../components/kyc/KycVerificationCard';
import FrontIdCard from '../../../assets/svg/kyc/FrontIdCard';
import BackIdIcon from '../../../assets/svg/kyc/BackIdIcon';
import CameraIcon from '../../../assets/svg/applications/CameraIcon';
import KycRequirementCard from '../../../components/kyc/KycRequirementCard';
import { kycGuidelineList, kycRequirementList } from '../../../utils/array';
import TimeLine from '../../../components/kyc/TimeLine';
import CustomButton from '../../../components/common/CustomButton';
import { useDispatch } from 'react-redux';
import { setCompleteVerification } from '../../../redux/reducers/userSlice';
import { AnimatedWrapper } from '../../../components/Animation';
import { useProfile } from '../../../hooks/useProfile';
import { ROUTES } from '../../../services/routes';
import { ImageSourcePropType } from 'react-native';
import { Source } from 'react-native-fast-image';
import { stackRoutes } from '../../../navigation/screenIds';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../navigation/navigationTypes';
import Toast from 'react-native-toast-message';

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Safely converts an S3 key string to ImageSourcePropType, or returns undefined */
const toImageSource = (key?: string): ImageSourcePropType | undefined =>
  key ? { uri: `${ROUTES.MEDIA_URL}${key}` } : undefined;

// ─── Component ────────────────────────────────────────────────────────────────

const VerificationKyc = () => {
  const navigation = useNavigation<NavProp>()
  const { profile, isLoading, isError } = useProfile();

  const media: any[] = (profile?.media ?? profile?.portfolioImages ?? []) as any[];

  const dispatch = useDispatch();

  // ── Find KYC media items by type ─────────────────────────────────────────
  const frontIdMedia = media.find((m) => m.type === 'KYC_FRONT_ID');
  const backIdMedia  = media.find((m) => m.type === 'KYC_BACK_ID');
  const selfieMedia  = media.find((m) => m.type === 'KYC_SELFIE');

  // Typed as ImageSourcePropType | undefined — directly usable as the image prop
  const frontIdSource = toImageSource(frontIdMedia?.url);
  const backIdSource  = toImageSource(backIdMedia?.url);
  const selfieSource  = toImageSource(selfieMedia?.url);

  // Derive readable file names from the last segment of the S3 key
  const frontIdName = frontIdMedia?.url?.split('-').slice(-1)[0] ?? 'ID_Front.jpg';
  const backIdName  = backIdMedia?.url?.split('-').slice(-1)[0]  ?? 'ID_Back.jpg';
  const selfieName  = selfieMedia?.url?.split('-').slice(-1)[0]  ?? 'Selfie.jpg';

  function handleApproval() {
    dispatch(setCompleteVerification(true));
     navigation.reset({
    index: 0,
    routes: [{ name: stackRoutes.TabNavigator }],
  });
  }

  useEffect(()=>{
     if(isError){
    Toast.show({
      type:"error",
      text1:"Something went wrong"
    })
  }
  },[isError])

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[colors.lightBlue_2, colors.white]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.body}>
          <AnimatedWrapper>
            <View style={styles.container}>

              {/* ── Header ── */}
              <View style={styles.iconContainer}>
                <ShieldIcon width={24} height={24} color={colors.white} />
              </View>
              <Text style={styles.mainHeading}>Verify Your Identity</Text>
              <Text style={styles.mainText}>
                We need to verify your identity to ensure a safe and trusted
                platform for everyone. This is a one-time process.
              </Text>

              {/* ── Status Banner ── */}
              <KycInfoCard
                icon={<ClockFill width={20} height={20} color={colors.white} />}
                title="KYC In Review"
                description={`Your documents are being reviewed by our team. This usually takes 24-48 hours. We'll notify you once approved.`}
                tag="pending"
                iconContainerStyle={{ backgroundColor: colors.orange_3 }}
                titleStyle={{ fontSize: 18 }}
                descriptionStyle={{ color: colors.darkgray }}
                style={{
                  backgroundColor: colors.lightYellow,
                  borderColor: colors.yellow,
                }}
              />

              {/* ── Emirates ID Section ── */}
              <KycSectionHeader title="Emirates ID" />

              <KycVerificationCard
                icon={<FrontIdCard />}
                title="Front Side"
                name={frontIdName}
                image={frontIdSource as Source}
              />

              <KycVerificationCard
                icon={<BackIdIcon />}
                title="Back Side"
                name={backIdName}
                 image={backIdSource as Source}
              />

              <KycRequirementCard
                items={kycRequirementList}
                title="Requirements:"
                titleColor={colors.blue_2}
                labelColor={colors.blue_8}
                checkIconColor={colors.blue_2}
                infoIconColor={colors.gray_1}
                style={{
                  backgroundColor: colors.lightBlue_7,
                  borderColor: colors.lightBlue_6,
                }}
              />

              {/* ── Selfie Section ── */}
              <KycSectionHeader title="Selfie Verification" />

              <KycVerificationCard
                icon={<CameraIcon width={18} height={15.8} color={colors.gray_1} />}
                iconContainerStyle={{ backgroundColor: colors.purple_2 }}
                title="Live Selfie"
                name={selfieName}
                image={selfieSource as Source}
              />

              <KycRequirementCard
                items={kycGuidelineList}
                title="Selfie Guidelines:"
                titleColor={colors.purple_3}
                labelColor={colors.purple_4}
                checkIconColor={colors.purple_5}
                infoIconColor={colors.purple_5}
                style={{
                  backgroundColor: colors.lightBlue_4,
                  borderColor: colors.lightBlue_11,
                }}
              />

              {/* ── Timeline ── */}
              <Text style={styles.heading}>Verification Timeline</Text>
              <TimeLine />

              {/* ── Security Banner ── */}
              <KycInfoCard
                gradient
                icon={<LockIcon width={17.5} height={20} color={colors.white} />}
                title="Your Data is Secure"
                description={`All documents are encrypted and stored securely. We never share your information with third parties without your consent.`}
                iconContainerStyle={{ backgroundColor: colors.gray_1 }}
                titleStyle={{ fontSize: 16 }}
                descriptionStyle={{ color: colors.gray_1 }}
                style={{ borderColor: colors.lightBlue_3 }}
              />
            </View>

            {/* ── Footer ── */}
            <View style={styles.footer}>
              <CustomButton title="Waiting for Approval" onPress={handleApproval} />
              <Text style={styles.helpText}>Need help?</Text>
              <Text style={styles.contactBtn}>Contact Support</Text>
            </View>
          </AnimatedWrapper>
        </ScrollView>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default VerificationKyc;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  body: {
    paddingVertical: correctSize(32),
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: correctSize(24),
  },
  iconContainer: {
    width: correctSize(64),
    height: correctSize(64),
    borderRadius: 16,
    backgroundColor: colors.gray_1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: correctSize(24),
  },
  mainHeading: {
    fontSize: 30,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  mainText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
    lineHeight: 26,
    marginBottom: correctSize(32),
  },
  heading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(16),
  },
  helpText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    textAlign: 'center',
    marginVertical: correctSize(12),
  },
  contactBtn: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.orange_3,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    padding: correctSize(24),
    paddingTop: correctSize(21),
  },
});