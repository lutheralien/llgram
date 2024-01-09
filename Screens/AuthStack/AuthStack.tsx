import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from './DashBoardScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from './SettingsScreen';
import CustomDrawer from '../../components/CustomDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import AllUsersScreen from './AllUsersScreen';
import { Pressable } from 'react-native';
import MessageScreen from './MessageScreen';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { ChatContextProvider } from '../../context/ChatContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {userInfo} = useContext(AuthContext)
  return (
    <ChatContextProvider user={userInfo.user}>
    <Stack.Navigator>
      <Stack.Screen name="dashboard" component={DashBoardScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="all-users" component={AllUsersScreen} />
    <Stack.Screen name="message" component={MessageScreen} options={({route})=>({
      title: route.params.titleName
    })}/>
    </Stack.Navigator>
    </ChatContextProvider>
  );
};

export default AuthStack;
