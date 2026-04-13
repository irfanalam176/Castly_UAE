import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import ShieldIcon from '../../../assets/svg/common/ShieldIcon';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import CustomInput from '../../common/CustomInput';
import AtTheRateIcon from '../../../assets/svg/Profile/AtTheRateIcon';
import LinearGradient from 'react-native-linear-gradient'; // or 'expo-linear-gradient'

// Social media gradient configs
const PLATFORM_GRADIENTS: Record<string, { icon: string[]; card: string[] }> = {
  instagram: {
    icon: ['#F58529', '#DD2A7B', '#8134AF'],
    card: ['#FFF0F7', '#FDF5FF'],
  },
  tiktok: {
    icon: ['#010101', '#69C9D0'],
    card: ['#F0FEFF', '#F5F5F5'],
  },
  pinterest: {
    icon: ['#E60023', '#AD081B'],
    card: ['#FFF0F1', '#FFF5F5'],
  },
  twitter: {
    icon: ['#000000', '#1a1a1a'],
    card: ['#F2F2F2', '#E8E8E8'],
  },
  reddit: {
    icon: ['#FF4500', '#FF6534'],
    card: ['#FFF2EE', '#FFF8F5'],
  },
};

interface AddSocialMediaCardProps {
  platform: string;
  icon: React.ReactNode;
  handle: string;
  connected?: boolean;
  followers?: number;
  verified?: boolean;
  value?: string;                          // add
  onChangeText?: (v: string) => void;      // add
}

const AddSocialMediaCard = ({
  icon,
  connected,
  followers,
  handle,
  verified,
  platform,
  onChangeText,
  value
}: AddSocialMediaCardProps) => {
  const gradient = PLATFORM_GRADIENTS[platform] ?? {
    icon: ['#888', '#555'],
    card: ['#F5F5F5', '#EBEBEB'],
  };

  const showVerified = connected && verified;
  const showFollowers = connected && followers != null;

  return (
    <View style={styles.card}>
      {/* Gradient is purely decorative background — never clips children */}
      <LinearGradient
        colors={gradient.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <LinearGradient
          colors={gradient.icon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          {icon}
        </LinearGradient>

        <View>
          <Text style={styles.handle}>{handle}</Text>
          <View style={styles.row}>
            {showVerified ? (
              <>
                <View style={styles.verified}>
                  <ShieldIcon width={11} height={11} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
                {showFollowers && (
                  <Text style={styles.followers}>
                    · {followers} follower{Number(followers) !== 1 ? 's' : ''}
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.notConnected}>Not connected</Text>
            )}
          </View>
        </View>
      </View>

      <CustomInput
        leftSvgIcon={<AtTheRateIcon />}
        label={`${handle} handle`}
        labelStyle={styles.inputLabel}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="yourusername"
        placeholderTextColor={colors.gray_3}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default AddSocialMediaCard;

const styles = StyleSheet.create({
  card: {
    padding: correctSize(16),
    borderRadius: 16,
    marginBottom: correctSize(20),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    overflow:"hidden"
  },
  iconContainer: {
    width: correctSize(36),
    height: correctSize(36),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  handle: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(22),
    textTransform: 'capitalize',
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.blue_7,
  },
  followers: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  notConnected: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  inputContainer: {},
  inputLabel: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Bold,
    color: colors.gray_4,
    textTransform: 'uppercase',
  },
  input: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
  },
});
