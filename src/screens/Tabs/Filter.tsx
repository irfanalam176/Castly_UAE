import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import FilterHeader from '../../components/filter/FilterHeader';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import FilterBadge from '../../components/common/FilterBadge';
import PinIcon from '../../assets/svg/applications/PinIcon';
import CalendarIcon from '../../components/vectorIcons/CalendarIcon';
import StarIcon from '../../assets/svg/applications/StarIcon';
import JobStatusCard from '../../components/filter/JobStatusCard';
import CheckCircleIcon from '../../assets/svg/applications/CheckCircleIcon';
import ClockFill from '../../assets/svg/applications/ClockFill';
import CrownIcon from '../../assets/svg/filter/CrownIcon';
import RangeSelector from '../../components/filter/RangeSelector';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/common/CustomButton';
import { NavProp } from '../../navigation/navigationTypes';

const jobTypeList = [
  { id: 1, label: 'All Jobs' },
  { id: 2, label: 'Fashion Model' },
  { id: 3, label: 'Event Host' },
  { id: 4, label: 'Brand Ambassador' },
  { id: 5, label: 'Product Model' },
];

const locationList = [
  { id: 1, label: 'Dubai' },
  { id: 2, label: 'Abu Dhabi' },
  { id: 3, label: 'Sharjah' },
  { id: 4, label: 'Chicago' },
  { id: 5, label: 'All Emirates' },
];

const minimumRatingList = [
  { id: 1, label: '4.0+' },
  { id: 2, label: '4.5+' },
  { id: 3, label: '5.0+' },
];

