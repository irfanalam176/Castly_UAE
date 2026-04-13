import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import BuildingIcon from '../../assets/svg/applications/BuildingIcon';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import CustomButton from '../common/CustomButton';
import MapIcon from '../../assets/svg/applications/MapIcon';

interface LocationCardProps {
  location?: string;
  locationDetail?: string;
  country?: string;
  parking?: string;
  onPress?: () => void;
}

const LocationCard = ({
  location,
  locationDetail,
  country,
  parking,
  onPress,
}: LocationCardProps) => {
  return (
    <View>
      <View>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MapIcon />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.location}>{location}</Text>
            {/* <Text style={styles.locationDetail}>{locationDetail}</Text> */}
            <Text style={styles.locationDetail}>{country}</Text> 
           {parking&&<View style={styles.parkingTextContainer}>
              <Text style={styles.parkingText}>{parking}</Text>
            </View>}
          </View>
          {/* <View>
            <CustomButton
              title="Map"
              onPress={onPress}
              style={styles.brandBtnContainer}
              textStyle={styles.brandText}
            />
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 14,
    backgroundColor: colors.light_red,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: correctSize(12),
  },
  location: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    marginBottom: correctSize(3),
  },
  locationDetail: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    width: '70%',
    lineHeight: 18
  },
  brandBtnContainer: {
    paddingHorizontal: correctSize(11),
    paddingVertical: correctSize(6),
    backgroundColor: colors.lightBlue_2,
    borderRadius: 50,
    alignItems: 'center'
  },
  brandText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: colors.blue_5,
  },
  parkingTextContainer: {
    marginTop: correctSize(8),
    paddingHorizontal: correctSize(8),
    paddingVertical: correctSize(3),
    backgroundColor: colors.lightBlue_7,
    borderRadius: 50
  },
  parkingText: {
    fontFamily: Fonts.Inter_Medium,
    fontSize: 11,
    color: colors.blue_1,
  }
});
