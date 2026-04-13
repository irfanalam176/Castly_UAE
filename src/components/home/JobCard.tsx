import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from 'react-native';
import { MotiView } from 'moti';
import Icons from '../vectorIcons/Icons';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { AnimatedWrapper } from '../Animation';
import CustomButton from '../common/CustomButton';
import { font } from '../../utils/font';
import { correctSize } from '../../utils';
import { formatDateRange } from '../../utils/formatDateRange';
import FastImage from 'react-native-fast-image';
import { images } from '../../assets/images';
import LocationPin from '../../assets/svg/Home/LocationPin';
import CalendarIcon from '../../assets/svg/Home/CalendarIcon';
import UserIcon from '../../assets/svg/Home/UserIcon';
import ClockFill from '../../assets/svg/applications/ClockFill';
import ClockIcon from '../../assets/svg/Home/ClockIcon';
import ShieldIcon from '../../assets/svg/Home/ShieldIcon';
import { getDaysLeft } from '../../utils/getDaysLeft';
import { ROUTES } from '../../services/routes';
import { imageUrlFormate } from '../../utils/imageUrlFormate';

interface JobCardProps {
  item: any;
  index?: number;
  onPress: () => void;
  onApply: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

const JobCard = ({
  item,
  index,
  onPress,
  onApply,
  onShare,
  onBookmark,
}: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  // Calculate per day rate (handle string fees with commas)
  const calculatePerDay = () => {
    if (!item.fee || !item.days) return '0';

    // Remove commas and convert to number
    const feeNum = parseFloat(String(item.fee).replace(/,/g, ''));
    const daysNum = Number(item.days);

    if (isNaN(feeNum) || isNaN(daysNum) || daysNum === 0) return '0';

    return (feeNum / daysNum).toFixed(0);
  };

  const perDay = calculatePerDay();

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <View style={styles.listContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
      // <JobCard
      //   item={item}
      //   index={index}
      //   onBookmark={() => console.log('Bookmark', item.id)}
      //   onPress={() => handleApplyJob(item)}
      //   onShare={() => console.log('Share', item.id)}
      // />
    ),
    [],
  );

  return (
    <AnimatedWrapper style={styles.container}>
      {/* <TouchableOpacity activeOpacity={0.9} onPress={onPress}> */}
      {/* Header: Logo, Title, Bookmark */}
      <TouchableOpacity
        onPress={onApply}
        activeOpacity={0.5}
        disabled={item?.applicationId ? true : false}
      >
        <View style={styles.jobImageContainer}>
          <FastImage
            source={{ uri: imageUrlFormate(item?.coverImageUrl) }}
            style={styles.jobImage}
          />
          <View style={styles.overlay} />
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.content}>
              <View style={styles.tagsContainer}>
                {/* Tags Row */}
                <View style={styles.tagsRow}>
                  {/* {item.matchScore && ( */}
                  <View
                    style={[styles.tag, { backgroundColor: colors.black_rgb }]}
                  >
                    <Text style={styles.matchScoreText}>
                      {item.matchPct || '0'}% Match
                    </Text>
                  </View>
                  {/* )} */}
                  {item.status == 'ACTIVE' && (
                    <View
                      style={[
                        styles.tag,
                        { backgroundColor: colors.green_5_rgb },
                      ]}
                    >
                      <Icons
                        family="MaterialIcons"
                        name="verified"
                        size={14}
                        color={colors.green}
                      />
                      <Text style={styles.verifiedText}> Verified</Text>
                    </View>
                  )}
                  {item.urgent && (
                    <View
                      style={[
                        styles.tag,
                        {
                          backgroundColor:
                            item.tag === 'Premium'
                              ? colors.lightBlue_9
                              : colors.light_orange,
                        },
                      ]}
                    >
                      <Icons
                        family={'FontAwesome6'}
                        name={'fire'}
                        size={14}
                        color={
                          item.tag === 'Premium' ? colors.blue_6 : colors.red_2
                        }
                      />
                      <Text style={styles.urgentTagText}> Urgent</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    onBookmark && onBookmark();
                    setIsBookmarked(!isBookmarked);
                  }}
                  style={[
                    styles.bookmarkButton,
                    {
                      backgroundColor: isBookmarked
                        ? colors.lightBlue_2
                        : colors.black_rgb1,
                    },
                  ]}
                >
                  <Icons
                    family="Ionicons"
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={14}
                    color={isBookmarked ? colors.gray_1 : colors.white}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <View
                  style={[
                    styles.logoContainer,
                    { backgroundColor: item.logoColor || colors.white_rgb2 },
                  ]}
                >
                  {item.logo ? (
                    <FastImage
                      source={{ uri: item.logo }}
                      style={styles.logo}
                    />
                  ) : (
                    <Text style={styles.logoInitial}>
                      {item?.brand?.brandName[0] || '...'}
                    </Text>
                  )}
                </View>

