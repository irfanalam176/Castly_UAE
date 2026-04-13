const screenIds = {
  stack: {

    WelcomeScreen:"WelcomeScreen",
    StartBrowsing:"StartBrowsing",
    VerificationOTP:"VerificationOTP",
    ApplicationSubmit:"ApplicationSubmit",
    BookingDetails:"BookingDetails",


    initalStack: 'initalStack',
    Login: 'Login',
    SignUp: 'SignUp',
    Otp: 'Otp',
    Profile: 'Profile',
    UploadPhoto: 'UploadPhoto',
    SkillsScreen: 'SkillsScreen',
    PersonalInfoScreen: 'PersonalInfoScreen',
    PortfolioScreen: 'PortfolioScreen',
    PaymentInfoScreen: 'PaymentInfoScreen',
    TabNavigator: 'TabNavigator',
    Home: 'Home',
    Wallet: 'Wallet',
    WithDrawMoney: 'WithDrawMoney',
    TransactionHistory: 'TransactionHistory',
    PaymentStatus: 'PaymentStatus',
    VerificationKyc: 'VerificationKyc',
    VerificationKycUpload: 'VerificationKycUpload',
    Payments: 'Payments',
    
    StackApplications: 'ApplicationsStack',
    ApplyJobScreen: 'ApplyJobScreen',
    Applications: 'Applications',
    ApplicationsDetail: 'ApplicationsDetail',
    ApplicationStatus: 'ApplicationStatus',
    JobStart: 'JobStart',
    BookingRequest: 'BookingRequest',
    ApplyForJob: 'ApplyForJob',
    ReviewApplication: 'ReviewApplication',
    Messages: 'Messages',
    UserProfile: 'UserProfile',
    Notifications: 'Notifications',
    ChatScreen: 'ChatScreen',

    HelpCenter: 'HelpCenter',

    EmailVerification: 'EmailVerification',
    NewPassword: 'NewPassword',
    PasswordReset: 'PasswordReset',

    Filter: 'Filter',
  },
} as const;
export default screenIds;
export const stackRoutes = screenIds.stack;
