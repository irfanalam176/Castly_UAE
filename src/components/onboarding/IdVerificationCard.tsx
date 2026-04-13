import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import ShieldIcon from '../../assets/svg/common/ShieldIcon';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import FastImage from 'react-native-fast-image';

interface IdVerificationCardProps {
  onUpload?: () => void;
  uploading?: boolean;
  imageUri?: string | null;
}

const IdVerificationCard = ({ onUpload, uploading, imageUri }: IdVerificationCardProps) => {
  return (
    <View style={styles.container}>
      <ShieldIcon />
      <View style={styles.content}>
        <Text style={styles.title}>ID Verification</Text>
        <Text style={styles.mainText}>
          Upload your Emirates ID or Passport to get a Castly Verified badge.
          Verified talent receive{' '}
          <Text style={styles.bold}>2X more bookings.</Text>
        </Text>

        {/* Show uploaded image preview */}
        {imageUri && (
          <FastImage
            source={{ uri: imageUri }}
            style={styles.preview}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}

        {uploading ? (
          <View style={styles.uploadingRow}>
            <ActivityIndicator size="small" color={colors.blue_7} />
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        ) : (
          <Text style={styles.uploadId} onPress={onUpload}>
            {imageUri ? '✓ ID Uploaded — tap to change' : 'Upload ID'}
          </Text>
        )}
      </View>
    </View>
  );
};

export default IdVerificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: correctSize(12),
    backgroundColor: colors.lightBlue_7,
    borderWidth: 1,
    borderColor: colors.lightBlue_6,
    padding: correctSize(16.7),
    borderRadius: 16,
    alignItems: 'flex-start',
    marginBottom: correctSize(16),
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.blue_8,
    marginBottom: correctSize(4),
  },
  mainText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.blue_1,
    lineHeight: correctSize(20),
    flex: 1,
  },
  bold: {
    fontFamily: Fonts.Inter_Bold,
  },
  preview: {
    width: correctSize(80),
    height: correctSize(80),
    borderRadius: 8,
    marginTop: correctSize(8),
  },
  uploadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    marginTop: correctSize(8),
  },
  uploadingText: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.blue_7,
  },
  uploadId: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 11,
    color: colors.white,
    backgroundColor: colors.blue_7,
    borderRadius: 100,
    paddingHorizontal: correctSize(14),
    paddingVertical: correctSize(6),
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginTop: correctSize(8),
  },
});