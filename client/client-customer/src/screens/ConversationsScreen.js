import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Button, Divider } from 'react-native-paper';
import { List } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import firebaseSDK from '../firebase';
import 'firebase/firestore'


const chatsRef = firebaseSDK.chatsRef()
export default function Conversations(props) {
    const [loading, setLoading] = useState(true)
    const { route, navigation } = props

    const [messages, setMessages] = useState([]) 
    const [conversations, setConversations] = useState([])

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
            // console.log(messages,"<><><><><>")
            setMessages(messages)
        },
        [messages]
    )

    useEffect(() => {
        const messages2 = messages.filter(d => d.user.customer === firebaseSDK.email)
            console.log(messages2,"<-- CONVERSATION");
            var tmp = []
            messages2.forEach(msg => {
                let found = tmp.find(e => e === msg.user.vendor)
                if (!found) {  
                    console.log(found)
                    tmp.push(msg.user.vendor)
                }
                console.log(tmp)
                setConversations(tmp)
            }) 
    }, [messages])

    useEffect(() => {
        console.log("UID-->", firebaseSDK.uid);
        console.log("UID-->", firebaseSDK.displayName);
        console.log("UID-->", firebaseSDK.email);
    }, [])
    useEffect(() => {
        // console.log(conversations,"<-- CONVERSATION");
    }, [conversations])

    const openChat = (vendorEmail) => {
        navigation.navigate('ChatRoom', { vendorEmail, name:vendorEmail })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={conversations}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item._id} onPress={() => openChat(item)}>
                        <View style={styles.row}>
                            <View style={styles.content}>
                                <View style={styles.header}> 
                                    <View style={{flexDirection:'row'}}>
                                        <Avatar.Text size={34} label={item[0]} /> 
                                        <Text style={styles.nameText}>{item}</Text>
                                    </View> 
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <Divider />}
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#dee2eb',
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
        flexDirection: 'column',
        padding: 7,
    },
    nameText: {
        marginLeft:10,
        fontWeight: '600',
        fontSize: 18,
        color: '#000',
        textAlignVertical:'center'
    },
    dateText: {},
    contentText: {
        color: '#949494',
        fontSize: 16,
        marginTop: 2
    }, 
})