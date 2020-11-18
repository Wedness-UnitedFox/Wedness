import React from 'react'
import { useDispatch } from 'react-redux'
import { approveBookings } from '../store/actions/action'

const TableRowApproval = (props) => {

    const { data, id } = props
    const dispatch = useDispatch()

    const handleApproval = (id) => {
        dispatch(approveBookings(id))
    }
    return (
        <tr class="bg-white border-4 border-gray-200">
            <th class="text-center">{id + 1}</th>
            <td class="text-center">
                {data.Service_name}
            </td>
            <td class="text-center">
                {!data.isApproved ? "Waiting for Approval" : 'Approved'}
            </td>
            <td class="text-center">
                {data.User.name}
            </td>
            <td class="text-center">
                <button disabled={!data.isApproved ? false : true} 
                class={ 
                    data.isApproved ? "bg-yellow-900 items-center text-white px-4 py-2 border rounded-md" :
                     
                    "bg-yellow-700 items-center text-white px-4 py-2 border rounded-md hover:bg-yellow-600 hover:text-black"
                    } onClick={() => { handleApproval(data.id) }}>Approve</button>
            </td>
        </tr>
    )
}

export default TableRowApproval