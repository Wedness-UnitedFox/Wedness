import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TableRow from '../components/TableRow'
import { fetchVenue } from '../store/actions/action'

const Home = () => {

    // const history = useHistory()
    const dispatch = useDispatch()
    const { venue } = useSelector((state) => state)
    
    useEffect(() => {
        dispatch(fetchVenue())
    }, [dispatch])
    
    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Item</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { !venue.data ? null :
                    venue.data.map((data,id) => {
                        return <TableRow key={data.id} data={data} id={id}/>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home