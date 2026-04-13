import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { LineChart } from 'react-native-gifted-charts';

const OverviewChart = () => {
  const [chartWidth, setChartWidth] = useState(0);

  const data = [
    { value: 2000, label: 'Jul' },
    { value: 2400, label: 'Aug' },
    { value: 2200, label: 'Sep' },
    { value: 2800, label: 'Oct' },
    { value: 3200, label: 'Nov' },
    { value: 3500, label: 'Dec' },
  ];
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Earnings Overview</Text>
          <Text style={styles.description}>Last 6 months performance</Text>
        </View>

        <Text style={styles.badge}>6M</Text>
      </View>

      {/* Chart */}
      <View
        style={styles.chartContainer}
        onLayout={e => setChartWidth(e.nativeEvent.layout.width)}
      >
        {chartWidth > 0 && (
          <LineChart
            width={chartWidth}
            data={data}
            height={200}
            curved
            areaChart
            hideDataPoints
            color={colors.gray_1}
            startFillColor={colors.lightBlue_1}
            endFillColor={colors.lightBlue_1}
            startOpacity={0.9}
            endOpacity={0.8}
            initialSpacing={10}
            endSpacing={10}
            noOfSections={2}
            maxValue={4000}
            yAxisColor="transparent"
            xAxisColor="transparent"
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={styles.yAxisText}
            xAxisLabelTextStyle={styles.xAxisText}
            thickness={3}
            /* FIXED LABEL ISSUE */
            formatYLabel={value => `AED ${value}`}
            yAxisLabelWidth={60}
            animateOnDataChange
            animationDuration={1200}
            isAnimated
            rulesType="solid" // solid line instead of dashed
            rulesColor={colors.white_1} // change color
            rulesThickness={1}
          />
        )}
      </View>
    </View>
  );
};

export default OverviewChart;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: correctSize(21),
    flex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginTop: correctSize(24),
    borderWidth: 1,
    borderColor: colors.white_1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(5),
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  badge: {
    paddingVertical: correctSize(8),
    paddingHorizontal: correctSize(12),
    borderRadius: 8,
    backgroundColor: colors.white_1,
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
  chartContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  yAxisText: {
    color: colors.gray_1,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
  xAxisText: {
    color: colors.gray_1,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
});

