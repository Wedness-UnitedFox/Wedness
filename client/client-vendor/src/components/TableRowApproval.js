import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { approveBookings } from '../store/actions/action'

const TableRowApproval = (props) => {

    const { data, id } = props
    const history = useHistory()
    const dispatch = useDispatch()

    const handleApproval = (id) => {
        dispatch(approveBookings(id))
    }  
    return (
        <tr>
            <th scope="row">{id+1}</th>
            <td>{data.Service_name}</td>
            <td>{ !data.isApproved ? "Waiting for Approval" : 'Approved'}</td>
            <td>{data.User.name}</td>
            <td>
                <button disabled={!data.isApproved ? false : true} className="btn btn-outline-info mr-2" onClick={() => { handleApproval(data.id) }}>Approve</button>
            </td>
        </tr>
    )
}

export default TableRowApproval