import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import firebase from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const auth = firebase.auth()
const firestore = firebase.firestore()

const ChatConversations = () => {
    // const history = useHistory()
    const { path, url } = useRouteMatch()

    const chatRef = firestore.collection('chats')
    const query = chatRef.orderBy('createdAt')
    const [chats] = useCollectionData(query, { idField: 'id' })
    const [conversationNames, setConversationNames] = useState([])


    useEffect(() => {
        console.log(chats?.length, "<<<<<<<<< CHATS");
        const newChat = chats?.filter(d => d.user.vendor === auth.currentUser.email)
        let conversations = []
        console.log("chats", chats?.length);
        if (chats) {
            newChat.forEach(chat => {
                let found = conversations.find(e => e === chat.user.customer)
                if (!found) {
                    conversations.push(chat.user.customer)
                }
            })
            console.log(conversations)
            setConversationNames(conversations)
        }
    }, [chats])

    return (
        <div className="flex justify-center" style={{width:'100%'}}>
            <div className="flex flex-row flex-wrap" style={{ padding: 20}}>
                <div className=" flex-col" style={{ padding: 20}}>
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th class="px-6 py-3 text-center text-xs leading-4 font-medium text-black-500 uppercase tracking-wider">
                                                Conversations
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200"> 
                                        {conversationNames?.length === 0 ? null :
                                            conversationNames.map(name => (
                                                // return <li><Link to={`${url}/${name}`}>{name}</Link></li>
                                                <tr>
                                                <Link to={`${url}/${name}`}>
                                                    <td class="px-6 py-4 whitespace-no-wrap">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 h-10 w-10">
                                                                <img class="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${name}`} alt="" />
                                                            </div>
                                                            <div class="ml-4">
                                                                <div class="text-sm leading-5 font-medium text-gray-900">
                                                                    {name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </Link>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-auto" style={{width:500}}>
                    <Switch>
                        <Route path={`${path}/:email`} component={ChatRoom} />
                    </Switch>
                </div>
            </div>
        </div>

    )
}

export default ChatConversations