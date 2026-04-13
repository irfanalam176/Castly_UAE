import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { stackRoutes } from '../../navigation/screenIds';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LogoHeader from '../../components/common/LogoHeader';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import InfoBanner from '../../components/common/InfoBanner';
import CustomButton from '../../components/common/CustomButton';
import { btmContainer } from '../../utils/layout';
import Badge from '../../components/common/Badge';
import Icons from '../../components/vectorIcons/Icons';
import { skills } from '../../utils/array';
// import { fetchUserProfile } from '../../redux/reducers/userSlice'
import { useCreateBundleSkillsMutation } from '../../services/profileAPI';
import { useProfile } from '../../hooks/useProfile';
import Toast from 'react-native-toast-message';
import { correctSize } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavProp } from '../../navigation/navigationTypes';

export default function SkillsScreen() {
  const navigation = useNavigation<NavProp>()
  const route = useRoute<any>()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [createBundleSkills, { isLoading }] = useCreateBundleSkillsMutation();
  const { profile, fetchProfile, isError } = useProfile();
  const isEdit = route?.params?.status === 'EDIT';
  useEffect(() => {
    const profileSkills = profile?.skills ?? [];
    if (profileSkills.length > 0) {
      const existingSkillIds: string[] = [];

      skills.forEach(category => {
        category.subItem.forEach(sub => {
          if (profileSkills.some((s: any) => s.skill === sub.title)) {
            existingSkillIds.push(sub.id);
          }
        });
      });

      setSelectedSkills(existingSkillIds);
    }
  }, [profile]);
    useEffect(() => {
      if (isError) {
        Toast.show({
          type: 'error',
          text1: 'Failed to load profile',
        });
      }
    }, [isError]);

  // useEffect(() => {
  //     getUserData()
  // }, [])

  // const getUserData = async () => {
  //     if (userData?.skills?.length > 0) {
  //         const existingSkillIds: string[] = [];

  //         skills.forEach(category => {
  //             category.subItem.forEach(sub => {
  //                 if (userData.skills.some((s: any) => s.skill === sub.title)) {
  //                     existingSkillIds.push(sub.id);
  //                 }
  //             });
  //         });

  //         setSelectedSkills(existingSkillIds);
  //     }
  // };

  const handleSkillsSelection = (id: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      // if (prev?.length >= 3) {
      //     return prev
      // }
      return [...prev, id];
    });
  };

  const sendSelectedSkills = async () => {
    const selectedSkillObjects: any = [];

    skills.forEach(category => {
      category.subItem.forEach(sub => {
        if (selectedSkills.includes(sub.id)) {
          selectedSkillObjects.push({
            skill: sub.title,
            skillCategory: category.heading,
          });
        }
      });
    });

    const payload = {
      skills: selectedSkillObjects,
    };
    try {
      await createBundleSkills(payload).unwrap();
      fetchProfile();
      if (isEdit) {
        navigation.goBack();
      } else {
        navigation.navigate(stackRoutes.PersonalInfoScreen);
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Skills Bundle Creation Failed',
        text2: err?.data?.message || err?.error || err.message,
      });
    }
  };

  const clearSkills = () => {
    setSelectedSkills([]);
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.logoHeaderContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
            {isEdit ? (
                        <LogoHeader />
                      ) : (
                        <LogoHeader
                          onGoback={() =>
                            navigation.navigate(stackRoutes.UploadPhoto)
                          }
                        />
                      )}
          <Text style={styles.mainHeading}>What Are Your Skills?</Text>
          <Text style={styles.subHeading}>
            Select all the skills and talents you have. This helps brands find
            you for the right opportunities.
          </Text>
          <View style={styles.selectedSkillContainer}>
            <View style={styles.skillsWrapper}>
              <View style={styles.skillsIcon}>
                <Icons
                  family={'FontAwesome6'}
                  name={'check'}
                  color={colors.purple}
                  size={20}
                />
              </View>
              <View style={styles.skillsTextContainer}>
                <Text style={styles.skillsCountText}>
                  {selectedSkills?.length} Skills Selected
                </Text>
                <Text style={styles.skillsHelperText}>
                  Select at least 3 skills
                </Text>
              </View>
            </View>
            {selectedSkills?.length > 0 && (
              <TouchableOpacity onPress={() => clearSkills()}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          {skills.map(item => (
            <View style={styles.guideLines} key={item.id}>
              <View style={styles.headingContainer}>
                <View style={styles.headerIconWrapper}>{item.icon}</View>
                <Text style={styles.categoryHeading}>{item.heading}</Text>
              </View>
              <View style={styles.subItemRow}>
                {item.subItem.map(sub => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.subItem,
                        selectedSkills.includes(sub.id) &&
                          styles.selectedSubItem,
                      ]}
                      key={sub.id}
                      onPress={() => handleSkillsSelection(sub.id)}
                    >
                      {sub.icon && <View>{sub.icon}</View>}
                      <Text style={styles.subItemText}>{sub?.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
        <View style={btmContainer.bottomContainer}>
          <CustomButton
            title="Continue"
            onPress={sendSelectedSkills}
            loading={isLoading}
            disabled={selectedSkills?.length < 3}
          />

          <Text style={styles.bottomHelperText}>
            Select at least 3 skills to continue
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(24),
  },
  logoHeaderContainer: {
    marginTop: correctSize(20),
  },
  mainHeading: {
    fontSize: 30,
    color: colors.black,
    marginTop: correctSize(48),
    marginBottom: correctSize(4),
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: 40,
    textTransform: 'capitalize',
  },
  subHeading: {
    fontSize: 16,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(32),
  },
  selectedSkillContainer: {
    padding: correctSize(18),
    borderWidth: 1,
    borderColor: colors.lightBlue_3,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillsWrapper: {
    flexDirection: 'row',
  },
  skillsIcon: {
    height: 40,
    width: 40,
    backgroundColor: colors.lightBlue_3,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillsTextContainer: {
    marginStart: correctSize(12),
  },
  skillsCountText: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.InriaSerif_Bold,
  },
  skillsHelperText: {
    fontSize: 12,
    color: colors.gray_4,
    fontFamily: Fonts.Inter_Regular,
  },
  clearAllText: {
    fontSize: 14,
    color: colors.red_1,
    fontFamily: Fonts.Inter_SemiBold,
    alignSelf: 'center',
  },
  guideLines: {
    marginTop: correctSize(12),
  },
  headingContainer: {
    flexDirection: 'row',
    marginBottom: correctSize(16),
    alignItems: 'center',
  },
  headerIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray_3rgb,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  categoryHeading: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray,
    marginLeft: correctSize(12),
    alignSelf: 'center',
  },
  subItemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: correctSize(12),
    marginBottom: correctSize(32),
  },
  subItem: {
    paddingHorizontal: correctSize(22),
    paddingVertical: correctSize(18),
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSubItem: {
    backgroundColor: colors.primary,
  },
  subItemText: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
    marginLeft: correctSize(12),
  },
  bottomContainer: {
    backgroundColor: colors.lightBlue_1,
  },
  bottomHelperText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginLeft: correctSize(12),
    alignSelf: 'center',
    marginTop: correctSize(12),
  },
});
