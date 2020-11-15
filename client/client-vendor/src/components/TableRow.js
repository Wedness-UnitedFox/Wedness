import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteItem } from '../store/actions/action'

const TableRow = (props) => {

    const { data,id } = props
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDetail = (e, id) => {
        e.preventDefault()
        history.push('/vendor/venue/' + id)
    }
    const handleDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteItem(id))
    }

    return (
        <tr>
            <th scope="row">{id+1}</th>
            <td><img className="img-thumbnail" style={{ width: "150px" }} src={data.avatar} alt="..." /></td>
            <td>{data.name}</td>
            <td>{data.price.toLocaleString()}</td>
            <td>{data.phone_number}</td>
            <td>
                <button className="btn btn-outline-info mr-2" onClick={(e) => { handleDetail(e, data.id) }}>Detail</button>
                <button className="btn btn-outline-danger" onClick={(e) => { handleDelete(e, data.id) }}
                >Delete</button>
            </td>
        </tr>
    )
}

export default TableRow