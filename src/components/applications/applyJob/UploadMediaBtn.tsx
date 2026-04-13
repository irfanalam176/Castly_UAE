import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import UploadIcon from '../../../assets/svg/applications/UploadIcon';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';

interface UploadMediaBtnProps {
  onPress?: () => void;
}
const UploadMediaBtn = ({ onPress }: UploadMediaBtnProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <UploadIcon />
      </View>
      <Text style={styles.title}>Upload New Work</Text>
      <Text style={styles.formate}>JPG, PNG or MP4 · Max 50MB</Text>
    </TouchableOpacity>
  );
};

export default UploadMediaBtn;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray_5,
    padding: correctSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
    marginVertical: correctSize(8),
  },
  formate: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_3,
  },
});
