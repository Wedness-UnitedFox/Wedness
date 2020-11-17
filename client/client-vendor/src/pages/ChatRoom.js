import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../services/firebase';
import ChatMessage from '../components/ChatMessage';

const auth = firebase.auth()
const firestore = firebase.firestore()


const ChatRoom = () => {
    // function SignIn() {
    //     const email = 'vendor@mail.com'
    //     const password = '123456'

    //     auth.signInWithEmailAndPassword(email, password)
    //     .then(() => {
    //         console.log('Login berhasil')
    //     })
    //     .catch(function(error) {
    //         // Handle Errors here.
    //         var errorMessage = error.message;
    //         var errorCode = error.code;
    //         console.log(errorMessage, errorCode)
    //         // ...
    //     });
    // }

    let { email: customerEmail } = useParams()
    const dummy = useRef()
    const chatRef = firestore.collection('chats')
    const query = chatRef.orderBy('createdAt')

    const [messages, setMessages] = useState([]) 
    const [chats] = useCollectionData(query, {idField: 'id'})
    // const { uid, photoURL, displayName, email } = auth.currentUser;
    
    useEffect(()=>{
        console.log(chats, "chat room")
        const { email } = auth.currentUser
        console.log(email, "email ")
        if(chats){
            // const newMessages = chats.filter(chat => chat.user.uid === uid && chat.user.customer === customerEmail)
            const newMessages = chats.filter(chat => chat.user.vendor === email && chat.user.customer === customerEmail)
            
            setMessages(newMessages)  
        }
    }, [chats, customerEmail])

    // useEffect(() => {
    //     console.log(messages,"<-- masuk state CHATROOM") 
    // }, [messages])

    const [formChat, setFormChat] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();
    
        const { uid, email } = auth.currentUser
        await chatRef.add({
          text: formChat,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          _id : Math.random().toString(36).substring(7),
          user: {
              _id: uid,
              name: email,
              vendor: email,
              customer: customerEmail
          }
        })
        setFormChat('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    return (
        <div class="items-center flex-col " style={{padding:5}}> 
            <div className="border shadow-xs" style={{padding:10}}> 
                <div class="text-2xl mt-1 flex items-center ">
                    <span class="text-gray-700">{customerEmail}</span>
                    <span class="text-green-500">
                        <svg width="10" height="10">
                            <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                        </svg>
                    </span>
                </div>
                <span class="text-lg text-gray-600">Customer</span>
            </div>
            <div>
            <div class="shadow-md" style={{ width: "100%", padding:10}}>
                <div class="overflow-y-scroll scrolling-touch" style={{height:'60vh'}}>
                    {messages && messages.map(chat => <ChatMessage key={chat.id} chat={chat} />)}   
                    <span ref={dummy}></span>
                </div>
                <div className="container mt-3" >
                    <form className="d-flex flex-row justify-content-center" onSubmit={sendMessage}>
                        <div className="form-group mx-sm-0 mb-2" style={{width: "100%"}}>
                            <input type="text" className="form-control" placeholder="Type here..." value={formChat} onChange={e => setFormChat(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary mx-sm-1 mb-2" disabled={!formChat}>Send</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ChatRoom