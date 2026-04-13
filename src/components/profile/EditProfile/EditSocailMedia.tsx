import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import CustomInput from '../../common/CustomInput';
import AtTheRateIcon from '../../../assets/svg/Profile/AtTheRateIcon';

type Props = {
  instagramHandle: string; setInstagramHandle: (v: string) => void;
  tiktokHandle: string;    setTiktokHandle: (v: string) => void;
  pinterestHandle: string; setPinterestHandle: (v: string) => void;
  twitterHandle: string;   setTwitterHandle: (v: string) => void;
  redditHandle: string;    setRedditHandle: (v: string) => void;
};

const PLATFORMS = [
  { label: 'Instagram', valueKey: 'instagramHandle' as const, setter: 'setInstagramHandle' as const },
  { label: 'TikTok',    valueKey: 'tiktokHandle'    as const, setter: 'setTiktokHandle'    as const },
  { label: 'Pinterest', valueKey: 'pinterestHandle' as const, setter: 'setPinterestHandle' as const },
  { label: 'X (Twitter)', valueKey: 'twitterHandle' as const, setter: 'setTwitterHandle'   as const },
  { label: 'Reddit',    valueKey: 'redditHandle'    as const, setter: 'setRedditHandle'    as const },
];

const EditSocialMedia = (props: Props) => {
  // Only show platforms that have a non-empty value
  const visiblePlatforms = PLATFORMS.filter(p => props[p.valueKey]?.trim().length > 0);

  if (visiblePlatforms.length === 0) return null;

  return (
    <View>
      <Text style={styles.title}>Social Media</Text>
      {visiblePlatforms.map(({ label, valueKey, setter }) => (
        <CustomInput
          key={valueKey}
          label={label}
          value={props[valueKey]}
          onChangeText={props[setter]}
          inputContainerStyle={styles.input}
          inputStyle={styles.inputText}
          labelStyle={styles.inputLabel}
          leftSvgIcon={<AtTheRateIcon />}
          placeholder="@handle"
          placeholderTextColor={colors.gray_7}
        />
      ))}
    </View>
  );
};

export default EditSocialMedia;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(13),
  },
  input: {
    backgroundColor: colors.lightBlue_5,
    height: correctSize(41),
    paddingLeft: correctSize(12),
    marginBottom: correctSize(13),
  },
  inputText: {
    color: colors.darkgray_1,
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
  },
  inputLabel: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
    textTransform: 'uppercase',
    color: colors.gray_3,
    marginBottom: correctSize(5),
  },
});