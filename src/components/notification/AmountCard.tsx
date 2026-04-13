import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icons from '../vectorIcons/Icons';

import { ViewStyle, TextStyle } from 'react-native';
import { correctSize } from '../../utils';

export interface AmountCardProps {
  lable1?: string;
  value1?: string | number;
  lable2?: string;
  value2?: string | number;
  bgColor?: string;
  borderColor?: string;
  contentColor?: string;
  label1Size?: number;
  value1Size?: number;
  label2Size?: number;
  value2Size?: number;
  status?: boolean;
  statusColor?: string;
  lable1FontFamily?: string;
  lable2FontFamily?: string;
  value1FontFamily?: string;
  value2FontFamily?: string;
  
  // Optional style props if needed for more customization
  containerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  label1Style?: TextStyle;
  value1Style?: TextStyle;
  label2Style?: TextStyle;
  value2Style?: TextStyle;
}

const AmountCard = ({
  lable1,
  value1,
  lable2,
  value2,
  bgColor,
  borderColor,
  contentColor,
  label1Size,
  value1Size,
  label2Size,
  value2Size,
  status = false,
  statusColor,

  lable1FontFamily,
  lable2FontFamily,
  value1FontFamily,
  value2FontFamily,
}:AmountCardProps) => {
  return (
    <View
      style={[
        styles.amountCard,
        { backgroundColor: bgColor, borderColor: borderColor },
      ]}
    >
      <View style={[styles.row, { marginBottom: correctSize(8) }]}>
        <Text
          style={{
            color: contentColor,
            fontSize: label1Size,
            fontFamily: lable1FontFamily,
          }}
        >
          {lable1}
        </Text>
        <Text
          style={{
            color: contentColor,
            fontSize: value1Size,
            fontFamily: value1FontFamily,
          }}
        >
          {value1}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            color: contentColor,
            fontSize: label2Size,
            fontFamily: lable2FontFamily,
          }}
        >
          {lable2}
        </Text>
        <View style={styles.row}>
          {status && (
            <Icons
              name={'circle'}
              color={statusColor}
              size={8}
              family={'FontAwesome6'}
              style={styles.status}
            />
          )}
          <Text
            style={{
              color: contentColor,
              fontSize: value2Size,
              fontFamily: value2FontFamily,
            }}
          >
            {value2}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AmountCard;

const styles = StyleSheet.create({
  amountCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: correctSize(13),
    marginBottom: correctSize(12)
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  status: {
    marginRight: correctSize(5)
  }
});