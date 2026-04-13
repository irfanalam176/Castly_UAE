import { StyleSheet, View } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';

const SkeletonBox = ({ width = '100%', height = 20, style = {} }: any) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: colors.gray_6,
          borderRadius: 6,
        },
        style,
      ]}
    />
  );
};

const ApplicationsDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header Image */}
      <SkeletonBox height={265} width="100%" />

      <View style={styles.content}>
        {/* Brand Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <SkeletonBox width={48} height={48} style={{ borderRadius: 10 }} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <SkeletonBox width="60%" height={16} />
              <SkeletonBox width="40%" height={12} style={{ marginTop: 6 }} />
              <SkeletonBox width="30%" height={12} style={{ marginTop: 6 }} />
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <SkeletonBox width="40%" height={16} />
          <SkeletonBox height={14} style={{ marginTop: 10 }} />
          <SkeletonBox height={14} width="80%" style={{ marginTop: 6 }} />
        </View>

        {/* Location Card */}
        <View style={styles.card}>
          <SkeletonBox width="30%" height={16} />
          <SkeletonBox height={14} style={{ marginTop: 10 }} />
          <SkeletonBox height={14} width="70%" style={{ marginTop: 6 }} />
        </View>

        {/* Compensation Card */}
        <View style={styles.card}>
          <SkeletonBox width="35%" height={16} />
          <SkeletonBox height={14} style={{ marginTop: 10 }} />
        </View>

        {/* Description */}
        <View style={styles.card}>
          <SkeletonBox width="45%" height={16} />
          <SkeletonBox height={14} style={{ marginTop: 10 }} />
          <SkeletonBox height={14} width="90%" style={{ marginTop: 6 }} />
          <SkeletonBox height={14} width="80%" style={{ marginTop: 6 }} />
        </View>
      </View>
    </View>
  );
};

export default ApplicationsDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: correctSize(16),
  },
  card: {
    backgroundColor: colors.white,
    padding: correctSize(16),
    borderRadius: 16,
    marginBottom: correctSize(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});