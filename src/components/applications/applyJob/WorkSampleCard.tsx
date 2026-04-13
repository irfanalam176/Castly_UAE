import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';

interface WorkSampleCardProps {
  count?: number;
}

const MAX = 4;

const WorkSampleCard = ({ count = 0 }: WorkSampleCardProps) => {
  console.log(count);
  
  const safeCount = Math.min(Math.max(count, 0), MAX);

  const progressPercent = (safeCount / MAX) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Work Samples</Text>

      <Text style={styles.limit}>
        Choose up to 4 pieces most relevant to this shoot.
      </Text>

      <View style={styles.countRow}>
        <Text style={styles.count}>
          {safeCount} / {MAX} selected
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: `${progressPercent}%` },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default WorkSampleCard;
const styles = StyleSheet.create({
    container:{
        padding:correctSize(16),
        borderRadius:16,
        backgroundColor:colors.white,
        borderWidth:1,
        borderColor:colors.white_1,
        marginBottom:correctSize(14)
    },
    title:{
        fontSize:16,
        fontFamily:Fonts.InriaSerif_Bold,
        color:colors.darkgray_1
    },
    limit:{
        fontSize:12,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_4,
        marginVertical:correctSize(8)
    },
    count:{
        fontSize:11,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_3
    },
    progressBar:{
        width:correctSize(112),
        height:correctSize(6),
        borderRadius:100,
        backgroundColor:colors.gray,
        overflow:"hidden"
    },
    progress:{
        height:correctSize(6),
        backgroundColor:colors.primary,
    },
    countRow:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }
})