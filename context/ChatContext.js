import {createContext, useCallback, useEffect, useState} from 'react';
import {BaseURL, getRequest, postRequest} from '../services';

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setmessagesError] = useState(null);
  const [chatID, setchatID] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getRequest(`${BaseURL}/api/v1/user/users`);
        //   console.log(response.data)
        const pChats = response.data.filter(u => {
          let isChatCreated = false;

          if (user._id === u._id) return false;

          if (userChats) {
            isChatCreated = userChats.some(chat => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }
          return !isChatCreated;
        });
        setAllUsers(pChats);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(
          `${BaseURL}/api/v1/chat/find-chat/${user._id}`,
        );
        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }
        // console.log(response.data);
        setUserChats(response.data);
      }
    };
    getUserChats();
  }, [user]);

  const createChat = useCallback(async (first, second) => {
    try {
      const data = {_id_1: first, _id_2: second};
    //   console.log(data);
      const response = await postRequest(
        `${BaseURL}/api/v1/chat/create-chat`,
        JSON.stringify(data),
      );
      console.log('response.data', response.data);
    //   console.log('chat ID', response.data.response._id);
      setchatID(response.data.response._id);
      setUserChats(prev => [...prev, response.data.response]);
    } catch (error) {
      console.log('error happening here');
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    const getMessages = async () => {
        try {
          setIsMessagesLoading(true);
          setMessages(null);
          const response = await getRequest(
            `${BaseURL}/api/v1/message/get-all-messages/${currentChat._id}`,
          );
            console.log('msgsswdw', messages);
             console.log(Array.isArray(messages));
          setMessages(response.data.messages)
          setIsMessagesLoading(false);

        } catch (error) {
          console.log(error);
          setmessagesError(null);
        }
      };
      getMessages()
  },[currentChat])

  const updateCurrentChat = useCallback((chat)=>{
    setCurrentChat(chat)
  },[])
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        allUsers,
        createChat,
        updateCurrentChat,
        chatID,
        messages,
        setMessages
      }}>
      {children}
    </ChatContext.Provider>
  );
};
