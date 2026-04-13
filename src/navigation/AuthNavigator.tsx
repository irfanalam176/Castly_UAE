// COMMENTED OUT  - NOT USED PREVIOUSE IMPLEMNETATION

// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from '../screens/Login';
// import SignUp from '../screens/SignUp';
// import Otp from '../screens/Otp';
// import EmailVerification from '../screens/EmailVerification';
// import NewPassword from '../screens/NewPassword';
// import PasswordReset from '../screens/PasswordReset';
// import { stackRoutes } from './screenIds';
// import WelcomeScreen from '../screens/WelcomeScreen';

// const Stack = createNativeStackNavigator();

// const AuthNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name={stackRoutes.WelcomeScreen} component={WelcomeScreen} />
//       <Stack.Screen name={stackRoutes.Login} component={Login} />
//       <Stack.Screen name={stackRoutes.SignUp} component={SignUp} />
//       <Stack.Screen name={stackRoutes.Otp} component={Otp} />
//       <Stack.Screen name={stackRoutes.EmailVerification} component={EmailVerification} />
//       <Stack.Screen name={stackRoutes.NewPassword} component={NewPassword} />
//       <Stack.Screen name={stackRoutes.PasswordReset} component={PasswordReset} />
//     </Stack.Navigator>
//   );
// };

// export default AuthNavigator;