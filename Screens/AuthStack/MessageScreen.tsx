import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleDown, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ChatContext } from '../../context/ChatContext';
import { BaseURL, getRequest, postRequest } from '../../services';
import axios from 'axios';

const MessageScreen = ({ route, navigation }) => {
    const { name,recipientId,chatId,recipientUserAvatar } = route.params;
  const { userInfo } = useContext(AuthContext);
  const {messages, setMessages} = useContext(ChatContext)
    // console.log(name, recipientId,userInfo.user._id, chatId,recipientUserAvatar);
   
    
    useEffect(() => {
    // setMessages(newArr)
    
  }, [])

  const onSend = useCallback(async(messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const data = messages[0]
    data.senderId =  userInfo.user._id
    data.chatId =  chatId
    console.log('data',data);
    
    try {
      const response = await postRequest(
        `${BaseURL}/api/v1/message/create-message`,
        JSON.stringify(data),
      );
      console.log('rD',response.data.response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    
    
}, []);
    const renderSend = (props) => {
        return(
            <Send {...props}>
                <View>
                    <FontAwesomeIcon icon={faCircleArrowRight} size={32} color='blue' style={{marginBottom: 5, marginRight: 5}}/>
                </View>
            </Send>
        )
    }
  const renderBubble = (props) => {
    return (
        <Bubble {...props} wrapperStyle={{
            right: {
                backgroundColor: 'blue'
            },
            left: {
                backgroundColor: 'pink'
            }
        }} 
        textStyle={{
            right: {
                color: 'white'
            },
            left: {
                color: 'black'
            }
        }}
        />
    )
  }
  const scrollToBottomComponent = (props)=>{
    return (
        <FontAwesomeIcon icon={faAngleDoubleDown} size={22} color='brown'/>
    )
  }
  return (
     <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
    renderBubble={renderBubble}
    renderSend={renderSend}
    listViewProps={{showsVerticalScrollIndicator: false}}
    scrollToBottom
    scrollToBottomComponent={scrollToBottomComponent}
  />
  )
}

export default MessageScreen

const styles = StyleSheet.create({})