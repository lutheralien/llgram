import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { Avatar, Box, FlatList, HStack, Spacer, VStack, Text } from 'native-base';
import { messages } from '../../src/constData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FAB } from "@rneui/base";
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { ChatContext } from '../../context/ChatContext';
import UserChat from '../../components/UserChat';
import { AuthContext } from '../../context/AuthContext';

const DashBoardScreen = ({ navigation }) => {
  const { userChats, isUserChatsLoading, chatID, userChatsError } = useContext(ChatContext)
  const { userInfo } = useContext(AuthContext);
  // console.log("userChats", userChats);

  const handlePress = () => {
    console.log('presed');
  }
  return (
    <Box mx={'2.5'}>
      {isUserChatsLoading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
        <Text style={{ color: 'red' }}>Loading..</Text>
      </View>}
      {!isUserChatsLoading && <FlatList data={userChats} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} renderItem={({ item }) =>
          <UserChat chat={item} user={userInfo.user} />
        } keyExtractor={item => item?._id} />}

      <FAB
        style={styles.TouchableOpacityStyle}
        placement="left"
        size="large"
        onPress={() => navigation.navigate('all-users', { name: 'luther' })}
        color='#9993d9'
        icon={<FontAwesomeIcon icon={faFacebookMessenger} size={26} />}
      />
    </Box>

  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 300,
    top: 650,
  },
});
