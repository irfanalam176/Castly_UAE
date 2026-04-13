import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { font } from '../../utils/font';
import { Fonts } from '../../assets/fonts';
import Icons from '../vectorIcons/Icons';
import StarIcon from '../../assets/svg/applications/StarIcon';
import StarOutlineIcon from '../../assets/svg/applications/StarOutlineIcon';
import AwardIcon from '../../assets/svg/applications/AwardIcon';
import GlobeIcon from '../../assets/svg/applications/GlobeIcon';
import InstaIcon from '../../assets/svg/applications/InstaIcon';
import CustomButton from '../common/CustomButton';

interface ApplicationDetailCardProps {
  item: any;
}

const ApplicationDetailCard = ({ item }: ApplicationDetailCardProps) => {

  
  const rating = item?.rating || 0;
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} />);
      } else {
        stars.push(<StarOutlineIcon key={i} />);
      }
    }
    return stars;
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: item?.logoColor || colors.darkgray_1 },
            ]}
          >
            <Text style={styles.logoInitial}>
              {item?.title[0] || '...'}
            </Text>
          </View>

          <View style={styles.titleContainer}>
            <View style={styles.titleSubContainer}>
              <Text style={styles.companyName}>
                {item?.brand?.brandName || '...'}
              </Text>
              <Icons
                family={'FontAwesome6'}
                name={'circle-check'}
                size={15}
                color={colors.blue_7}
              />
            </View>
            <Text style={styles.jobTitle}>{item?.brand?.brandIndustry || '...'}</Text>
            <View style={styles.starsContainer}>{renderStars()}</View>
            {/* <StarIcon />
                        <StarOutlineIcon /> */}
          </View>
        </View>
        {/* <View >
                    <CustomButton
                        title="View Brand"
                        style={styles.brandBtnContainer}
                        textStyle={styles.brandText}
                    />
                </View> */}
      </View>
      <View style={styles.socialDetailContainer}>
        <View style={styles.socialDetail}>
          <AwardIcon />
          <Text style={styles.socialText}>{item?.brand?.totalJobsPosted} jobs posted</Text>
        </View>
        <View style={styles.socialDetail}>
          <GlobeIcon />
          <Text style={styles.socialText}>{item?.brand?.brandWebsite}</Text>
        </View>
        <View style={styles.socialDetail}>
          <InstaIcon />
          <Text style={styles.socialText}>{item?.brand?.instagramHandle}</Text>
        </View>
      </View>
    </View>
  );
};

export default ApplicationDetailCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    padding: correctSize(16),
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
  },
  logoContainer: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white_rgb4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: correctSize(12),
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    resizeMode: 'cover',
  },
  logoInitial: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  jobTitle: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_4,
  },
  companyName: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 15,
    color: colors.darkgray_1,
    marginEnd: 10,
  },
  titleSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandBtnContainer: {
    paddingHorizontal: correctSize(12),
    paddingVertical: correctSize(6),
    backgroundColor: colors.lightBlue_2,
    borderRadius: 50,
    alignItems: 'center',
  },
  brandText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: colors.blue_5,
  },
  socialDetailContainer: {
    marginVertical: correctSize(12),
    borderTopWidth: 1,
    borderColor: colors.white_1,
    paddingVertical: correctSize(10),
    flexDirection: 'row',
  },
  socialDetail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.darkgray,
    marginStart: correctSize(6),
    flexShrink:1
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: correctSize(4),
    gap: correctSize(4),
  },
});