const matchScoreList = [
  { id: 1, label: '85%+' },
  { id: 2, label: '90%+' },
  { id: 3, label: '95%+' },
  { id: 4, label: '98%+' },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

const Filter = () => {
  const navigation = useNavigation<NavProp>();

  // ── Badge selections (multi-select) ──────────────────────────────────────
  const [selectedJobTypes, setSelectedJobTypes] = useState<number[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedMatchScores, setSelectedMatchScores] = useState<number[]>([]);

  const toggle = (
    id: number,
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  // ── Date picker ───────────────────────────────────────────────────────────
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  // ── Job status checkboxes ─────────────────────────────────────────────────
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [urgentJobs, setUrgentJobs] = useState<boolean>(false);
  const [premiumBrands, setPremiumBrands] = useState<boolean>(false);

  // ── Pay range ─────────────────────────────────────────────────────────────
  // RangeSelector manages its own state internally;
  // lift it here if you need the values for an API call.
  const [payRange, setPayRange] = useState<{ min: number; max: number }>({
    min: 1500,
    max: 5000,
  });

  const handleRangeChange = useCallback((min: number, max: number) => {
    setPayRange({ min, max });
  }, []);

  const handleApply = () => {
    const filters = {
  jobTypes: selectedJobTypes,
  locations: selectedLocations,
  fromDate: fromDate.toISOString(),
  toDate: toDate.toISOString(),
  payRange,
  ratings: selectedRatings,
  verifiedOnly,
  urgentJobs,
  premiumBrands,
  matchScores: selectedMatchScores,
};
    console.log('Applied filters:', filters);
    navigation.goBack();
  };

  const handleReset = () => {
    setSelectedJobTypes([]);
    setSelectedLocations([]);
    setSelectedRatings([]);
    setSelectedMatchScores([]);
    setFromDate(new Date());
    setToDate(new Date());
    setVerifiedOnly(false);
    setUrgentJobs(false);
    setPremiumBrands(false);
    setPayRange({ min: 1500, max: 5000 });
  };

  return (
    <ScreenWrapper>
      <FilterHeader
        onBackPress={() => navigation.goBack()}
        onResetPress={handleReset}
      />

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.content}>
          {/* ── Job Type ─────────────────────────────────────────────────── */}
          <Text style={styles.heading}>Job Type</Text>
          <View style={styles.badgeContainer}>
            {jobTypeList.map(item => {
              const isSelected = selectedJobTypes.includes(item.id);
              return (
                <FilterBadge
                  key={item.id}
                  item={item}
                  onPress={() =>
                    toggle(item.id, selectedJobTypes, setSelectedJobTypes)
                  }
                  lableSize={14}
                  lableColor={isSelected ? colors.black : colors.gray_1}
                  fontFamily={Fonts.Inter_Medium}
                  bgColor={isSelected ? colors.primary : colors.white_1}
                />
              );
            })}
          </View>

          {/* ── Location ─────────────────────────────────────────────────── */}
          <Text style={styles.heading}>Location</Text>
          <View style={styles.badgeContainer}>
            {locationList.map(item => {
              const isSelected = selectedLocations.includes(item.id);
              return (
                <FilterBadge
                  key={item.id}
                  item={item}
                  onPress={() =>
                    toggle(item.id, selectedLocations, setSelectedLocations)
                  }
                  lableSize={14}
                  lableColor={isSelected ? colors.black : colors.gray_1}
                  fontFamily={Fonts.Inter_Medium}
                  bgColor={isSelected ? colors.primary : colors.white_1}
                  icon={
                    <PinIcon color={isSelected ? colors.black : undefined} />
                  }
                />
              );
            })}
          </View>

          {/* ── Date Range ───────────────────────────────────────────────── */}
          <Text style={styles.heading}>Date Range</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.datePicker}
            onPress={() => setOpenFrom(true)}
          >
            <Text style={styles.dateLabel}>From Date</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateValue}>{formatDate(fromDate)}</Text>
              <CalendarIcon color={colors.gray_4} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.datePicker, styles.datePicker2]}
            onPress={() => setOpenTo(true)}
          >
            <Text style={styles.dateLabel}>To Date</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateValue}>{formatDate(toDate)}</Text>
              <CalendarIcon color={colors.gray_4} />
            </View>
          </TouchableOpacity>

          {/* From date picker modal */}
          <DatePicker
            modal
            open={openFrom}
            date={fromDate}
            mode="date"
            maximumDate={toDate}
            onConfirm={date => {
              setOpenFrom(false);
              setFromDate(date);
            }}
            onCancel={() => setOpenFrom(false)}
          />

          {/* To date picker modal */}
          <DatePicker
            modal
            open={openTo}
            date={toDate}
            mode="date"
            minimumDate={fromDate}
            onConfirm={date => {
              setOpenTo(false);
              setToDate(date);
            }}
            onCancel={() => setOpenTo(false)}
          />

          {/* ── Pay Range ────────────────────────────────────────────────── */}
          <Text style={styles.heading}>Pay Range (AED/day)</Text>
          <RangeSelector onRangeChange={handleRangeChange} />

          {/* ── Minimum Rating ───────────────────────────────────────────── */}
          <Text style={styles.heading}>Minimum Rating</Text>
          <View style={styles.badgeContainer}>
            {minimumRatingList.map(item => {
              const isSelected = selectedRatings.includes(item.id);
              return (
                <FilterBadge
                  key={item.id}
                  item={item}
                  onPress={() =>
                    toggle(item.id, selectedRatings, setSelectedRatings)
                  }
                  lableSize={14}
                  lableColor={isSelected ? colors.black : colors.gray_1}
                  fontFamily={Fonts.Inter_Medium}
                  bgColor={isSelected ? colors.primary : colors.white_1}
                  icon={
                    <StarIcon
                      color={isSelected ? colors.black : colors.orange_3}
                    />
                  }
                />
              );
            })}
          </View>

          {/* ── Job Status ───────────────────────────────────────────────── */}
          <Text style={styles.heading}>Job Status</Text>

          <JobStatusCard
            label="Verified Only"
            icon={<CheckCircleIcon color={colors.green} />}
            checked={verifiedOnly}
            onPress={() => setVerifiedOnly(prev => !prev)}
          />
          <JobStatusCard
            label="Urgent Jobs"
            icon={<ClockFill width={12} height={12} color={colors.orange_2} />}
            checked={urgentJobs}
            onPress={() => setUrgentJobs(prev => !prev)}
          />
          <JobStatusCard
            label="Premium Brands"
            icon={<CrownIcon />}
            checked={premiumBrands}
            onPress={() => setPremiumBrands(prev => !prev)}
            style={styles.lastCheckBox}
          />

          {/* ── Match Score ──────────────────────────────────────────────── */}
          <Text style={styles.heading}>Match Score</Text>
          <View style={[styles.badgeContainer, styles.lastSection]}>
            {matchScoreList.map(item => {
              const isSelected = selectedMatchScores.includes(item.id);
              return (
                <FilterBadge
                  key={item.id}
                  item={item}
                  onPress={() =>
                    toggle(item.id, selectedMatchScores, setSelectedMatchScores)
                  }
                  lableSize={14}
                  lableColor={isSelected ? colors.black : colors.gray_1}
                  fontFamily={Fonts.Inter_Medium}
                  bgColor={isSelected ? colors.primary : colors.white_1}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.footer}>
          <CustomButton
            title="Clear All"
            style={[styles.button, styles.clearBtn]}
            onPress={handleReset}
          />
          <CustomButton
            title="Apply Filters"
            style={styles.button}
            onPress={handleApply}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Filter;

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
  heading: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginTop: correctSize(24),
    marginBottom: correctSize(16),
  },
  content: {
    paddingHorizontal: correctSize(24),
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: correctSize(8),
  },
  lastSection: {
    marginBottom: correctSize(32),
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
  },
  dateValue: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: correctSize(18),
    paddingHorizontal: correctSize(16),
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
    marginBottom: correctSize(12),
  },
  datePicker2: {
    marginBottom: 0,
  },
  lastCheckBox: {
    marginBottom: 0,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: correctSize(24),
    paddingVertical: correctSize(17),
    gap: correctSize(12),
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    height: correctSize(48),
  },
  clearBtn: {
    backgroundColor: colors.white_1,
  },
});
