import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import CrossIcon from '../../vectorIcons/CrossIcon';
import CustomButton from '../../common/CustomButton';
import AddSocialMediaCard from './AddSocialMediaCard';
import InstagramIcon from '../../../assets/svg/socialIcons/InstagramIcon';
import TikTokIcon from '../../../assets/svg/socialIcons/TikTokIcon';
import PinterestIcon from '../../../assets/svg/socialIcons/PinterestIcon';
import TwitterIcon from '../../../assets/svg/socialIcons/TwitterIcon';
import RedditIcon from '../../../assets/svg/socialIcons/RedditIcon';
import { SlideLeftFade } from '../../Animation';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import { useAddSocialMediaMutation } from '../../../services/profileAPI';
import Toast from 'react-native-toast-message';
import { useProfile } from '../../../hooks/useProfile';
import { validateSocialHandles } from '../../../utils/validateSocialHandles';

interface Props {
  actionSheetRef: React.RefObject<ActionSheetRef | null>;
}

type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'pinterest'
  | 'twitter'
  | 'reddit';

type SocialHandles = Partial<Record<SocialPlatform, string>>;

const ICON_SIZE = { width: 18, height: 18 };
const STAGGER = 150;

const PLATFORMS: {
  key: SocialPlatform;
  label: string;
  icon: (color: string) => React.ReactNode;
}[] = [
  {
    key: 'instagram',
    label: 'instagram',
    icon: c => <InstagramIcon {...ICON_SIZE} color={c} />,
  },
  {
    key: 'tiktok',
    label: 'tiktok',
    icon: c => <TikTokIcon {...ICON_SIZE} color={c} />,
  },
  {
    key: 'pinterest',
    label: 'pinterest',
    icon: c => <PinterestIcon {...ICON_SIZE} color={c} />,
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    icon: c => <TwitterIcon {...ICON_SIZE} color={c} />,
  },
  {
    key: 'reddit',
    label: 'reddit',
    icon: c => <RedditIcon {...ICON_SIZE} color={c} />,
  },
];

const AddAccountActionSheet = ({ actionSheetRef }: Props) => {
  const [handles, setHandles] = useState<SocialHandles>({});
  const [addSocialMedia, { isLoading }] = useAddSocialMediaMutation();
  const { fetchProfile } = useProfile();
  const handleChange = (platform: SocialPlatform, value: string) => {
    setHandles(prev => ({
      ...prev,
      [platform]: value,
    }));
  };

  // Only include platforms that have a non-empty value
  const hasAnyFilled = Object.values(handles).some(
    v => v && v.trim().length > 0,
  );

  const handleSave = async () => {
    if (!validateSocialHandles(handles)) return;
    // Build payload with only filled fields
    const payload: SocialHandles = Object.fromEntries(
      Object.entries(handles).filter(([, v]) => v && v.trim().length > 0),
    ) as SocialHandles;

    try {
      await addSocialMedia(payload).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Social media updated successfully.',
      });
      setHandles({});
      fetchProfile();
    } catch (error: any) {
      const errMsg =
        error?.data?.message ?? 'Something went wrong. Please try again.';
      Toast.show({ type: 'error', text1: 'Error', text2: errMsg });
    } finally {
      actionSheetRef.current?.hide();
    }
  };

  function handleClose(){
    actionSheetRef.current?.hide()
    setHandles({})
  }

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.actionSheet}
      keyboardHandlerEnabled={false}
      gestureEnabled={false}
    >
      <View style={styles.toastWrapper}>
        <Toast />
      </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Social Media</Text>
          <Text style={styles.smText}>
            Connect your accounts to boost visibility
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleClose}
        >
          <CrossIcon fillColor={colors.gray_4} />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
      >
        <View style={styles.body}>
          {PLATFORMS.map((platform, i) => (
            <SlideLeftFade key={platform.key} delay={STAGGER * (i + 1)}>
              <AddSocialMediaCard
                platform={platform.key}
                icon={platform.icon(colors.white)}
                handle={platform.label}
                value={handles[platform.key] ?? ''}
                onChangeText={v => handleChange(platform.key, v)}
              />
            </SlideLeftFade>
          ))}

          <SlideLeftFade delay={STAGGER * (PLATFORMS.length + 1)}>
            <View style={styles.infoBanner}>
              <View style={styles.titleRow}>
                <ShieldIcon width={14} height={14} />
                <Text style={styles.infoTitle}>Why connect social media?</Text>
              </View>
              <Text style={styles.points}>
                · Brands can verify your reach and audience
              </Text>
              <Text style={styles.points}>
                · Get matched to influencer-based campaigns
              </Text>
              <Text style={styles.points}>
                · Higher profile visibility in search
              </Text>
            </View>
          </SlideLeftFade>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <CustomButton
          style={[
            styles.saveBtn,
            styles.footerBtn,
            (!hasAnyFilled || isLoading) && styles.saveBtnDisabled,
          ]}
          textStyle={[styles.saveBtnText, styles.footerBtnText]}
          title="Save Changes"
          onPress={handleSave}
          loading={isLoading}
          disabled={!hasAnyFilled || isLoading}
        />
      </View>
    </ActionSheet>
  );
};

export default AddAccountActionSheet;

const styles = StyleSheet.create({
  actionSheet: { height: correctSize(700) },
  body: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(120),
    paddingTop: correctSize(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(18),
    borderBottomWidth: 1,
    borderBottomColor: colors.white_1,
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: colors.white_1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: correctSize(20),
    paddingTop: correctSize(12),
    paddingBottom: correctSize(60),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.white_1,
  },
  footerBtn: {
    paddingVertical: correctSize(16),
    borderRadius: 16,
  },
  saveBtnText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  footerBtnText: { fontSize: 15 },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(24),
  },
  smText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  saveBtn: {
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(7),
    backgroundColor: colors.darkgray_1,
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  infoBanner: {
    backgroundColor: colors.lightBlue_7,
    borderWidth: 1,
    borderColor: colors.lightBlue_6,
    borderRadius: 14,
    padding: correctSize(12.5),
    marginBottom: correctSize(20),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    marginBottom: correctSize(5),
  },
  infoTitle: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.blue_8,
  },
  points: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    lineHeight: correctSize(18),
  },
  toastWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
  },
});
