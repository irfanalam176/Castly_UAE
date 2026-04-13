import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import BlueTick from '../../assets/svg/Profile/BlueTick';
import { Fonts } from '../../assets/fonts';
import StartIcon from '../../assets/svg/Profile/StartIcon';
import MapPin from '../../assets/svg/common/MapPin';
import InstagramIcon from '../../assets/svg/socialIcons/InstagramIcon';
import Badge from '../common/Badge';
import InfoSquareCard from './InfoSquareCard';
import CameraIcon from '../../assets/svg/common/CameraIcon';
import { ROUTES } from '../../services/routes';

interface UserInfoProps {
  name?: string;
  username?: string;
  role?: string | null;
  rating?: number;
  reviews?: number;
  location?: string | null;
  followers?: string | number;
  profileImage?: any;

  badges?: string[];

  jobsDone?: number;
  avgRating?: number;
  totalEarned?: string;
  onProfilePress?: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  username,
  role,
  rating = 4.5,
  reviews,
  location,
  followers,
  profileImage,
  badges,
  jobsDone,
  avgRating,
  totalEarned,
  onProfilePress,
}) => {
  return (
    <View>
      {/* Profile Image */}
      <TouchableOpacity
        style={styles.profileImageContainer}
        activeOpacity={0.7}
        onPress={onProfilePress}
      >
        <FastImage
          source={{ uri: `${ROUTES.MEDIA_URL}${profileImage}` }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.profileImage}
        />

        <View style={styles.camera}>
          <CameraIcon width={11} height={11} color={colors.darkgray_1} />
        </View>
      </TouchableOpacity>

      {/* Name */}
      <View style={styles.nameRow}>
        <Text style={styles.name}>{name}</Text>
        <BlueTick />
      </View>

      {/* Role */}
      <Text style={styles.talent}>
        {role} · {username}
      </Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <View style={styles.ratingStars}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <StartIcon
              key={i}
              color={i < Math.floor(rating) ? colors.primary : undefined}
            />
          ))}
        </View>
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.reviews}>({reviews} reviews)</Text>
      </View>

      {/* Location & Social */}
      <View style={styles.personalRow}>
        <View style={styles.socialRow}>
          <MapPin />
          <Text style={styles.socailText}>{location}</Text>
        </View>
        <View style={styles.socialRow}>
          <InstagramIcon />
          <Text style={styles.socailText}>{followers}</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgeRow}>
        {badges?.map((badge, index) => (
          <Badge
            key={index}
            title={badge}
            containerStyle={styles.badge}
            textStyle={styles.badgeText}
          />
        ))}
      </View>

      {/* Info Cards */}
      <View style={styles.infoRow}>
        <InfoSquareCard
          icon="🎬"
          value={String(jobsDone)}
          label="Jobs Done"
          bgColor={colors.lightBlue_2}
        />
        <InfoSquareCard
          icon="⭐"
          value={String(avgRating)}
          label="Avg Rating"
          bgColor={colors.yellow_4}
        />
        <InfoSquareCard
          icon="💰"
          value={totalEarned}
          label="Total Earned"
          bgColor={colors.green_1}
        />
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(5),
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(3.5),
  },
  rating: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray,
  },
  reviews: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  profileImageContainer: {
    width: correctSize(80),
    height: correctSize(80),
    borderRadius: 16,
    borderWidth: 3.4,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
    marginTop: correctSize(-40),
    marginBottom: correctSize(15.8),
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    flex: 1,
    borderRadius: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(5),
  },
  name: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.darkgray_1,
  },
  talent: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginBottom: correctSize(5),
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(4),
    marginBottom: correctSize(5),
  },
  socailText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  personalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(9),
  },
  badge: {
    backgroundColor: colors.white_1,
  },
  badgeText: {
    color: colors.darkgray,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: correctSize(6),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: correctSize(8),
    marginVertical: correctSize(16),
  },
  camera: {
    width: correctSize(24),
    height: correctSize(24),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: correctSize(-12),
    right: correctSize(-12),
  },
});
