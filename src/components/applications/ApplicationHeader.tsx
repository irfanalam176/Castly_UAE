import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import FilterIcon from '../../assets/svg/applications/FilterIcon';
import { correctSize } from '../../utils';

interface ApplicationHeaderProps{
  onRightPress?:()=>void
}
const ApplicationHeader = ({onRightPress}:ApplicationHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>My Applications</Text>
      <Text style={styles.description}>Track your casting opportunities</Text>
      </View>

        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={onRightPress}
        >
         <FilterIcon/>
        </TouchableOpacity>
    </View>
  );
};

export default ApplicationHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:correctSize(24),
    paddingBottom:correctSize(41),
    paddingTop:correctSize(32),
    borderBottomWidth:1,
    borderBottomColor:colors.gray,
    backgroundColor:colors.white
  },
  title: {
    fontSize: 24,
    fontFamily:Fonts.InriaSerif_Bold,
    color:colors.darkgray_1,
    marginBottom:correctSize(4)
  },
  description: {
    fontSize: 14,
    fontFamily:Fonts.Inter_Regular,
    color:colors.gray_4
  },
    iconButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.white_1, // Light gray background for left button
    justifyContent: 'center',
    alignItems: 'center',
  },
});
