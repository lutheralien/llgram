import { TouchableOpacity, View } from "react-native";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient"
import { Avatar, Box, HStack, Spacer, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

const UserChat = ({ chat, user }) => {
    const navigation = useNavigation()
    // console.log('chat', chat);
    const { recipientUser } = useFetchRecipientUser(chat, user)
    // console.log('r', recipientUser);
    const { updateCurrentChat } = useContext(ChatContext)
    // console.log('d', userChats);
    const handleData = () => {

        navigation.navigate('message', { titleName: recipientUser?.username, name: recipientUser?.username, recipientId: recipientUser?._id, chatId: chat._id,recipientUserAvatar: recipientUser?.avatar })
        console.log('handle');
        
        updateCurrentChat(chat)
    }

    return (
        <Box borderBottomWidth="4" _dark={{ borderColor: "transparent" }} borderColor="muted.100" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <TouchableOpacity onPress={() => { handleData() }}>
                <HStack space={[2, 3]} justifyContent="space-between">
                    <Avatar size="60px" source={{
                        uri: recipientUser?.avatar
                    }}>Profile
                        {chat?.online && <Avatar.Badge bg="green.500" />}
                    </Avatar>

                    <VStack>
                        <Text _dark={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            {recipientUser?.email}
                        </Text>
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            {chat?.recentText}
                        </Text>
                    </VStack>
                    <Spacer />
                    <VStack space={2} alignItems="center">

                        <Text fontSize="xs" _dark={{
                            color: "warmGray.500"
                        }} color="coolGray.800" alignSelf="flex-start">
                            {chat?.timeStamp}
                        </Text>
                        {chat?.messageCount != 0 && <VStack style={{ backgroundColor: '#e1eaf7', borderRadius: 30, height: 30, width: 30 }} alignItems="center" justifyContent="center">
                            <Text fontSize="xs" bold color={'blue.500'} px={'1'}>
                                {chat?.messageCount}
                            </Text>
                        </VStack>}
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </Box>

    )
}

export default UserChat