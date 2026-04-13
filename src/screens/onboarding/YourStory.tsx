import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import CustomInput from '../../components/common/CustomInput';
import FilterBadge from '../../components/common/FilterBadge';
import CheckIcon from '../../assets/svg/applications/CheckIcon';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import {
  setField,
  toggleSpeciality,
} from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../../utils/permissions';

const BIO_MAX_LENGTH = 300;
const STAGGER = 150;

const SPECIALTIES = [
  { id: '1', label: 'Editorial' },
  { id: '2', label: 'Sportswear' },
  { id: '3', label: 'Modest Fashion' },
  { id: '4', label: 'Luxury' },
  { id: '5', label: 'Street Style' },
  { id: '6', label: 'Swimwear' },
  { id: '7', label: 'Maternity' },
  { id: '8', label: 'Plus Size' },
  { id: '9', label: 'Bridal' },
  { id: '10', label: 'Beauty' },
  { id: '11', label: 'Kids' },
  { id: '12', label: 'Petite' },
];

const DUMMY_LOCATIONS = [
  'Dubai, UAE',
  'Abu Dhabi, UAE',
  'Sharjah, UAE',
  'New York, USA',
  'Los Angeles, USA',
  'London, UK',
  'Paris, France',
  'Milan, Italy',
  'Tokyo, Japan',
  'Sydney, Australia',
  'Toronto, Canada',
  'Singapore',
  'Mumbai, India',
  'Berlin, Germany',
  'Barcelona, Spain',
];

const YourStory = () => {
  const dispatch = useDispatch();
  const { location, bio, specialities } = useSelector(
    (state: RootState) => state.onboarding,
  );

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);

  // ✅ Remove local address state entirely — use Redux location directly
  useEffect(() => {
    if (!location) {
      fetchCurrentLocation();
    }
  }, []);

  const fetchCurrentLocation = async () => {
    const granted = await requestLocationPermission();
    if (!granted) return;

    setFetchingLocation(true);
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
            { headers: { 'User-Agent': 'CastlyApp/1.0' } },
          );
          const data = await response.json();
          const { city, town, village, state, country } = data.address || {};
          const cityName = city || town || village || state || '';
          const locationName = country ? `${cityName}, ${country}` : cityName;
          if (locationName) {
            dispatch(setField({ location: locationName }));
          }
        } catch {
          // Silently fail
        } finally {
          setFetchingLocation(false);
        }
      },
      () => setFetchingLocation(false),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };

  const filteredLocations = DUMMY_LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  const handleSelectLocation = (loc: string) => {
    dispatch(setField({ location: loc }));
    setLocationSearch('');
    setLocationModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Your story</Text>
        <Text style={styles.subHeading}>Tell brands who you are.</Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setLocationModalVisible(true)}
        >
          <View pointerEvents="none">
            <CustomInput
              label="Location *"
              placeholder={
                fetchingLocation ? 'Detecting location…' : 'Dubai, UAE'
              }
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={location}
              onChangeText={text => dispatch(setField({ location: text }))}
            />
          </View>
        </TouchableOpacity>
      </SlideLeftFade>

      {/* rest unchanged */}
      <SlideLeftFade delay={STAGGER * 3}>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Bio *</Text>
          <Text style={styles.count}>
            {bio.length}/{BIO_MAX_LENGTH}
          </Text>
        </View>
        <TextInput
          multiline
          style={styles.textArea}
          placeholder="Dubai-based fashion model with 3+ years experience…"
          placeholderTextColor={colors.gray_3}
          value={bio}
          onChangeText={text => {
            if (text.length <= BIO_MAX_LENGTH)
              dispatch(setField({ bio: text }));
          }}
          maxLength={BIO_MAX_LENGTH}
        />
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        <Text style={styles.inputLabel}>
          Specialties (select all that apply)
        </Text>
        <View style={styles.badgesContainer}>
          {SPECIALTIES.map(item => {
            const isSelected = specialities.includes(item.label);
            return (
              <FilterBadge
                key={item.id}
                item={{
                  label: item.label,
                  icon: isSelected ? (
                    <CheckIcon color={colors.primary} />
                  ) : undefined,
                }}
                labelStyle={[
                  styles.badgeLabel,
                  isSelected && styles.selectedBadgeLabel,
                ]}
                style={[styles.badgeStyle, isSelected && styles.selectedBadge]}
                onPress={() => dispatch(toggleSpeciality(item.label))}
              />
            );
          })}
        </View>
      </SlideLeftFade>

      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLocationModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
            onPress={() => {}}
          >
            <Text style={styles.modalTitle}>Select Location</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search location…"
              placeholderTextColor={colors.gray_3}
              value={locationSearch}
              onChangeText={setLocationSearch}
              autoFocus
            />
            <FlatList
              data={filteredLocations}
              keyExtractor={item => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => handleSelectLocation(item)}
                >
                  <Text style={styles.locationItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={
                // ✅ If no match in list, let them use whatever they typed
                locationSearch.length > 0 ? (
                  <TouchableOpacity
                    style={styles.locationItem}
                    onPress={() => handleSelectLocation(locationSearch)}
                  >
                    <Text
                      style={[
                        styles.locationItemText,
                        { color: colors.darkgray_1 },
                      ]}
                    >
                      Use "{locationSearch}"
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.noResults}>No locations found</Text>
                )
              }
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default YourStory;

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  textArea: {
    height: correctSize(104),
    backgroundColor: colors.lightBlue_5,
    marginBottom: correctSize(16),
    marginTop: correctSize(12),
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gray,
    lineHeight: 19.5,
    textAlignVertical: 'top',
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(12),
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: correctSize(10),
    gap: correctSize(8),
  },
  badgeLabel: {
    fontSize: 11,
    color: colors.darkgray,
    fontFamily: Fonts.Inter_Medium,
  },
  selectedBadgeLabel: { color: colors.primary },
  badgeStyle: { borderWidth: 1.4, borderColor: colors.gray },
  selectedBadge: {
    borderColor: colors.darkgray_1,
    backgroundColor: colors.darkgray_1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: correctSize(16),
    paddingTop: correctSize(20),
    paddingBottom: correctSize(32),
    height: '75%',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(14),
  },
  searchInput: {
    height: correctSize(44),
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: correctSize(14),
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
    marginBottom: correctSize(10),
  },
  locationItem: { paddingVertical: correctSize(13) },
  locationItemText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray_1,
  },
  separator: { height: 1, backgroundColor: colors.lightBlue_5 },
  noResults: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    textAlign: 'center',
    paddingVertical: correctSize(20),
  },
});
