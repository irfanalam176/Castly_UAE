import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import CustomInput from '../common/CustomInput';
import SearchIcon from '../../assets/svg/common/SearchIcon';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';

interface MessagesHeaderProps{
    unread?:number,
    onSearch?:any

}
const MessagesHeader = ({unread,onSearch}:MessagesHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.unread}>{unread} unread</Text>

      <CustomInput
        leftSvgIcon={<SearchIcon />}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        placeholder='Search messages…'
        placeholderTextColor={colors.gray_3}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default MessagesHeader;
const styles = StyleSheet.create({
  container: {
    padding: correctSize(16),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontSize:20,
    fontFamily:Fonts.InriaSerif_Bold,
    color:colors.darkgray_1,
    lineHeight:correctSize(30)
  },
  unread: {
    fontSize:12,
    fontFamily:Fonts.Inter_Medium,
    color:colors.blue_7
  },
  input: {
    fontSize:13,
    fontFamily:Fonts.Inter_Regular,
},
inputContainer: {
    backgroundColor:colors.white_1,
    borderRadius:14,
    marginTop:correctSize(12)
  },
});
