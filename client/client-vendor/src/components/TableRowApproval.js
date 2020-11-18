import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { approveBookings } from '../store/actions/action'
import firebase from '../services/firebase';
const firestore = firebase.firestore()


const TableRowApproval = (props) => {

    const { data, id } = props
    let customerEmail = data.User.email
    const dispatch = useDispatch()
    const [expoToken, setExpoToken] = useState('')

    useEffect(() => {
        const userRef = firestore.collection('users').doc(customerEmail)
        userRef.get()
        .then(doc => {
            if(doc.exists){
                console.log(doc.data(), "userRef");
                setExpoToken(doc.data().token)
            }
            else{
                console.log("Kosong")
            }
        })
        .catch(err => console.log(err))
    }, [customerEmail])

    const handleApproval = async (id) => {
        dispatch(approveBookings(id))
        const input = {
            name: data.Service_name,
            content: `${data.Service_name} has approved your reservation.`
        }
        if(expoToken){
            await sendPushNotification(expoToken, input)
        }

    }
    return (
        <tr class="bg-white border-4 border-gray-200">
            <th class="px-16 py-2">{id + 1}</th>
            <td>
                <span class="px-16 py-2">{data.Service_name}</span>
            </td>
            <td>
                <span class="px-16 py-2">{!data.isApproved ? "Waiting for Approval" : 'Approved'}</span>
            </td>
            <td>
                <span class="px-16 py-2">{data.User.name}</span>
            </td>
            <td>
                <span class="px-16 py-2">{data.createdAt.slice(0, 10)}</span>
            </td>
            <td>
                <button disabled={!data.isApproved ? false : true} class="bg-yellow-900 items-center text-white px-4 py-2 border rounded-md hover:bg-yellow-700 hover:text-black" onClick={() => { handleApproval(data.id) }}>Approve</button>
            </td>
        </tr>
    )
}

export default TableRowApproval

const sendPushNotification = async (expoPushToken, input) => {
    // const { email, chat } = input
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: input.name,
      body: input.content,
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      'mode': 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}