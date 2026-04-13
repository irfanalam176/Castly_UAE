import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import CrossIcon from '../vectorIcons/CrossIcon';
import { Fonts } from '../../assets/fonts';
import FastImage,{Source} from 'react-native-fast-image';

interface KycVerificationCardProps {
  icon?: React.ReactNode;
  title?: string;
  name?: string;
  onClose?: () => void;
  iconContainerStyle?: ViewStyle;
  image?: Source;
}
const KycVerificationCard = ({
  icon,
  title,
  name,
  onClose,
  iconContainerStyle,
  image,
}: KycVerificationCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, iconContainerStyle]}>{icon}</View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>

        <TouchableOpacity style={styles.closeIconContainer} onPress={onClose}>
          <CrossIcon width={10} height={10} fillColor={colors.gray_1} />
        </TouchableOpacity>
      </View>

      <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.cover}/>
    </View>
  );
};

export default KycVerificationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: correctSize(22),
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray,
    marginBottom: correctSize(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  iconContainer: {
    width: correctSize(40),
    height: correctSize(40),
    marginRight: correctSize(12),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue_3,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
  },
  name: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  closeIconContainer: {
    width: correctSize(32),
    height: correctSize(32),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
  },
  image:{
    resizeMode:"cover",
    width:"100%",
    borderRadius:12,
    aspectRatio:1
  }
});
