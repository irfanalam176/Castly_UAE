import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import EditIcon from '../../../assets/svg/common/EditIcon';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import Badge from '../../common/Badge';

interface AboutMeCardProps{
  bio?:string | null;
  onPress?:()=>void;
  languages?:string[]
}
const AboutMeCard = ({onPress,bio,languages}:AboutMeCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>About Me</Text>
        <TouchableOpacity style={styles.editBtn} onPress={onPress}>
          <EditIcon color={colors.blue_5} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bio}>
        {bio}
      </Text>

      <View style={styles.language}>
       {
        languages?.map((item,key)=>(
           <Badge
          title={`🌐 ${item}`}
          containerStyle={styles.badge}
          textStyle={styles.badgeText}
          key={key}
        />
        ))
       }
      </View>
    </View>
  );
};

export default AboutMeCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 0.7,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    padding: correctSize(16),
    marginBottom:correctSize(16)
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: correctSize(10),
  },
  title: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
  },
  editText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.blue_5,
  },
  bio: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    lineHeight: correctSize(21),
  },
  badge: {
    backgroundColor: colors.white_1,
  },
  badgeText: {
    fontSize: 11,
    color: colors.darkgray,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginTop: correctSize(10.7),
  },
});
