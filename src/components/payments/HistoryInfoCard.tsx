import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import InfoIcon from '../../assets/svg/common/InfoIcon';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

const HistoryInfoCard = () => {
  return (
    <View style={styles.card}>
      <InfoIcon color={colors.gray_3} />
      <Text style={styles.text}>
        Castly charges a <Text style={styles.bold}>10% platform fee</Text> on each completed booking. This covers
        escrow protection, dispute resolution, AI matching, and Castly's Trust &
        Safety team.
      </Text>
    </View>
  );
};

export default HistoryInfoCard;
const styles = StyleSheet.create({
  card: {
    borderWidth:1,
    borderColor:colors.gray,
    borderRadius:16,
    padding:correctSize(16),
    flexDirection:"row",
    gap:correctSize(8),
    marginTop:correctSize(16)
  },
  text:{
    fontSize:12,
    fontFamily:Fonts.Inter_Regular,
    lineHeight:correctSize(20),
    color:colors.gray_4,
    flex:1
  },
  bold:{
    fontFamily:Fonts.Inter_Bold
  }
});
