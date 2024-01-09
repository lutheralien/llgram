import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack/AppStack';
import AuthStack from './AuthStack/AuthStack';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator, View} from 'react-native';
const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  console.log('uT');
  
  console.log(userToken);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNav;
