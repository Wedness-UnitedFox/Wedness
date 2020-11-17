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
    <table class="min-w-full table-auto">
      <thead class="justify-between">
        <tr class="bg-gray-800">
          <th class="px-16 py-2">
            <span class="text-gray-300">No</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Name</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Status</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Booked by</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-300">Action</span>
          </th>
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