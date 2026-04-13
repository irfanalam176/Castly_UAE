import { View, Text, StyleSheet, Image, ImageProps, ImageSourcePropType } from 'react-native';
import React from 'react';
import { images } from '../../assets/images';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import CustomButton from '../common/CustomButton';
import PhoneIcon from '../../assets/svg/applications/PhoneIcon';
import ChatOutlined from '../../assets/svg/applications/ChatOutlined';
import FastImage from 'react-native-fast-image';

interface ContactPersonCardProps{
    image?:string ,
    name?:string,
    role?:string,
    onCall?:()=>void,
    onMessage?:()=>void
}

const ContactPersonCard = ({image,name,role,onCall,onMessage}:ContactPersonCardProps) => {
  return (
    <View>
      <View style={styles.header}>
        <FastImage source={image?{uri:image}:images.user} style={styles.image} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>

      <View style={styles.footerBtnRow}>
        <View style={styles.btnContainer}>
          <CustomButton
        title="Call"
        icon={<PhoneIcon color={colors.gray_1} width={14} height={17} />}
        onPress={onCall}
        style={styles.contactButton}
        textStyle={styles.contactButtonText}
      />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
        title="Message"
        icon={<ChatOutlined />}
        onPress={onMessage}
        style={styles.contactButton}
        textStyle={styles.contactButtonText}
      />
        </View>
      </View>
    </View>
  );
};

export default ContactPersonCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: correctSize(16),
  },
  image: {
    width: correctSize(56),
    height: correctSize(56),
    borderRadius: 100,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(5),
  },
  role: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_1,
  },
  footerBtnRow: {
    flexDirection: 'row',
    gap: correctSize(12),
  },
  btnContainer: {
    flex: 1,
  },
  contactButton: {
    backgroundColor: colors.lightBlue_2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightBlue_10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // icon + text
    paddingVertical: correctSize(13),
    paddingHorizontal: 16,
    marginBottom: correctSize(16),
  },
  contactButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 14,
    color: colors.gray_1,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