                <View style={styles.titleContainer}>
                  <Text style={styles.companyName}>
                    {item?.brand?.brandName || '...'}
                  </Text>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  {/* <View style={styles.ratingRow}>
                  <Icons
                    family="FontAwesome"
                    name="star"
                    size={12}
                    color={colors.yellow}
                  />
                  <Text style={styles.ratingText}> {item.rating || 5}</Text>
                  <Text style={styles.reviewsText}>
                    {' '}
                    ({item.reviews || 0} reviews)
                  </Text>
                </View> */}
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.jobContentContainer}>
          {/* Info Rows */}
          <View style={styles.infoContainer}>
            <View style={styles.locationRow}>
              <View style={styles.infoRow}>
                <LocationPin />
                {/* <Icons
                family="Ionicons"
                name="location-sharp"
                size={16}
                color={colors.gray_1}
              /> */}
                <Text style={styles.infoText}>{item.location || 'N/A'}</Text>
              </View>
              <View style={[styles.infoRow, { marginLeft: correctSize(16) }]}>
                {/* <Icons
                family="MaterialCommunityIcons"
                name="calendar-month"
                size={16}
                color={colors.gray_1}
              /> */}
                <CalendarIcon />
                <Text style={styles.infoText}>
                  {formatDateRange(item.startDate, item.endDate)}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              {/* <Icons
              family="FontAwesome6"
              name="coins"
              size={14}
              color={colors.gray_1}
            /> */}
              <UserIcon />
              <Text style={styles.infoText}>
                {`${item.spotsAvailable} spots left`}
              </Text>
            </View>
          </View>

          {/* Job Type */}
          <View></View>

          {/* Fee's and Time left to apply */}
          <View style={styles.feeAndTimeLeft}>
            <View>
              <Text style={styles.fee}>{`AED ${item.totalBudget}`}</Text>
              <Text style={styles.perDayText}>
                {item?.rateType == 'HOURLY'
                  ? item?.hourlyRate
                  : item?.dailyRate}{' '}
                / {item?.rateType == 'HOURLY' ? 'hour' : 'day'}
                {' . '}
                {item?.shootDays}d
              </Text>
            </View>
            <View>
              <View style={styles.direction}>
                <ClockIcon />
                <Text style={styles.daysLeftText}>
                  {getDaysLeft(item?.deadline) > 0
                    ? `${getDaysLeft(item?.deadline)} days left to apply`
                    : 'Job Expired'}
                </Text>
              </View>
              <View style={styles.direction}>
                <ShieldIcon />
                <Text style={styles.escrowText}>Escrow Protected</Text>
              </View>
            </View>
          </View>

          {/* Facilities provided to user */}
          <View style={styles.jobFacilities}>
            <FlatList
              data={item.facilities}
              // keyExtractor={item.facilities.index}
              renderItem={renderItem}
              horizontal
            />
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <View style={styles.applyButton}>
              <CustomButton
                title={item?.applicationId ? 'Applied' : 'Apply Now'}
                onPress={onPress}
                style={styles.button}
                textStyle={styles.buttonText}
                disabled={item?.applicationId ? true : false}
              />
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Icons
                family="Ionicons"
                name="share-social"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {/* </TouchableOpacity> */}
    </AnimatedWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 26,
    // padding: correctSize(16),
    marginBottom: correctSize(16),
    borderColor: colors.gray_2,
    shadowColor: colors.darkBrown,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  jobImageContainer: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  content: {
    flex: 1,
    padding: correctSize(12),
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobContentContainer: {
    padding: correctSize(16),
  },
  header: {
    flexDirection: 'row',
  },
  jobImage: {
    // ...StyleSheet.absoluteFill,
    height: 160,
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    // borderWidth: 2,
    // borderColor: colors.primary, // Or a light ring color
  },
  locationRow: {
    flexDirection: 'row',
  },
  logoContainer: {
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white_rgb4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: correctSize(12),
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  logoInitial: {
    ...font(10, 400),
    color: colors.white,
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 16,
    color: colors.white,
  },
  companyName: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.white_rgb5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: correctSize(4),
  },
  ratingText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 12,
    color: colors.black,
  },
  reviewsText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_3,
  },
  bookmarkButton: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 50,
    // padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: correctSize(8),
    paddingVertical: correctSize(4),
    borderRadius: 8,
  },
  matchScoreText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 10,
    color: colors.primary,
  },
  verifiedText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 10,
    color: colors.white,
  },
  premiumTagText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: '#0284C7',
  },
  urgentTagText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: '#C2410C',
  },
  infoContainer: {
    gap: correctSize(12),
    marginBottom: correctSize(12),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.darkgray,
    marginStart: correctSize(6),
  },
  priceText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 16,
    color: colors.black,
    marginStart: correctSize(6),
  },
  priceUnitText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.gray_1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applyButton: {
    flex: 1,
  },
  shareButton: {
    width: correctSize(44),
    height: correctSize(44),
    borderRadius: 12,
    backgroundColor: colors.gray_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: correctSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 16, // optional padding
    marginRight: correctSize(8),
  },
  buttonText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 16,
    textTransform: 'none', // keeps the text as-is
    color: colors.black,
    textAlign: 'center',
  },
  fee: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 22,
    color: colors.darkgray_1,
  },
  perDayText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 11,
    color: colors.gray_3,
  },
  feeAndTimeLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daysLeftText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 11,
    color: colors.red,
    marginLeft: correctSize(4),
  },
  escrowText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 10,
    color: colors.green_5,
    marginLeft: correctSize(4),
  },
  direction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    backgroundColor: colors.green_1,
    paddingHorizontal: correctSize(8),
    paddingVertical: correctSize(2),
    marginRight: correctSize(6),
  },
  itemText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 10,
    color: colors.green_5,
  },
  jobFacilities: {
    marginVertical: correctSize(12),
  },
});

export default JobCard;
