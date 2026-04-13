import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import ArrowDown from '../../assets/svg/kyc/ArrowDown';
import Tags from '../common/Tags';
import { Fonts } from '../../assets/fonts';
import ClockFill from '../../assets/svg/applications/ClockFill';
import ArrowUp from '../../assets/svg/kyc/ArrowUp';

interface BankCardProps {
  title?: string;
  detail?: string;
  date?: string;
  status?: string;
  amount?:string;
}

const RecentTransactionCard = ({
  title,
  detail,
  date,
  status,
  amount
}: BankCardProps) => {
  const getBackgroundColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return colors.lightGreen_1;
      case 'pending':
        return colors.yellow_2;
      case 'processed':
        return colors.lightBlue_3;
      default:
        return colors.white;
    }
  };
  const getColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return colors.green;
      case 'pending':
        return colors.orange_1;
      case 'processed':
        return colors.darkgray_1;
      default:
        return colors.black;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getBackgroundColor(status) },
        ]}
      >
        {status == 'completed' && <ArrowDown />}
        {status == 'pending' && (
          <ClockFill width={18} height={18} color={colors.darkBrown_1} />
        )}
        {status == 'processed' && <ArrowUp width={14} height={18} color={colors.purple}/>}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={[styles.amount,{color:getColor(status)}]}>{amount}</Text>
        <View style={{ alignSelf: 'center' }}>
          {status == 'completed' && (
            <Tags
              items={{
                bgColor: colors.lightGreen_1,
                color: colors.green_5,
                label: 'Completed',
                fontFamily: Fonts.Inter_Medium,
              }}
            />
          )}
          {status == 'pending' && (
            <Tags
              items={{
                bgColor: colors.yellow_2,
                color: colors.darkBrown_1,
                label: 'Pending',
                fontFamily: Fonts.Inter_Medium,
              }}
            />
          )}
          {status == 'processed' && (
            <Tags
              items={{
                bgColor: colors.white_1,
                color: colors.darkgray,
                label: 'Processed',
                fontFamily: Fonts.Inter_Medium,
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentTransactionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: correctSize(21),
    flex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginTop: correctSize(12),
    borderWidth: 1,
    borderColor: colors.white_1,
  },
  detailContainer: {
    flex: 1,
  },
  iconContainer: {
    borderRadius: 12,
    width: correctSize(44),
    height: correctSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(3),
  },
  detail: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginBottom: correctSize(5),
  },
  amount: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    marginBottom: correctSize(6),
  },
  date: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  rightContainer: {
    alignItems: 'center',
  },
});
