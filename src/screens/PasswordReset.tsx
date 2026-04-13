import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/layout/ScreenWrapper'
import { correctSize } from '../utils'
import LogoHeader from '../components/common/LogoHeader'
import CheckIcon from '../assets/svg/applications/CheckIcon'
import { colors } from '../utils/colors'
import { Fonts } from '../assets/fonts'
import CustomButton from '../components/common/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { stackRoutes } from '../navigation/screenIds'
import { NavProp } from '../navigation/navigationTypes'

const PasswordReset = () => {
    const navigation = useNavigation<NavProp>()
    function navigateTo(){
        navigation.replace(stackRoutes.Login)
    }
  return (
    <ScreenWrapper>
     <View style={styles.content}>
        <LogoHeader  showClose={false}/>

       <View style={styles.body}>
         <View style={styles.iconContainer}>
            <CheckIcon width={26.25} height={30} color={colors.green}/>
        </View>

         <Text style={styles.title}>Password Reset</Text>
                  <Text style={styles.subtitle}>
                   Your password has been successfully reset. You can now log in with your new password.
                  </Text>

                  <CustomButton
                  title='Continue to Login'
                  style={styles.button}

                  onPress={navigateTo}
                  />
       </View>
     </View>
    </ScreenWrapper>
  )
}

export default PasswordReset
const styles = StyleSheet.create({
    content:{
        padding:correctSize(24),
        flexGrow:1
    },
    body:{
        alignItems:"center",
        flex:1,
        justifyContent:"center"
    },
    iconContainer:{
        width:correctSize(80),
        height:correctSize(80),
        borderRadius:99,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.lightGreen_1,
        marginBottom:correctSize(30)
    },
      title: {
        fontSize: 36,
        fontFamily: Fonts.InriaSerif_Bold,
        color: colors.black_1,
        marginBottom: correctSize(21),
      },
      subtitle: {
        fontSize: 16,
        fontFamily: Fonts.Inter_Regular,
        color: colors.gray_1,
        marginBottom: correctSize(120),
      },
      button:{
        width:"100%",
        backgroundColor:colors.primary
      }
})