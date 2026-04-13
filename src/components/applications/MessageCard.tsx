import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BuildingIcon from '../../assets/svg/applications/BuildingIcon';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';

interface MessageCardProp{
    message?:string
}

const MessageCard = ({message}:MessageCardProp) => {
  return (
    <View>
     <View style={styles.header}>
         <View style={styles.iconContainer}>
        <BuildingIcon width={13.5} height={18} color={colors.white}/>
      </View>

      <View>
        <Text style={styles.title}>Message from Brand</Text>
      <Text style={styles.description}>Luxury Fashion House Dubai</Text>
      </View>
     </View>


      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default MessageCard;
const styles = StyleSheet.create({
    header:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:correctSize(16),
    },
  iconContainer: {
    backgroundColor:colors.darkgray,
    width:48,
    height:48,
    borderRadius:100,
    alignItems:"center",
    justifyContent:"center",
    marginRight:correctSize(12)
  },
  title:{
    fontSize:16,
    fontFamily:Fonts.InriaSerif_Bold,
    color:colors.darkgray_1,
    marginBottom:correctSize(5)
  },
  description:{
    fontSize:14,
    fontFamily:Fonts.Inter_Regular,
    color:colors.gray_4
  },
  messageContainer:{
    backgroundColor:colors.lightBlue_5,
    borderRadius:12,
    padding:16,
    borderLeftWidth:4,
    borderLeftColor:colors.darkGreen3
  },
  message:{
    fontSize:14,
    fontFamily:Fonts.Inter_Regular,
    color:colors.darkgray,
    lineHeight:26
  }
});
