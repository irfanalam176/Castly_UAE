import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "../../utils/colors";
import { correctSize } from "../../utils";
import StockArrow from "../../assets/svg/payments/StockArrow";
import { Fonts } from "../../assets/fonts";

const ColumnChart = () => {

  const data = [
    { value: 50, label: 'Jan' },
    { value: 80, label: 'Feb' },
    { value: 40, label: 'Mar' },
    { value: 95, label: 'Apr' },
    { value: 60, label: 'May' },
  ];

  return (
    <View style={styles.container}>
     <View style={styles.header}>
      <View >
       <Text style={styles.title}>
        Monthly Earnings
      </Text>
      <Text style={styles.subHeading}>
        Net payout after Castly fees
      </Text>
     </View>
     <View style={styles.row}>
      <StockArrow/>
      <Text style={styles.calcuation}>+35% Dec</Text>
     </View>
     </View>
      <BarChart
        data={data}
        barWidth={30}
        spacing={20}
        barBorderTopLeftRadius={5}
        barBorderTopRightRadius={5}
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: colors.gray_3 }}
        xAxisLabelTextStyle={{color: colors.gray_3 }}
        noOfSections={5}
        frontColor={colors.primary}
      />
    </View>
  );
};

export default ColumnChart;
const styles = StyleSheet.create({
    container:{
      backgroundColor:colors.white,
      borderRadius:correctSize(16),
      borderWidth:1,
      borderColor:colors.white_1,
      padding:correctSize(16),
      marginBottom:correctSize(16)
    },
    header:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:correctSize(16)
    },
    title:{
      fontSize:14,
      fontFamily:Fonts.Inter_Bold,
      color:colors.darkgray_1
    },
    subHeading:{
      fontSize:11,
      fontFamily:Fonts.Inter_Regular,
      color:colors.gray_3
    },
    row:{
      flexDirection:"row",
      alignItems:"center",
      gap:correctSize(5)
    },
    calcuation:{
      fontSize:12,
      fontFamily:Fonts.Inter_Regular,
      color:colors.green_5
    },

})