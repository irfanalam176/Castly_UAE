import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Text,
} from 'react-native';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import Icons from '../vectorIcons/Icons';
import { images } from '../../assets/images';
import { correctSize, isIOS } from '../../utils';
import FastImage from 'react-native-fast-image';
import SliderHorizontalIcon from '../../assets/svg/Home/SliderHorizontalIcon';
import BriefCaseIcon from '../../assets/svg/Home/BriefCaseIcon';
import StarIcon from '../../assets/svg/Home/StarIcon';
import CheckIcon from '../../assets/svg/Home/CheckIcon';
import TrendingIcon from '../../assets/svg/Home/TrendingIcon';
import CrossIcon from '../vectorIcons/CrossIcon';

interface HomeHeaderProps {
  userName: string;
  userImage?: string | null;
  notificationCount?: number;
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  location?: string | null;
  states?: {
    totalApplied: number | string;
    totalShortlisted: number | string;
    totalBooked: number | string;
    totalLiveJobs: number | string;
    totalMatchingJobs: number | string;
  };
  children:React.ReactNode
}

const HomeHeader = ({
  userName,
  userImage,
  notificationCount = 0,
  location,
  onSearch,
  onFilterPress,
  onProfilePress,
  onNotificationPress,
  children,
  states,
}: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Top Bar: Logo & Actions */}
      <View style={styles.topBar}>
        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <Text style={styles.locationText}>{location ?? ''}</Text>
          <Text style={styles.greetingText}>Discover Jobs</Text>
          {/* <Text style={styles.subGreetingText}>{`${userName} brand shortlisted you`}</Text> */}
        </View>
        {/* <FastImage source={images.logo} style={styles.logo} resizeMode={FastImage.resizeMode.contain} /> */}

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Icons
              family="Ionicons"
              name="notifications-outline"
              size={24}
              color={colors.black}
            />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                {/* <View style={styles.badgeDot} /> */}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onProfilePress}
            activeOpacity={0.7}
            style={styles.profileButton}
          >
            {userImage ? (
              <FastImage
                source={{ uri: userImage }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[
                  styles.profileImage,
                  {
                    backgroundColor: colors.gray_2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <Icons
                  family="FontAwesome6"
                  name="user"
                  size={16}
                  color={colors.white}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
     {children}

      {/* Job Related Info */}
      <View style={styles.jobInfo}>
        <View style={styles.appliedContainer}>
          <BriefCaseIcon />
          <Text style={styles.jobInfoText}>
            {states?.totalApplied || 0} Applied
          </Text>
        </View>
        <View style={styles.appliedContainer}>
          <StarIcon />
          <Text style={styles.jobInfoText}>
            {states?.totalShortlisted || 0} Shortlisted
          </Text>
        </View>
        <View style={styles.appliedContainer}>
          <CheckIcon />
          <Text style={styles.jobInfoText}>
            {states?.totalBooked || 0} Booked
          </Text>
        </View>
        <View style={styles.appliedContainer}>
          <TrendingIcon />
          <Text style={styles.jobInfoText}>
            {states?.totalLiveJobs || 0} Live Jobs
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: isIOS ? correctSize(10) : correctSize(20),
    paddingBottom: correctSize(20),
    paddingHorizontal: correctSize(24),
    backgroundColor: colors.darkgray_1,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logo: {
    width: 120,
    height: 40,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightBlue_5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  profileButton: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary, // Or a light ring color
  },
  greetingContainer: {
    // marginBottom: correctSize(24),
  },
  locationText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 11,
    color: colors.gray_4,
    marginBottom: correctSize(2),
    textTransform: 'uppercase',
  },
  greetingText: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 26,
    color: colors.white,
    marginBottom: correctSize(4),
  },
  subGreetingText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white_rgb,
    borderWidth: 1,
    borderColor: colors.white_rgb1,
    borderRadius: 12,
    paddingHorizontal: correctSize(16),
    height: 56,
    marginVertical: correctSize(16),
  },
  searchIcon: {
    marginRight: correctSize(12),
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.gray_4,
    height: '100%',
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: correctSize(8),
  },
  jobInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.white_rgb,
    paddingVertical: correctSize(10),
  },
  appliedContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobInfoText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 11,
    color: colors.gray_3,
    marginLeft: correctSize(6),
  },
});

export default HomeHeader;
