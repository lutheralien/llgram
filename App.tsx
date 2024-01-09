import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import AppNav from './Screens/AppNav';
import {AuthProvider} from './context/AuthContext';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
