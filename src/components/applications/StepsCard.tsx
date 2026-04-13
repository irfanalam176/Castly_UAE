import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { correctSize } from '../../utils';

interface DataList {
  id?: number;
  title?: string;
  description?: string;
}

interface StepsCardProps {
  data?: DataList[];
}

const StepsCard = ({ data }: StepsCardProps) => {
  return (
    <LinearGradient
      colors={[colors.lightBlue_2, colors.lightBlue_4]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {data?.map(item => (
        <View style={styles.row} key={item.id}>
          <Text
            style={[
              styles.stepNumber,
              { backgroundColor: item.id == 1 ? colors.gray_1 : colors.gray_5 },
            ]}
          >
            {item?.id}
          </Text>
          <View style={styles.detail}>
            <Text
              style={[
                styles.title,
                { color: item.id == 1 ? colors.darkgray_1 : colors.gray_1 },
              ]}
            >
              {item?.title}
            </Text>
            <Text
              style={[
                styles.description,
                { color: item.id == 1 ? colors.gray_1 : colors.gray_4 },
              ]}
            >
              {item?.description}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default StepsCard;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.lightBlue_3,
    borderRadius: 16,
    padding: correctSize(21),
  },
  row: {
    flexDirection: 'row',
    marginBottom: correctSize(16),
  },
  detail: {
    flex: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.white,
    marginRight: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    marginBottom: correctSize(5),
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    lineHeight: 16,
    flexShrink: 1,
  },
});
