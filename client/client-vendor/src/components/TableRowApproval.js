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