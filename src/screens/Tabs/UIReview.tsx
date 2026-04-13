// UI REVIEW SCREEN  - TEMP
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import CustomButton from '../../components/common/CustomButton';
import { useDispatch } from 'react-redux';
import { Fonts } from '../../assets/fonts';
import { logout } from '../../redux/reducers/userSlice';
import { correctSize } from '../../utils';

const UIReview = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>UI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    gap: correctSize(20),
  },
  button: {
    marginTop: correctSize(20),
    width: '100%',
    padding: correctSize(10),
    height: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default UIReview;
