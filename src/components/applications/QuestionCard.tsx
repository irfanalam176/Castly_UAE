import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import ChatRoundIcon from '../../assets/svg/applications/ChatRoundIcon';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';

interface QuestionCard{
    onPress?:()=>void
}

const QuestionCard = ({onPress}:QuestionCard) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <ChatRoundIcon />
        </View>
        <View>
          <Text style={styles.title}>Have questions?</Text>
          <Text style={styles.description}>Message the brand directly</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.btnText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between"
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.gray_1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:correctSize(12)
  },
  row:{
    flexDirection:"row",
    alignItems:"center"
  },
  title:{
    color:colors.darkgray_1,
    fontSize:14,
    fontFamily:Fonts.Inter_SemiBold,
    lineHeight:20
  },
  description:{
    fontSize:12,
    fontFamily:Fonts.Inter_Regular,
    color:colors.gray_4
  },
  button:{
    backgroundColor:colors.white_1,
    borderRadius:8,
    fontSize:14,
    paddingHorizontal:correctSize(13),
    paddingVertical:correctSize(9)
},
btnText:{
    fontFamily:Fonts.Inter_SemiBold,
    color:colors.darkgray,
  }
});
