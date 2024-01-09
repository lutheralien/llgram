import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useLayoutEffect, useState } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleDown, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ChatContext } from '../../context/ChatContext';

const MessageScreen = ({ route, navigation }) => {
    const { name,recipientId,chatId } = route.params;
  const { userInfo } = useContext(AuthContext);
  const {messages, setMessages} = useContext(ChatContext)
    console.log(name, recipientId,userInfo.user._id, chatId);
    
  useLayoutEffect(() => {
    

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://res.cloudinary.com/dyeftbxjw/image/upload/v1704140193/avatar/default.png',
        },
      },
      {
        _id: 2,
        text: 'Hello sup',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://res.cloudinary.com/dyeftbxjw/image/upload/v1704140193/avatar/default.png',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])
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
    // <View>
    //     <Text>{name}</Text>
    //     <Text>{recipientId}</Text>
    //     <Text>{userInfo.user._id}</Text>
    // </View>

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