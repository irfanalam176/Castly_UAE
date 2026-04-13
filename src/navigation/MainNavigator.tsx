import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppFlow from './AppFlow';


const Stack = createNativeStackNavigator();

const MainNavigator = ({ initialRouteName }: { initialRouteName?: string }) => {
  return <AppFlow initialRouteName={initialRouteName} />;
};

export default MainNavigator;