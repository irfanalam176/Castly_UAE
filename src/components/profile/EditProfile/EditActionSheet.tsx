import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import BackIcon from '../../../assets/svg/Home/BackIcon';
import SaveIcon from '../../../assets/svg/common/SaveIcon';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import EditBanner from './EditBanner';
import EditProfileImage from './EditProfileImage';
import EditBasicInfo from './EditBasicInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import EditSpeciality from './EditSpeciality';
import EditMeasurments from './EditMeasurments';
import EditSocailMedia from './EditSocailMedia';
import CustomButton from '../../common/CustomButton';
import { SlideLeftFade } from '../../Animation';
import { useProfile } from '../../../hooks/useProfile';
import { useUpdateProfileMutation } from '../../../services/profileAPI';
import Toast from 'react-native-toast-message';

interface Props {
  actionSheetRef: React.RefObject<ActionSheetRef | null>;
}

const EditActionSheet = ({ actionSheetRef }: Props) => {
  const STAGGER = 150;
  const { profile } = useProfile();

  // Basic Info
  const [name, setName] = useState(profile?.name ?? '');
  const [handle, setHandle] = useState(profile?.handle ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [category, setCategory] = useState(profile?.category ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');

  // Measurements
  const [height, setHeight] = useState(String(profile?.height ?? ''));
  const [weight, setWeight] = useState(String(profile?.weight ?? ''));
  const [bust, setBust] = useState(String(profile?.bust ?? ''));
  const [waist, setWaist] = useState(String(profile?.waist ?? ''));
  const [hips, setHips] = useState(String(profile?.hips ?? ''));
  const [shoeSize, setShoeSize] = useState(String(profile?.shoeSize ?? ''));
  const [clothingSize, setClothingSize] = useState(profile?.clothingSize ?? '');
  const [experience, setExperience] = useState(
    String(profile?.experience ?? '0 Years'),
  );

  // Specialties & Languages
  const [specialties, setSpecialties] = useState<string[]>(
    profile?.specialties ?? [],
  );
  const [languages, setLanguages] = useState<string[]>(
    profile?.languages ?? [],
  );

  // Social
  const [instagramHandle, setInstagramHandle] = useState(
    profile?.instagramHandle ?? '',
  );
  const [tiktokHandle, setTiktokHandle] = useState(profile?.tiktokHandle ?? '');
  const [pinterestHandle, setPinterestHandle] = useState(
    profile?.pinterestHandle ?? '',
  );
  const [twitterHandle, setTwitterHandle] = useState(
    profile?.twitterHandle ?? '',
  );
  const [redditHandle, setRedditHandle] = useState(profile?.redditHandle ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const [updateProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation();

  const handleSave = async () => {
    const payload = {
      name,
      handle,
      bio,
      category,
      location,
      height: Number(height),
      weight: Number(weight),
      bust: Number(bust),
      waist: Number(waist),
      hips: Number(hips),
      shoeSize: Number(shoeSize),
      clothingSize,
      experience,
      specialties,
      languages,
      instagramHandle,
      tiktokHandle,
      pinterestHandle,
      twitterHandle,
      redditHandle,
      ...(avatarUrl !== null && { avatarUrl }),
      ...(coverUrl !== null && { coverUrl }),
    };

    try {
      const res = await updateProfile(payload).unwrap();

      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
      });
    } catch (err) {
      console.log('error', err);

      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
      });
    } finally {
      actionSheetRef.current?.hide();
    }
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled={false}
      containerStyle={styles.actionSheet}
      keyboardHandlerEnabled={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => actionSheetRef.current?.hide()}
          disabled={isLoading}
        >
          <BackIcon width={16} height={16} color={colors.darkgray_1} />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          style={[styles.saveBtn, isLoading && styles.disabled]}
          onPress={handleSave}
        >
          <SaveIcon />
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
      >
        <EditBanner
          onKeyChange={key => setCoverUrl(key)}
          image={profile?.coverUrl}
        />
        <View style={styles.body}>
          <EditProfileImage
            image={profile?.avatarUrl}
            onKeyChange={key => setAvatarUrl(key)}
          />
          <SlideLeftFade delay={STAGGER * 1}>
            <EditBasicInfo
              name={name}
              setName={setName}
              handle={handle}
              setHandle={setHandle}
              bio={bio}
              setBio={setBio}
              category={category}
              setCategory={setCategory}
              location={location}
              setLocation={setLocation}
            />
          </SlideLeftFade>
          <SlideLeftFade delay={STAGGER * 2}>
            <EditSpeciality
              specialties={specialties}
              setSpecialties={setSpecialties}
              languages={languages}
              setLanguages={setLanguages}
            />
          </SlideLeftFade>
          <SlideLeftFade delay={STAGGER * 3}>
            <EditMeasurments
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              bust={bust}
              setBust={setBust}
              waist={waist}
              setWaist={setWaist}
              hips={hips}
              setHips={setHips}
              shoeSize={shoeSize}
              setShoeSize={setShoeSize}
              clothingSize={clothingSize}
              setClothingSize={setClothingSize}
              experience={experience}
              setExperience={setExperience}
            />
          </SlideLeftFade>
          <SlideLeftFade delay={STAGGER * 4}>
            <EditSocailMedia
              instagramHandle={instagramHandle}
              setInstagramHandle={setInstagramHandle}
              tiktokHandle={tiktokHandle}
              setTiktokHandle={setTiktokHandle}
              pinterestHandle={pinterestHandle}
              setPinterestHandle={setPinterestHandle}
              twitterHandle={twitterHandle}
              setTwitterHandle={setTwitterHandle}
              redditHandle={redditHandle}
              setRedditHandle={setRedditHandle}
            /> 
          </SlideLeftFade>
          <SlideLeftFade delay={STAGGER * 5}>
            <CustomButton
              style={[styles.saveBtn, styles.footerBtn]}
              textStyle={[styles.saveBtnText, styles.footerBtnText]}
              title="Save Changes"
              icon={<SaveIcon width={16} height={16} />}
              onPress={handleSave}
              loading={isLoading}
              disabled={isLoading}
            />
          </SlideLeftFade>
        </View>
      </KeyboardAwareScrollView>
    </ActionSheet>
  );
};

export default EditActionSheet;

const styles = StyleSheet.create({
  actionSheet: {
    height: correctSize(700),
  },
  body: {
    paddingHorizontal: correctSize(20),
    paddingBottom: correctSize(100),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(20),
    paddingVertical: correctSize(18),
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: colors.white_1,
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
  footerBtn: {
    paddingVertical: correctSize(16),
    borderRadius: 16,
  },
  saveBtnText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.primary,
  },
  footerBtnText: {
    fontSize: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  disabled: {
    opacity: 0.5,
  },
});
