import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import PhoneIcon from '../../../assets/svg/common/PhoneIcon';
import EmailIcon from '../../../assets/svg/common/EmailIcon';
import RulerIcon from '../../../assets/svg/Profile/RulerIcon';
import WeightIcon from '../../../assets/svg/common/WeightIcon';
import FileIcon from '../../../assets/svg/common/FileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/store';
import { setConfirmProfileField } from '../../../redux/reducers/confirmProfileSlice';

type NumericField = 'height' | 'weight' | 'bust' | 'waist' | 'hips' | 'shoeSize';
type StringField = 'phoneNumber' | 'email' | 'clothingSize';
type FieldKey = NumericField | StringField;

interface FieldConfig {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  key: FieldKey;
  numeric?: boolean;
}

const ApplicationDetails = () => {
  const dispatch = useDispatch();
  const confirmProfile = useSelector((state: RootState) => state.confirmProfile);
const { data } = useSelector((state: RootState) => state.applyJobProgress);
const profileData = useSelector((state: RootState) => state.profile.data); // add this

useEffect(() => {
  const s = data?.profileSnapshot;
  const p = profileData;
  const m = profileData?.measurements; // measurements sub-object

  dispatch(setConfirmProfileField({
    avatarUrl: s?.avatarUrl ?? p?.avatarUrl ?? '',
    phoneNumber:  s?.phoneNumber  ?? p?.phoneNumber  ?? '',
    email:        s?.email        ?? p?.email        ?? '',
    height:       s?.height       ?? p?.height       ?? m?.height       ?? 0,
    weight:       s?.weight       ?? p?.weight       ?? m?.weight       ?? 0,
    bust:         s?.bust         ?? p?.bust         ?? 0,
    waist:        s?.waist        ?? p?.waist        ?? 0,
    hips:         s?.hips         ?? p?.hips         ?? 0,
    shoeSize:     s?.shoeSize     ?? p?.shoeSize     ?? m?.shoeSize     ?? 0,
    clothingSize: s?.clothingSize ?? p?.clothingSize ?? '',
  }));
}, [data?.profileSnapshot, profileData]);

  const fields: FieldConfig[] = [
    { key: 'phoneNumber',  label: 'Phone Number',   placeholder: '+971 50 123 4567', icon: <PhoneIcon />, numeric: true },
    { key: 'email',        label: 'Email Address',  placeholder: 'sarah@castly.app', icon: <EmailIcon /> },
    { key: 'height',       label: 'Height (cm)',    placeholder: '178',              icon: <RulerIcon color={colors.gray_3} />, numeric: true },
    { key: 'weight',       label: 'Weight (kg)',    placeholder: '60',               icon: <WeightIcon />, numeric: true },
    { key: 'bust',         label: 'Bust (cm)',      placeholder: '90',               icon: <RulerIcon color={colors.gray_3} />, numeric: true },
    { key: 'waist',        label: 'Waist (cm)',     placeholder: '70',               icon: <RulerIcon color={colors.gray_3} />, numeric: true },
    { key: 'hips',         label: 'Hips (cm)',      placeholder: '95',               icon: <RulerIcon color={colors.gray_3} />, numeric: true },
    { key: 'shoeSize',     label: 'Shoe Size (EU)', placeholder: '39',               icon: <FileIcon />, numeric: true },
    { key: 'clothingSize', label: 'Clothing Size',  placeholder: 'S (EU 36)',        icon: <FileIcon /> },
  ];

  const handleChange = (key: FieldKey, value: string) => {
    const numericFields: NumericField[] = ['height', 'weight', 'bust', 'waist', 'hips', 'shoeSize'];
    if (numericFields.includes(key as NumericField)) {
      dispatch(setConfirmProfileField({ [key]: value === '' ? 0 : Number(value) }));
    } else {
      dispatch(setConfirmProfileField({ [key]: value }));
    }
  };

  const getDisplayValue = (key: FieldKey): string => {
    const val = confirmProfile[key];
    if (typeof val === 'number') return val === 0 ? '' : String(val);
    return val;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Details</Text>

      {fields.map((field, index) => (
        <View
          key={field.key}
          style={[styles.inputContainer, index === fields.length - 1 && styles.lastInput]}
        >
          {field.icon}
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              placeholderTextColor={colors.gray_5}
              style={styles.input}
              keyboardType={field.numeric ? 'numeric' : 'default'}
              value={getDisplayValue(field.key)}
              onChangeText={v => handleChange(field.key, v)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default ApplicationDetails;

 
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: correctSize(16),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white_1,
    marginBottom: correctSize(14),
  },
  title: {
    fontSize: 11,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_4,
    textTransform: 'uppercase',
    marginBottom: correctSize(12),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBlue_7,
    paddingVertical: correctSize(16),
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Medium,
    color: colors.gray_3,
    marginBottom: correctSize(4),
  },
  input: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Medium,
    paddingVertical: 0,
    paddingLeft: 0,
    lineHeight: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  lastInput: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
});