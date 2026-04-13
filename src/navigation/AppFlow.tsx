import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stackRoutes } from './screenIds';

import Profile from '../screens/Portfolio/Profile';
import UploadPhoto from '../screens/Portfolio/UploadPhoto';
import SkillsScreen from '../screens/Portfolio/SkillsScreen';
import PersonalInfoScreen from '../screens/Portfolio/PersonalInfoScreen';
import PortfolioScreen from '../screens/Portfolio/PortfolioScreen';
import PaymentInfoScreen from '../screens/Portfolio/PaymentInfoScreen';
import VerificationKyc from '../screens/Tabs/kyc/VerificationKyc';
import VerificationKycUpload from '../screens/Tabs/kyc/VerificationKycUpload';
import TabNavigator from './TabNavigator';
import Notifications from '../screens/Notifications';
import ApplicationsDetail from '../screens/Tabs/applications/ApplicationsDetail';
import ApplicationStatus from '../screens/Tabs/applications/ApplicationStatus';
import JobStart from '../screens/Tabs/applications/JobStart';
import BookingRequest from '../screens/Tabs/applications/BookingRequest';
import ReviewApplication from '../screens/Tabs/applications/ReviewApplication';
import ChatScreen from '../screens/Tabs/chat/ChatScreen';
import WithDrawMoney from '../screens/Tabs/kyc/WithDrawMoney';
import TransactionHistory from '../screens/Tabs/kyc/TransactionHistory';
import PaymentStatus from '../screens/Tabs/kyc/PaymentStatus';
import HelpCenter from '../screens/HelpCenter/HelpCenter';
import Filter from '../screens/Tabs/Filter';
import ApplyJobScreen from '../screens/Tabs/applications/applyJob/ApplyJobScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import StartBrowsing from '../screens/onboarding/StartBrowsing';
import ApplicationSubmit from '../screens/Tabs/applications/applyJob/ApplicationSubmit';
import EmailVerification from '../screens/EmailVerification';
import Otp from '../screens/Otp';
import NewPassword from '../screens/NewPassword';
import PasswordReset from '../screens/PasswordReset';
import BookingDetails from '../screens/Tabs/myJobs/BookingDetails';
import VerificationOTP from '../screens/VerificationOTP';

const Stack = createNativeStackNavigator();

const AppFlow = ({ initialRouteName }: { initialRouteName?: string }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName ?? stackRoutes.WelcomeScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={stackRoutes.WelcomeScreen}
        component={WelcomeScreen}
      />

      <Stack.Screen name={stackRoutes.Login} component={Login} />
      <Stack.Screen name={stackRoutes.SignUp} component={SignUp} />
      <Stack.Screen
        name={stackRoutes.StartBrowsing}
        component={StartBrowsing}
      />
      <Stack.Screen
        name={stackRoutes.VerificationOTP}
        component={VerificationOTP}
      />
      <Stack.Screen name={stackRoutes.TabNavigator} component={TabNavigator} />
    
      {/* Onboarding / Edit */}
      {/* <Stack.Screen name={stackRoutes.Profile} component={Profile} />
      <Stack.Screen name={stackRoutes.UploadPhoto} component={UploadPhoto} />
      <Stack.Screen name={stackRoutes.SkillsScreen} component={SkillsScreen} />
      <Stack.Screen name={stackRoutes.PersonalInfoScreen} component={PersonalInfoScreen} />
      <Stack.Screen name={stackRoutes.PortfolioScreen} component={PortfolioScreen} />
      <Stack.Screen name={stackRoutes.PaymentInfoScreen} component={PaymentInfoScreen} /> */}

      {/* KYC */}
      {/* <Stack.Screen name={stackRoutes.VerificationKyc} component={VerificationKyc} />
      <Stack.Screen name={stackRoutes.VerificationKycUpload} component={VerificationKycUpload} />

      {/* Notifications */}
      {/* <Stack.Screen name={stackRoutes.Notifications} component={Notifications} />  */}

      {/* Applications */}
      <Stack.Screen
        name={stackRoutes.ApplyJobScreen}
        component={ApplyJobScreen}
      />
      <Stack.Screen
        name={stackRoutes.ApplicationsDetail}
        component={ApplicationsDetail}
      />
      <Stack.Screen
        name={stackRoutes.ApplicationStatus}
        component={ApplicationStatus}
      />
      <Stack.Screen name={stackRoutes.JobStart} component={JobStart} />
      <Stack.Screen
        name={stackRoutes.BookingRequest}
        component={BookingRequest}
      />
      <Stack.Screen name={stackRoutes.ApplicationSubmit} component={ApplicationSubmit} />
      <Stack.Screen
        name={stackRoutes.ReviewApplication}
        component={ReviewApplication}
      />
      <Stack.Screen
        name={stackRoutes.ChatScreen}
        component={ChatScreen}
      />

      <Stack.Screen
        name={stackRoutes.EmailVerification}
        component={EmailVerification}
      />
      <Stack.Screen
        name={stackRoutes.Otp}
        component={Otp}
      />
      <Stack.Screen
        name={stackRoutes.NewPassword}
        component={NewPassword}
      />
      <Stack.Screen
        name={stackRoutes.PasswordReset}
        component={PasswordReset}
      />
      <Stack.Screen
        name={stackRoutes.BookingDetails}
        component={BookingDetails}
      />

    
      {/* Wallet / Payments */}
      {/* <Stack.Screen name={stackRoutes.WithDrawMoney} component={WithDrawMoney} />
      <Stack.Screen name={stackRoutes.TransactionHistory} component={TransactionHistory} />
      <Stack.Screen name={stackRoutes.PaymentStatus} component={PaymentStatus} /> */}

      {/* Misc */}
      {/* <Stack.Screen name={stackRoutes.HelpCenter} component={HelpCenter} />
      <Stack.Screen name={stackRoutes.Filter} component={Filter} /> */}
    </Stack.Navigator>
  );
};

export default AppFlow;
