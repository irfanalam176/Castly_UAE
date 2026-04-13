import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import EditIcon from '../../../assets/svg/common/EditIcon';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import InstagramIcon from '../../../assets/svg/socialIcons/InstagramIcon';
import TikTokIcon from '../../../assets/svg/socialIcons/TikTokIcon';
import PinterestIcon from '../../../assets/svg/socialIcons/PinterestIcon';
import TwitterIcon from '../../../assets/svg/socialIcons/TwitterIcon';
import RedditIcon from '../../../assets/svg/socialIcons/RedditIcon';
import BlueTick from '../../../assets/svg/Profile/BlueTick';
import CustomButton from '../../common/CustomButton';
import PlusIcon from '../../../assets/svg/common/PlusIcon';
import { useProfile } from '../../../hooks/useProfile';

interface SocialMediaCardProps {
  onPress?: () => void;
  onAddAccount?: () => void;
}

const ICON_SIZE = { width: 14, height: 14 };

const PLATFORMS = [
  {
    key: 'instagramHandle' as const,
    followersKey: 'instagramFollowers' as const,
    label: 'Instagram',
    icon: <InstagramIcon {...ICON_SIZE} color={colors.white} />,
    getUrl: (handle: string) => `https://instagram.com/${handle.replace('@', '')}`,
  },
  {
    key: 'tiktokHandle' as const,
    followersKey: 'tiktokFollowers' as const,
    label: 'TikTok',
    icon: <TikTokIcon {...ICON_SIZE} color={colors.white} />,
    getUrl: (handle: string) => `https://tiktok.com/@${handle.replace('@', '')}`,
  },
  {
    key: 'pinterestHandle' as const,
    followersKey: null,
    label: 'Pinterest',
    icon: <PinterestIcon {...ICON_SIZE} color={colors.white} />,
    getUrl: (handle: string) => `https://pinterest.com/${handle.replace('@', '')}`,
  },
  {
    key: 'twitterHandle' as const,
    followersKey: null,
    label: 'X (Twitter)',
    icon: <TwitterIcon {...ICON_SIZE} color={colors.white} />,
    getUrl: (handle: string) => `https://x.com/${handle.replace('@', '')}`,
  },
  {
    key: 'redditHandle' as const,
    followersKey: null,
    label: 'Reddit',
    icon: <RedditIcon {...ICON_SIZE} color={colors.white} />,
    getUrl: (handle: string) => `https://reddit.com/user/${handle.replace('@', '')}`,
  },
];

const SocialMediaCard = ({ onPress, onAddAccount }: SocialMediaCardProps) => {
  const { profile } = useProfile({ fetchOnMount: false });

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  // Only show platforms that have a handle
  const connectedPlatforms = PLATFORMS.filter(p => profile?.[p.key]);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>Social Media</Text>
        <TouchableOpacity style={styles.editBtn} onPress={onPress}>
          <EditIcon color={colors.blue_5} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {connectedPlatforms.map(({ key, followersKey, label, icon, getUrl }) => {
        const handle = profile?.[key] as string;
        const followers = followersKey ? profile?.[followersKey] : null;

        // Format: @handle · Platform  or  10,000 followers · Platform
        const displayHandle = handle.startsWith('@') ? handle : `@${handle}`;
        const subtitle = followers != null
          ? `${followers.toLocaleString()} followers · ${label}`
          : `${displayHandle} · ${label}`;

        return (
          <TouchableOpacity
            key={key}
            style={styles.socialMedia}
            activeOpacity={0.7}
            onPress={() => handleOpenLink(getUrl(handle))}
          >
            <View style={styles.row}>
              <View style={styles.iconContainer}>{icon}</View>
              <Text style={styles.platformName}>{subtitle}</Text>
            </View>
            <BlueTick />
          </TouchableOpacity>
        );
      })}

      <CustomButton
        icon={<PlusIcon width={14} height={14} color={colors.darkgray} />}
        title=" Add Social Account"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={onAddAccount}
      />
    </View>
  );
};

export default SocialMediaCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    padding: correctSize(16),
    marginBottom: correctSize(16),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(10),
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  editText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.blue_5,
  },
  socialMedia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: colors.lightBlue_5,
    padding: correctSize(12),
    marginBottom: correctSize(12),
  },
  iconContainer: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkgray_1,
  },
  platformName: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
  },
  button: {
    backgroundColor: colors.white_1,
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray,
  },
});