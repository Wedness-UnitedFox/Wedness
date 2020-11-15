import React, { useState, useCallback, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import firebaseSDK from '../firebase'
import * as firebase from 'firebase';
import { View, Text } from 'react-native'

import { GiftedChat } from 'react-native-gifted-chat'

const chatsRef = firebaseSDK.chatsRef
export default function Chat(props) {
  const { route, navigation } = props
  const [messages, setMessages] = useState([]);
  const { chatId } = route.params;
  const [chatID, setChatID] = useState(chatId)
  // if (!chatID) { 
  //   firebaseSDK.db.collection('chats')
  // }

  const user = {
    name: 'jojo',
    id: firebaseSDK.uid,
    _id: firebaseSDK.uid
  }

  useEffect(() => {
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data()
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )


  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
        setUser(JSON.parse(user))
    }
  }
  const handlePress = async () => {
      const _id = firebaseSDK.uid
      const name = firebaseSDK.displayName
      const user = { _id, name }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
  }
  const handleSend = async(messages) => {
      const writes = messages.map((m) => chatsRef.add(m))
      await Promise.all(writes)
  }

  handleButtonPress = () => {
    if (roomName.length > 0) {
      // create new thread using firebase & firestore
      firestore()
        .collection('MESSAGE_THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime()
          }
        })
        .then(() => {
          navigation.navigate('ChatRoom')
        })
    }
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  useEffect(() => {
    console.log({ chatId });
  }, [])
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  return (
    // <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user}
    />
    // </View>
  );
}
