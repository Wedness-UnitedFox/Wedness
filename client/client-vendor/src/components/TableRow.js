import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteItem, fetchServiceById } from '../store/actions/action'
import swal from 'sweetalert';


const TableRow = (props) => {

    const { data, id } = props
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDetail = (id) => {
        history.push(`/vendor/${data.service_type}/${id}`)
        // dispatch(fetchServiceById(id, data.service_type))
    }
    const handleDelete = (e, id, service_type) => {
        e.preventDefault()
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to undo this",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Delete Successfully!", {
                icon: "success",
              });
              dispatch(deleteItem(id, service_type))
            } else {
              swal("Delete Canceled");
            }
          });
    }
    return (
        <tr class="bg-white border-4 border-gray-200 text-center">
            <td style={{maxWidth:10}}>
                {id + 1} 
            </td>
            <td class="flex justify-self-center-1">
                <img
                    class="flex-none px-4 py-2 m-2"
                    src={data.avatar}
                    alt=""
                    style={{maxWidth:250}}
                />
            </td>
            <td class="text-center ml-2 font-semibold">
                {data.name}
            </td>
            <td class="px-16 py-2 text-center">
                Rp. {data.price?.toLocaleString("ID")}
            </td>
            <td class="px-16 py-2 text-center">
                {data.service_type}
            </td>
            <td class="px-16 py-2">
                <button class="bg-yellow-900 text-white px-4 py-2 border rounded-md hover:bg-yellow-700 hover:text-black"
                    onClick={() => { handleDetail(data.id) }}>
                    Detail
                </button>
                <button class="bg-yellow-900 text-white px-4 py-2 border rounded-md hover:bg-white hover:bg-yellow-700 hover:text-black"
                    onClick={(e) => { handleDelete(e, data.id, data.service_type) }}>
                    Delete
                </button>
            </td>
        </tr>

    )
}

export default TableRow