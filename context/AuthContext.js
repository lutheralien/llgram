import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {BaseURL} from '../services';
import {Alert} from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, enteredOtp) => {
    // setIsLoading(true);
    try {
      const data = {email, enteredOtp};
      console.log(data);
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      };
      // Make an API call using Axios
      const response = await axios.post(
        `${BaseURL}/api/v1/user/verify-otp`,
        data,
        options,
      );

      // Access the data from the response
      const responseData = response.data.data;
      // console.log(responseData);
      setUserInfo(responseData);
      setUserToken(responseData.token);

      AsyncStorage.setItem('userInfo', JSON.stringify(responseData));
      AsyncStorage.setItem('userToken', responseData.token);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      // console.log('in auth');
      // console.log(error);
      setError(error);
      setIsLoading(false);
      Alert.alert('Verification Error', `Please make sure your PIN is correct`);
    }
    // setUserToken('abc123');
    // AsyncStorage.setItem('userToken', 'abc123');
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      // console.log('init');
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('isLoggedIn Error', error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userToken,
        isLoading,
        email,
        setEmail,
        error,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
