import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import CustomInput from '../../components/common/CustomInput';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';

const clothSizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const STAGGER = 150;

const Measurements = () => {
  const dispatch = useDispatch();
  const { height, weight, bust, waist, hips, shoeSize, clothingSize } =
    useSelector((state: RootState) => state.onboarding);

  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Your measurements</Text>
        <Text style={styles.subHeading}>Help brands find the perfect fit.</Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <View style={styles.row}>
          <View style={styles.col}>
            <CustomInput
              label="Height (cm)"
              placeholder="178"
              keyboardType="numeric"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={height}
              onChangeText={v => dispatch(setField({ height: v }))}
            />
          </View>
          <View style={styles.col}>
            <CustomInput
              label="Weight (kg)"
              placeholder="60"
              keyboardType="numeric"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={weight}
              onChangeText={v => dispatch(setField({ weight: v }))}
            />
          </View>
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 3}>
        <View style={styles.row}>
          <View style={styles.col}>
            <CustomInput
              label="Bust (cm)"
              placeholder="86"
              keyboardType="numeric"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={bust}
              onChangeText={v => dispatch(setField({ bust: v }))}
            />
          </View>
          <View style={styles.col}>
            <CustomInput
              label="Waist (cm)"
              placeholder="62"
              keyboardType="numeric"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={waist}
              onChangeText={v => dispatch(setField({ waist: v }))}
            />
          </View>
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 4}>
        <View style={styles.row}>
          <View style={styles.col}>
            <CustomInput
              label="Hips (cm)"
              placeholder="90"
              keyboardType="numeric"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={hips}
              onChangeText={v => dispatch(setField({ hips: v }))}
            />
          </View>
          <View style={styles.col}>
            <CustomInput
              label="Shoe Size (EU)"
              placeholder="39"
              keyboardType="numeric"
              placeholderTextColor={colors.gray_3}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              labelStyle={styles.inputLabel}
              value={shoeSize}
              onChangeText={v => dispatch(setField({ shoeSize: v }))}
            />
          </View>
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 5}>
        <Text style={styles.inputLabel}>Clothing Size</Text>
        <View style={styles.sizes}>
          {clothSizeList.map(size => {
            const isActive = clothingSize === size;
            return (
              <TouchableOpacity
                key={size}
                activeOpacity={0.8}
                onPress={() =>
                  dispatch(
                    setField({
                      clothingSize: isActive ? null : size,
                    }),
                  )
                }
                style={
                  isActive ? [styles.radio, styles.radioActive] : styles.radio
                }
              >
                <Text
                  style={
                    isActive
                      ? [styles.radioText, styles.radioTextActive]
                      : styles.radioText
                  }
                >
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 6}>
        <Text style={styles.banner}>
          💡 Accurate measurements increase your match score by up to 40% and
          help brands find you faster.
        </Text>
      </SlideLeftFade>
    </View>
  );
};

export default Measurements;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.darkgray_1,
  },
  subHeading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(16),
  },
  row: {
    flexDirection: 'row',
    gap: correctSize(12),
    marginBottom: correctSize(16),
  },
  col: { flex: 1 },
  inputStyle: { fontSize: 13, fontFamily: Fonts.Inter_Regular },
  inputContainer: {
    height: correctSize(45),
    backgroundColor: colors.lightBlue_5,
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  sizes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: correctSize(10),
    gap: correctSize(6),
  },
  radio: {
    borderRadius: 14,
    borderWidth: 1.4,
    borderColor: colors.gray,
    flex: 1,
    paddingVertical: correctSize(13.8),
    alignItems: 'center',
  },
  radioActive: {
    backgroundColor: colors.darkgray_1,
    borderColor: colors.darkgray_1,
  },
  radioText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 12,
    color: colors.darkgray,
  },
  radioTextActive: { color: colors.primary },
  banner: {
    color: colors.green_5,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: correctSize(18),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.green_4,
    backgroundColor: colors.green_1,
    padding: correctSize(12.7),
    marginTop: correctSize(16),
  },
});
