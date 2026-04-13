import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import CustomInput from '../../common/CustomInput';
import { correctSize } from '../../../utils';
import AtTheRateIcon from '../../../assets/svg/Profile/AtTheRateIcon';

type Props = {
  name: string;
  setName: (v: string) => void;
  handle: string;
  setHandle: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
};

const EditBasicInfo = ({
  name,
  setName,
  handle,
  setHandle,
  bio,
  setBio,
  category,
  setCategory,
  location,
  setLocation,
}: Props) => {
  return (
    <View>
      <Text style={styles.title}>Basic Info</Text>
      <CustomInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        labelStyle={styles.inputLabel}
        placeholder="Sarah Al-Mansouri"
        placeholderTextColor={colors.gray_7}
      />
      <CustomInput
        label="Handle"
        value={handle}
        onChangeText={setHandle}
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        labelStyle={styles.inputLabel}
        leftSvgIcon={<AtTheRateIcon />}
        placeholder="@sarah.model"
        placeholderTextColor={colors.gray_7}
      />
      <CustomInput
        label="Bio"
        value={bio}
        onChangeText={setBio}
        inputContainerStyle={[styles.input, styles.textAreaContainer]}
        inputStyle={styles.textArea}
        labelStyle={styles.inputLabel}
        multiline
        placeholder="Tell brands about yourself…"
        placeholderTextColor={colors.gray_7}
      />
      <View style={styles.groupInputs}>
        <View style={styles.groupInput}>
          <CustomInput
            label="Category"
            value={category}
            onChangeText={setCategory}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            labelStyle={styles.inputLabel}
            placeholder="Fashion Model"
            placeholderTextColor={colors.gray_7}
          />
        </View>
        <View style={styles.groupInput}>
          <CustomInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            labelStyle={styles.inputLabel}
            placeholder="Dubai, UAE"
            placeholderTextColor={colors.gray_7}
          />
        </View>
      </View>
    </View>
  );
};

export default EditBasicInfo;

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
  textAreaContainer: {
    height: correctSize(80),
  },
  textArea: {
    paddingVertical: correctSize(10),
    height: correctSize(80),
    textAlignVertical: 'top',
    color: colors.darkgray_1,
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
  },
  groupInputs: {
    flexDirection: 'row',
    gap: correctSize(10),
  },
  groupInput: {
    flex: 1,
  },
});
