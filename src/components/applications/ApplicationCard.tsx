import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/colors';
import Icons from '../vectorIcons/Icons';
import Tags from '../common/Tags';
import { Fonts } from '../../assets/fonts';
import BuildingIcon from '../../assets/svg/applications/BuildingIcon';
import CustomButton from '../common/CustomButton';
import PinIcon from '../../assets/svg/applications/PinIcon';
import CalendarIcon from '../../assets/svg/applications/CalendarIcon';
import ClockFill from '../../assets/svg/applications/ClockFill';
import BookMarkIcon from '../../assets/svg/applications/BookMarkIcon';
import BookMarkIconFill from '../../assets/svg/applications/BookMarkIconFill';
import { correctSize } from '../../utils';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';


interface ApplicationCardProps {
  item: {
    id?: number;
    status?: string;
    project?: {
      title?: string;
      specifyLocation?: string;
      user?:{
        companyName?:string
      }
    };
    createdAt?: string;
    expectedRate?: string;
    applyTime?: string;
    currency?:string;

  };
  onPress?: () => void; // separate prop
}

const ApplicationCard = ({ item,onPress }: ApplicationCardProps) => {

  const [isBookmark, setIsBookmark] = useState(false);

  let tagData = {};
  switch (item.status) {
    case 'APPLIED':
      tagData = {
        label: 'Pending Review',
        bgColor: colors.lightYellow,
        color: colors.darkBrown_1,
        icon: <ClockFill />,
      };
      break;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Tags items={tagData} />
        <TouchableOpacity
          style={[
            styles.bookmarkButton,
            { backgroundColor: colors.lightBlue_5 },
          ]}
          onPress={() => setIsBookmark(!isBookmark)}
        >
          {isBookmark ? <BookMarkIconFill /> : <BookMarkIcon />}
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{item?.project?.title || "N/A"}</Text>
      <View style={styles.infoRow}>
        <BuildingIcon />
        <Text style={styles.infoText}>{item?.project?.user?.companyName || "N/A"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <PinIcon />
          <Text style={styles.infoText}>{item.project?.specifyLocation || "N/A"}</Text>
        </View>
        <View style={styles.infoRow}>
          <CalendarIcon />
          <Text style={styles.infoText}>{formatDate(item?.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.table}>
        <View>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.price}>{item?.currency} {item?.expectedRate}</Text>
        </View>
        <View>
          <Text style={styles.label}>Applied</Text>
          <Text style={styles.time}>{formatTime(item?.createdAt)}</Text>
        </View>
      </View>

        <CustomButton
        title="View Details"
        onPress={onPress}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </TouchableOpacity>
  );
};

export default ApplicationCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: correctSize(20),
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    marginBottom: correctSize(16),
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    // padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom:correctSize(8),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: correctSize(16),
    minWidth:"45%",
    alignSelf:"flex-start",
  },
  infoText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.gray_1,
    marginLeft: correctSize(8),
    // flex:1
  },
  divider: {
    height: 1,
    backgroundColor: colors.white_1,
    marginBottom: correctSize(16),
  },
  table: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(20),
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    marginBottom: correctSize(3),
  },
  price: {
    fontSize: 18,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  time: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray,
  },
    button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: correctSize(48),
    paddingVertical:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: Fonts.Inter_SemiBold,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
