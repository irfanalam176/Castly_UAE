import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import RulerIcon from '../../../assets/svg/Profile/RulerIcon';
import EditIcon from '../../../assets/svg/common/EditIcon';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';

interface MeasurementCardProps {
  onPress?: () => void;
  height?: number | null;
  weight?: number | null;
  bust?: number | null;
  waist?: number | null;
  hips?: number | null;
  shoeSize?: number | null;
  clothingSize?: string | null;
  experience?: string | null ;
}

const MeasurementCard = ({
  onPress,
  height,
  weight,
  bust,
  waist,
  hips,
  shoeSize,
  clothingSize,
  experience,
}: MeasurementCardProps) => {

  const MEASUREMENTS = [
    [
      { label: 'Height', value: height ? `${height} cm` : '—' },
      { label: 'Weight', value: weight ? `${weight} kg` : '—' },
    ],
    [
      { label: 'Bust', value: bust ? `${bust}"` : '—' },
      { label: 'Waist', value: waist ? `${waist}"` : '—' },
    ],
    [
      { label: 'Hips', value: hips ? `${hips}"` : '—' },
      { label: 'Shoe', value: shoeSize ? `UK ${shoeSize}` : '—' },
    ],
    [
      { label: 'Clothing', value: clothingSize ?? '—' },
      { label: 'Experience', value: experience ?? '—' },
    ],
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <RulerIcon />
          <Text style={styles.title}>Measurements</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={onPress}>
          <EditIcon color={colors.blue_5} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <View>
        {MEASUREMENTS.map((row, rowIndex) => {
          const isLast = rowIndex === MEASUREMENTS.length - 1;
          return (
            <View
              key={rowIndex}
              style={[styles.row, !isLast && styles.rowBorder]}
            >
              {row.map((item, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.cell, colIndex === 0 && styles.cellBorder]}
                >
                  <Text style={styles.cellLabel}>{item.label}</Text>
                  <Text style={styles.cellValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MeasurementCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    overflow: 'hidden',
    marginBottom: correctSize(16),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlue_2,
    padding: correctSize(16),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
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
  row: {
    flexDirection: 'row',
  },
  rowBorder: {
    borderBottomWidth: 0.7,
    borderBottomColor: colors.lightBlue_5,
  },
  cell: {
    flex: 1,
    paddingVertical: correctSize(12),
    gap: correctSize(4),
  },
  cellBorder: {
    borderRightWidth: 0.7,
    borderRightColor: colors.lightBlue_5,
    paddingLeft: correctSize(16),
    marginRight: correctSize(16),
  },
  cellLabel: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  cellValue: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
});