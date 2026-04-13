import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

interface EditHeaderProps{
    title?:string;
    onEditPress?:()=>void;
}

const EditHeader = ({title,onEditPress}:EditHeaderProps) => {
  return (
    <View style={styles.editHeader}>
      <Text style={styles.subHeading}>{title}</Text>
      <TouchableOpacity onPress={onEditPress}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditHeader;
const styles = StyleSheet.create({
     subHeading: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
    editHeader:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:correctSize(12),
    marginTop:correctSize(10)
  },
  editText:{
    color:colors.purple,
    fontSize:14,
    fontFamily:Fonts.Inter_Medium
  }
})
