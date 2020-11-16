// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, LogBox } from 'react-native'
import * as firebase from 'firebase'
import firebaseSDK, { config } from '../firebase'
import 'firebase/firestore'

const chatsRef = firebaseSDK.chatsRef()

export default function App(props) {
  const { params } = props.route 
  console.log({params});
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  const vendorEmail = params?.vendorEmail 

  const userData = {
    _id: firebaseSDK.uid,
    name: firebaseSDK.email,
    customer: firebaseSDK.email,
    vendor: vendorEmail,
  }

  useEffect(() => {
    // readUser()
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
      console.log(messages, "<------messagesss");
      const messages2 = messages.filter(d => d.user.customer === firebaseSDK.email && d.user.vendor === vendorEmail)
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages2))
    },
    [messages]
  )
  async function handleSend(messages) {
    const writes = messages.map((m) => {
      chatsRef.add(m)
    }
    )
    await Promise.all(writes)
  }

  return <GiftedChat messages={messages} user={userData} onSend={handleSend} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
})
