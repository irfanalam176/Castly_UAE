import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import ChevronDownIcon from '../../../assets/svg/common/ChevronDownIcon';
import { Fonts } from '../../../assets/fonts';
import Badge from '../../common/Badge';
import PlusIcon from '../../../assets/svg/common/PlusIcon';
import CrossIcon from '../../vectorIcons/CrossIcon';

const ALL_SPECIALTIES = ['Editorial', 'Sportswear', 'Runway', 'Commercial', 'Fitness'];
const ALL_LANGUAGES = ['English', 'Urdu', 'French', 'Arabic', 'Spanish'];

type Props = {
  specialties: string[];
  setSpecialties: (v: string[]) => void;
  languages: string[];
  setLanguages: (v: string[]) => void;
};

const EditSpeciality = ({ specialties, setSpecialties, languages, setLanguages }: Props) => {
  const [isEditSpeciality, setIsEditSpeciality] = useState(false);
  const [isEditLang, setIsEditLang] = useState(false);

  const availableSpecialties = ALL_SPECIALTIES.filter(s => !specialties.includes(s));
  const availableLanguages = ALL_LANGUAGES.filter(l => !languages.includes(l));

  const rotateSpeciality = useSharedValue(0);
  const rotateLang = useSharedValue(0);

  const specialityAnim = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateSpeciality.value}deg` }],
  }));

  const langAnim = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateLang.value}deg` }],
  }));

  const toggleSpeciality = () => {
    setIsEditSpeciality(prev => !prev);
    rotateSpeciality.value = withTiming(isEditSpeciality ? 0 : 180, { duration: 200 });
  };

  const toggleLang = () => {
    setIsEditLang(prev => !prev);
    rotateLang.value = withTiming(isEditLang ? 0 : 180, { duration: 200 });
  };

  const addSpeciality = (item: string) => setSpecialties([...specialties, item]);
  const removeSpeciality = (item: string) => setSpecialties(specialties.filter(s => s !== item));

  const addLang = (item: string) => setLanguages([...languages, item]);
  const removeLang = (item: string) => setLanguages(languages.filter(l => l !== item));

  return (
    <View style={styles.container}>
      {/* SPECIALTIES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Specialties</Text>
          <TouchableOpacity onPress={toggleSpeciality} style={styles.editButton}>
            <Text style={styles.editButtonTextBlue}>
              {isEditSpeciality ? 'Done' : 'Edit'}
            </Text>
            <Animated.View style={specialityAnim}>
              <ChevronDownIcon />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.badgeRow}>
          {specialties.map(item => (
            <Badge
              key={item}
              title={item}
              containerStyle={styles.selectedSpecialityBadge}
              textStyle={styles.selectedSpecialityText}
              rightIcon={
                isEditSpeciality ? (
                  <TouchableOpacity onPress={() => removeSpeciality(item)}>
                    <CrossIcon width={9} height={9} fillColor={colors.blue_5} />
                  </TouchableOpacity>
                ) : null
              }
            />
          ))}
        </View>

        {isEditSpeciality && (
          <View style={styles.availableBadgeRow}>
            {availableSpecialties.map(item => (
              <TouchableOpacity key={item} onPress={() => addSpeciality(item)}>
                <Badge
                  title={item}
                  containerStyle={styles.availableBadge}
                  textStyle={styles.availableBadgeText}
                  leftIcon={<PlusIcon width={9} height={9} color={colors.gray_4} />}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* LANGUAGES */}
      <View style={styles.languageSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <TouchableOpacity onPress={toggleLang} style={styles.editButton}>
            <Text style={styles.editButtonTextGreen}>
              {isEditLang ? 'Done' : 'Edit'}
            </Text>
            <Animated.View style={langAnim}>
              <ChevronDownIcon color={colors.green_5} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.badgeRow}>
          {languages.map(item => (
            <Badge
              key={item}
              title={item}
              containerStyle={styles.selectedLangBadge}
              textStyle={styles.selectedLangText}
              rightIcon={
                isEditLang ? (
                  <TouchableOpacity onPress={() => removeLang(item)}>
                    <CrossIcon width={9} height={9} fillColor={colors.green_5} />
                  </TouchableOpacity>
                ) : null
              }
            />
          ))}
        </View>

        {isEditLang && (
          <View style={styles.availableBadgeRow}>
            {availableLanguages.map(item => (
              <TouchableOpacity key={item} onPress={() => addLang(item)}>
                <Badge
                  title={item}
                  containerStyle={styles.availableBadge}
                  textStyle={styles.availableBadgeText}
                  leftIcon={<PlusIcon width={9} height={9} color={colors.gray_4} />}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: 16,
    marginBottom: correctSize(24),
  },
  section: {
    padding: correctSize(16),
  },
  languageSection: {
    borderTopWidth: 0.7,
    borderTopColor: colors.white_1,
    padding: correctSize(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(10),
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  editButtonTextBlue: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.blue_5,
  },
  editButtonTextGreen: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.green_5,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  availableBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: correctSize(20),
  },
  selectedSpecialityBadge: {
    backgroundColor: colors.lightBlue_2,
  },
  selectedSpecialityText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.blue_5,
  },
  selectedLangBadge: {
    backgroundColor: colors.green_1,
  },
  selectedLangText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.green_5,
  },
  availableBadge: {
    backgroundColor: colors.white,
    borderWidth: 0.7,
    borderColor: colors.gray,
  },
  availableBadgeText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_4,
  },
});

export default EditSpeciality;