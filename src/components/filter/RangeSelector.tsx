import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RangeSlider from 'react-native-sticky-range-slider';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';

const MIN = 1500;
const MAX = 5000;

const Thumb = () => <View style={styles.thumb} />;
const Rail = () => <View style={styles.rail} />;
const RailSelected = () => <View style={styles.railSelected} />;

type RangeSelectorProps = {
  onRangeChange?: (min: number, max: number) => void;
};

const RangeSelector = ({ onRangeChange }: RangeSelectorProps) => {
  const [min, setMin] = useState(MIN);
  const [max, setMax] = useState(MAX);

  const handleValueChange = useCallback(
    (newLow: number, newHigh: number) => {
      setMin(newLow);
      setMax(newHigh);
      onRangeChange?.(newLow, newHigh);
    },
    [onRangeChange],
  );

  return (
    <View>
      {/* Fixed labels: pinned left & right, update live on slide */}
      <View style={styles.labelsRow}>
        <Text style={styles.valueText}>Min: AED {min}</Text>
        <Text style={styles.valueText}>
          Max: AED {max === MAX ? `+${max}` : max}
        </Text>
      </View>

      <RangeSlider
        style={styles.slider}
        min={MIN}
        max={MAX}
        step={1}
        minRange={5}
        low={min}
        high={max}
        onValueChanged={handleValueChange}
        renderLowValue={() => null}
        renderHighValue={() => null}
        renderThumb={Thumb}
        renderRail={Rail}
        renderRailSelected={RailSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  slider: {
    marginVertical: 8,
  },
  valueText: {
    color: colors.darkgray,
    fontFamily: Fonts.Inter_Medium,
    fontSize: 14,
  },
  thumb: {
    width: correctSize(20),
    height: correctSize(20),
    borderRadius: 99,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  rail: {
    flex: 1,
    height: correctSize(8),
    borderRadius: 99,
    backgroundColor: colors.gray,
  },
  railSelected: {
    height: correctSize(8),
    backgroundColor: colors.gray,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
});

export default RangeSelector;