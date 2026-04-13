import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import RulerIcon from '../../../assets/svg/Profile/RulerIcon';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';

type Props = {
  height: string; setHeight: (v: string) => void;
  weight: string; setWeight: (v: string) => void;
  bust: string; setBust: (v: string) => void;
  waist: string; setWaist: (v: string) => void;
  hips: string; setHips: (v: string) => void;
  shoeSize: string; setShoeSize: (v: string) => void;
  clothingSize: string; setClothingSize: (v: string) => void;
  experience: string; setExperience: (v: string) => void;
};

const fields: { label: string; key: keyof Props extends `set${infer _}` ? never : keyof Props; placeholder: string }[] = [
  { label: 'Height', key: 'height', placeholder: 'e.g. 178 cm' },
  { label: 'Weight', key: 'weight', placeholder: 'e.g. 60 kg' },
  { label: 'Bust', key: 'bust', placeholder: 'e.g. 86 cm' },
  { label: 'Waist', key: 'waist', placeholder: 'e.g. 62 cm' },
  { label: 'Hips', key: 'hips', placeholder: 'e.g. 90 cm' },
  { label: 'Shoe', key: 'shoeSize', placeholder: 'e.g. EU 39' },
  { label: 'Clothing', key: 'clothingSize', placeholder: 'e.g. S / EU 36' },
  { label: 'Experience', key: 'experience', placeholder: '4 years' },
];

const setterMap: Record<string, keyof Props> = {
  height: 'setHeight',
  weight: 'setWeight',
  bust: 'setBust',
  waist: 'setWaist',
  hips: 'setHips',
  shoeSize: 'setShoeSize',
  clothingSize: 'setClothingSize',
  experience: 'setExperience',
};

const EditMeasurments = (props: Props) => {
  const rows: (typeof fields)[] = [];
  for (let i = 0; i < fields.length; i += 2) {
    rows.push(fields.slice(i, i + 2));
  }

  return (
    <View>
      <View style={styles.header}>
        <RulerIcon />
        <Text style={styles.title}>Measurements</Text>
      </View>

      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(field => (
            <View key={field.key} style={styles.col}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{field.label}</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={field.placeholder}
                  placeholderTextColor={colors.gray_7}
                  value={props[field.key] as string}
                  onChangeText={v => (props[setterMap[field.key]] as (v: string) => void)(v)}
                  keyboardType="default"
                />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default EditMeasurments;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  row: {
    flexDirection: 'row',
    gap: correctSize(12),
    marginBottom: correctSize(16),
  },
  col: { flex: 1 },
  inputStyle: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  inputContainer: {
    borderRadius: 14,
    backgroundColor: colors.lightBlue_5,
    padding: correctSize(12),
  },
  inputLabel: {
    fontSize: 10,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_3,
  },
});