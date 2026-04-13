import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import ArrowDown from '../../assets/svg/kyc/ArrowDown';
import Tags from '../common/Tags';
import { Fonts } from '../../assets/fonts';
import ClockFill from '../../assets/svg/applications/ClockFill';
import ArrowUp from '../../assets/svg/kyc/ArrowUp';
import CheckCircleIcon from '../../assets/svg/applications/CheckCircleIcon';
import HourGlassIcon from '../../assets/svg/applications/HourGlassIcon';
import BankIcon from '../../assets/svg/kyc/BankIcon';

interface BankCardProps {
  title?: string;
  detail?: string;
  date?: string;
  status?: string;
  amount?: string;
}

const TransactionHistoryCard = ({
  title,
  detail,
  date,
  status,
  amount,
}: BankCardProps) => {
  const getBackgroundColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return colors.lightGreen_1;
      case 'pending':
        return colors.yellow_2;
      case 'processed':
        return colors.pink_3;
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
        return colors.red_3;
      default:
        return colors.black;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.row}>
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
          {status == 'processed' && (
            <ArrowUp width={14} height={18} color={colors.red_3} />
          )}
        </View>

        <View style={{flex:1}}>
         <View style={styles.topRow}>
             <View style={styles.detailContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.detail}>{detail}</Text>
        </View>

        <View style={styles.rightContainer}>
          <Text style={[styles.amount, { color: getColor(status) }]}>
            {amount}
          </Text>
        </View></View>  
       
       <View style={styles.tagRow}>
          {status == 'completed' && (
            <Tags
              items={{
                icon: <CheckCircleIcon width={14} height={12} color={colors.green_5}/>,
                bgColor: colors.lightGreen_1,
                color: colors.green_5,
                label: 'Earnings',
                fontFamily: Fonts.Inter_Medium,
              }}
            />
          )}
          {status == 'pending' && (
            <Tags
              items={{
                icon:<HourGlassIcon width={9} height={12}/>,
                bgColor: colors.yellow_2,
                color: colors.darkBrown_1,
                label: 'Escrow',
                fontFamily: Fonts.Inter_Medium,
              }}
            />
          )}
          {status == 'processed' && (
            <Tags
              items={{
                icon:<BankIcon width={12} height={12} color={colors.red_3}/>,
                bgColor: colors.pink_3,
                color: colors.red_3,
                label: 'Withdrawal',
                fontFamily: Fonts.Inter_Medium,
              }}
            />
          )}
        <Text style={styles.date}>{date}</Text>
        </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default TransactionHistoryCard;

const styles = StyleSheet.create({
    topRow:{
        flexDirection:"row",
    },
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
    marginTop: correctSize(12),
    borderWidth: 1,
    borderColor: colors.white_1,
  },
  tagRow:{
    flexDirection:"row",
    alignItems:"center",
    gap:correctSize(16),
    marginTop:correctSize(10)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailContainer: {
    flex: 1,
  },
  iconContainer: {
    borderRadius: 12,
    width: correctSize(48),
    height: correctSize(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: correctSize(16),
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(3),
    flexShrink:1
  },
  detail: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginBottom: correctSize(5),
    flexShrink:1
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
