import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableRowApproval from '../components/TableRowApproval';
import { fetchBookingApprovals } from '../store/actions/action';

export default function Approval () {
  const dispatch = useDispatch()
  const { bookingApprovals } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchBookingApprovals())
  }, [])

  return (
    <div>
    {/* <h1>This is Approval</h1>
    <pre>{JSON.stringify(bookingApprovals, null, 2)}</pre> */}
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Booked by</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {bookingApprovals?.map((data,id) => {
          return <TableRowApproval key={`${data.id}${data.vendor_type}`} data={data} id={id}/>
        })}
      </tbody>
    </table>
    </div>
  )
}