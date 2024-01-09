import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Avatar, Box, FlatList, HStack, Spacer, VStack } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import UserChat from '../../components/UserChat';

const AllUsersScreen = ({ navigation }) => {
  const { isUserChatsLoading, allUsers,createChat } = useContext(ChatContext)
  const { userInfo } = useContext(AuthContext);

  console.log('allusers', allUsers);
const handleAddChat = (recipientId)=>{
  createChat(recipientId,userInfo.user._id)
}
  return (
    <Box mx={'2.5'}>
      {isUserChatsLoading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
        <Text style={{ color: 'red' }}>Loading..</Text>
      </View>}
      {!isUserChatsLoading && <FlatList data={allUsers} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} renderItem={({ item }) =>
          <Box borderBottomWidth="4" _dark={{ borderColor: "transparent" }} borderColor="muted.100" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <TouchableOpacity onPress={() => { handleAddChat(item?._id)}}>
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar size="60px" source={{
                  uri: item?.avatar
                }}>Profile
                  {item?.online && <Avatar.Badge bg="green.500" />}
                </Avatar>

                <VStack>
                  <Text _dark={{
                    color: "warmGray.50"
                  }} color="coolGray.800" bold>
                    {item?.email}
                  </Text>

                </VStack>
                <Spacer />

              </HStack>
            </TouchableOpacity>
          </Box>
        } keyExtractor={item => item?._id} />}

    </Box>
  )
}

export default AllUsersScreen

const styles = StyleSheet.create({})