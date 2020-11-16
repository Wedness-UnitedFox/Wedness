import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteItem, editItem } from '../store/actions/action'

const TableRow = (props) => {

    const { data,id } = props
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDetail = (e, id, service_type) => {
        e.preventDefault()
        history.push(`/vendor/${service_type}/` + id)
        dispatch(editItem(id, service_type))
    }
    const handleDelete = (e, id, service_type) => {
        e.preventDefault()
        dispatch(deleteItem(id, service_type))
    }  
    return (
        <tr>
            <th scope="row">{id+1}</th>
            <td><img className="img-thumbnail" style={{ width: "150px" }} src={data.avatar} alt="..." /></td>
            <td>{data.name}</td>
            <td>Rp. {data.price.toLocaleString("ID")}</td>
            <td>{data.phone_number}</td>
            <td>
                <button className="btn btn-outline-info mr-2" onClick={(e) => { handleDetail(e, data.id, data.service_type) }}>Detail</button>
                <button className="btn btn-outline-danger" onClick={(e) => { handleDelete(e, data.id, data.service_type) }}
                >Delete</button>
            </td>
        </tr>
    )
}

export default TableRow