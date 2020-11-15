import React, { useState, useCallback, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import firebaseConfig from '../firebase'
import * as firebase from 'firebase';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Button } from 'react-native-paper';
import firebaseSDK from '../firebase';
export default function Conversations(props) { 
    const [loading, setLoading] = useState(true)
    const { route, navigation } = props 
    const [messages, setMessages] = useState([
        {
            name: 'Jono'
        },
        {
            name: 'Joni'
        }
    ])
    useEffect(() => {
        console.log("UID-->",firebaseSDK.uid);
        console.log("UID-->",firebaseSDK.displayName);
        console.log("UID-->",firebaseSDK.email);
    }, [])
    const createChat = () => {   
        firestore()
        .collection('chats')
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
    const openChat = (name) => {
        navigation.navigate('ChatRoom', { name })
    }
    

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openChat(item.name)}>
                        <View style={styles.row}>
                            <View style={styles.content}>
                                <View style={styles.header}>
                                    <Text style={styles.nameText}>{item.name}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <Separator />}
            /> 
        </View>
    )
}

function Separator() {
    return <View style={styles.separator} />
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dee2eb',
        marginTop: 70
    },
    title: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 28,
        fontWeight: '500'
    },
    row: {
        paddingRight: 10,
        paddingLeft: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flexShrink: 1
    },
    header: {
        flexDirection: 'row'
    },
    nameText: {
        fontWeight: '600',
        fontSize: 18,
        color: '#000'
    },
    dateText: {},
    contentText: {
        color: '#949494',
        fontSize: 16,
        marginTop: 2
    },
    separator: {
        backgroundColor: '#555',
        height: 0.5,
        flex: 1
    }
})