import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import { images } from '../../assets/images';
import EditIcon from '../../assets/svg/common/EditIcon';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import { ROUTES } from '../../services/routes';
interface BannerProps{
  onEdit?:()=>void
  image?:string | null
}
const Banner = ({onEdit,image}:BannerProps) => {
  return (
       <View style={styles.banner}>
        <FastImage
          source={{uri:`${ROUTES.MEDIA_URL}${image}`}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.bannerImage}
        />
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <EditIcon/>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
  )
}

export default Banner
const styles = StyleSheet.create({
  banner: {
    height: correctSize(176),
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal:16,
    backgroundColor:colors.gray_3rgb
  },
  bannerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  editBtn:{
       borderWidth: 0.7,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:correctSize(12),
    paddingVertical:correctSize(6),
    borderRadius:100,
    gap:correctSize(5),
    zIndex:99,
    alignSelf:"flex-end",
    marginTop:correctSize(40)
  },
  editBtnText:{
    fontSize:12,
    fontFamily:Fonts.Inter_Medium,
    color:colors.white
  }
});