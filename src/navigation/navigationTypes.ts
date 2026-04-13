import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppStackParamList = {
  WelcomeScreen: undefined;
  StartBrowsing: undefined;
  VerificationOTP: {email?:string} | undefined;

  Login: undefined;
  SignUp: undefined;
  EmailVerification:undefined;
  Otp:undefined;
  NewPassword:undefined;
  PasswordReset:undefined;
  BookingDetails: {id:string} | undefined;
  // Onboarding / Edit
  Profile: { status?: string } | undefined;
  UploadPhoto: { status?: string } | undefined;
  SkillsScreen: { status?: string } | undefined;
  PersonalInfoScreen: { status?: string } | undefined;
  PortfolioScreen: { status?: string } | undefined;
  PaymentInfoScreen: { status?: string } | undefined;

  // KYC
  VerificationKyc: undefined;
  VerificationKycUpload: { documentType: string } | undefined;

  // Main App
   TabNavigator: NavigatorScreenParams<TabParamList>;

  // Notifications
  Notifications: undefined;

  // Applications
  ApplyJobScreen: { id: string } | undefined;
  ApplicationsDetail: { id: string };
  ApplicationStatus: { id: string };
  JobStart: { id: string };
  BookingRequest: undefined;
  ApplyForJob: { id: string };
  ReviewApplication: { applicationId: string };
  ApplicationSubmit: undefined;
  // Chat
  ChatScreen: undefined;

  // Wallet
  WithDrawMoney: undefined;
  TransactionHistory: undefined;
  PaymentStatus: { transactionId: string };

  // Misc
  HelpCenter: undefined;
  Filter: undefined;
};

export type TabParamList = {
  Home: undefined;
  Wallet: undefined;
  ApplicationsStack: undefined;
  Messages: undefined;
  UserProfile: undefined;
  Payments: undefined;
};

export type NavProp = NativeStackNavigationProp<AppStackParamList>;

export type HomeNavProp = BottomTabNavigationProp<TabParamList> &
  NativeStackNavigationProp<AppStackParamList>;
