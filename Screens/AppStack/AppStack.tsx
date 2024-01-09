import React from 'react';
import TandCs from './TandCsScreen';
import VerificationScreen from './VerificationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPScreen from './OTPScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="t-and-cs" component={TandCs} options={{ headerShown: false }}/>
      <Stack.Screen name="verification" component={VerificationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="otp" component={OTPScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppStack;
