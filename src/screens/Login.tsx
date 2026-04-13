import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import LogoHeader from '../components/common/LogoHeader';
import { colors } from '../utils/colors';
import { Fonts } from '../assets/fonts';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { stackRoutes } from '../navigation/screenIds';
import Toast from 'react-native-toast-message';
import { inputIcons } from '../utils/iconConfig';
import { useLoginUserMutation, useVerifyEmailMutation } from '../services/authApi';
import { correctSize } from '../utils';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { NavProp } from '../navigation/navigationTypes';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/reducers/userSlice';
export default function Login() {
  const navigation = useNavigation<NavProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
 const [VerifyEmail, { isLoading:verifyEmailLoading }] = useVerifyEmailMutation();
  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const payload = {
      email: trimmedEmail.toLowerCase(),
      password,
    };
    try {
      const resp = await loginUser(payload).unwrap();
      if (!resp?.user?.emailVerified) {

        await VerifyEmail(undefined).unwrap();

        Toast.show({ 
          type: 'success',
          text1: 'Verify Your Email',
          text2: 'OTP has been sent to your mailbox.',
        });
        navigation.navigate(stackRoutes.VerificationOTP, { email: email });
        return
      }
      Toast.show({
        type: 'success',
        text1: 'Welcome back! 👋',
        text2: 'You have successfully logged in.',
      });

      setEmail('');
      setPassword('');
      dispatch(setLogin(true))
      navigation.dispatch( 
        CommonActions.reset({
          index: 0,
          routes: [{ name: stackRoutes.TabNavigator }],
        }),
      );
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: err?.data?.message || err?.error || err.message,
      });
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <ScrollView
          style={styles.logoHeaderContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.body}>
            <LogoHeader showClose={false} />
            <Text style={styles.mainHeading}>Welcome back</Text>
            <Text style={styles.subHeading}>
              Log in to discover your next role.
            </Text>

            {/* Email Input */}
            <CustomInput
              label="Email"
              leftIcon={inputIcons.email}
              containerStyle={styles.inputContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={styles.inputFieldContainer}
              inputStyle={styles.inputField}
              value={email}
              onChangeText={val => {
                setEmail(val);
                // setLoginError('')
              }}
              secureTextEntry={false}
              placeholder="you@example.com"
              errorStyle={styles.errorText}
              placeholderTextColor={colors.gray_2}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password Input */}
            <CustomInput
              label="Password"
              leftIcon={inputIcons.lock}
              containerStyle={styles.passwordInputContainer}
              labelStyle={styles.inputLabel}
              inputContainerStyle={styles.inputFieldContainer}
              inputStyle={styles.inputField}
              value={password}
              onChangeText={val => {
                setPassword(val);
                // setLoginError('')
              }}
              secureTextEntry={true}
              placeholder="••••••••"
              errorStyle={styles.errorText}
              placeholderTextColor={colors.gray_2}
              keyboardType="default"
            />

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate(stackRoutes.EmailVerification)}
            >
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton
              title="Login to Castly"
              onPress={handleLogin}
              loading={isLoginLoading || verifyEmailLoading}
              disabled={isLoginLoading}
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
            />

            <View style={styles.lineContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* <CustomButton
            title="Continue with Phone Number"
            disabled
            style={styles.outlineButton}
            textStyle={styles.outlineButtonText}
          /> */}

            {/* <CustomButton
              title="Continue with Google"
              icon={{
                name: 'google',
                family: 'FontAwesome',
                color: colors.black,
                size: 20,
              }}
              style={styles.outlineButton}
              textStyle={styles.outlineButtonText}
              onPress={handleGoogleLogin}
            /> */}

            {/* <CustomButton
            title="Continue with Facebook"
            disabled
            icon={{
              name: 'logo-facebook',
              family: 'Ionicons',
              color: colors.white,
              size: 20,
            }}
            style={styles.facebookButton}
            textStyle={styles.facebookButtonText}
          /> */}

            <Text style={styles.noAccountText}>Don't have an account?</Text>

            <CustomButton
              title="Sign up"
              onPress={() => navigation.navigate(stackRoutes.SignUp)}
              style={styles.signupButton}
              textStyle={styles.signupButtonText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: correctSize(24),
  },
  logoHeaderContainer: {
    marginTop: 20,
  },
  mainHeading: {
    fontSize: 36,
    color: colors.black,
    marginTop: correctSize(48),
    marginBottom: correctSize(4),
    fontFamily: Fonts.InriaSerif_Bold,
    lineHeight: 40,
    textTransform: 'capitalize',
  },
  subHeading: {
    fontSize: 16,
    color: colors.gray_1,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(40),
  },
  inputContainer: {
    marginBottom: correctSize(19),
  },
  passwordInputContainer: {
    marginBottom: correctSize(17),
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    marginBottom: correctSize(4),
    color: colors.black,
  },
  inputFieldContainer: {
    height: 56,
    borderColor: colors.gray,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    paddingHorizontal: correctSize(16),
  },
  inputField: {
    fontSize: 16,
    color: colors.black,
  },

  errorText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.red,
  },
  forgotPassword: {
    fontSize: 14,
    color: colors.darkgray_1,
    fontFamily: Fonts.Inter_Medium,
    alignSelf: 'flex-end',
    marginBottom: correctSize(16),
  },
  loginError: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.red,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: correctSize(20),
    marginTop: correctSize(17),
    marginBottom: correctSize(16),
  },
  line: {
    height: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    flex: 1,
  },
  orText: {
    alignSelf: 'center',
    fontSize: 14,
    color: colors.gray_3,
    fontFamily: Fonts?.Inter_Medium,
    marginLeft: correctSize(16),
    marginRight: correctSize(16),
  },
  noAccountText: {
    fontSize: 14,
    color: colors.gray_1,
    alignSelf: 'center',
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(6),
  },
  signUpContainer: {
    backgroundColor: colors.lightBlue_1,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 16,
    color: colors.black,
    textTransform: 'none',
    textAlign: 'center',
  },

  outlineButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row', // for icon + text
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    color: colors.black,
    textTransform: 'none',
    textAlign: 'center',
  },

  facebookButton: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    borderWidth: 0,
    paddingVertical: 14,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    color: colors.white,
    textTransform: 'none',
    textAlign: 'center',
  },

  signupButton: {
    backgroundColor: colors.lightBlue_1,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 28,
  },
  signupButtonText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 16,
    color: colors.black_1,
    textTransform: 'none',
    textAlign: 'center',
  },
});

// const handleLogin = () => {
//     const trimmedEmail = email.trim();
//     if (trimmedEmail.length === 0) {
//         return setEmailError('Please Enter Email*');
//     }
//     if (!password) {
//         return setPasswordError('Please Enter Password*');
//     }

//     setLoading(true);
//     const payload = {
//         email: trimmedEmail.toLowerCase(),
//         password: password,
//     };

//     LoginUser({
//         payload: payload,
//         resolve: async (res: any) => {
//             console.log(res);

//             await AsyncStorage.setItem('isAuth', res?.data?.token);
//             await dispatch(fetchUserProfile() as any);
//             setEmail('')
//             setPassword('')
//             setLoading(false);
//         },
//         reject: (err: any) => {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Error',
//                 text2: err.message,
//             })
//             setLoading(false);
//             setLoginError(err.message)
//             console.log('error=======>>>>>', err);
//         },
//     });
// }
