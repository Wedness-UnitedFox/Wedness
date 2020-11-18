import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TableRowApproval from '../components/TableRowApproval';
import { fetchBookingApprovals } from '../store/actions/action';

export default function Approval() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { bookingApprovals } = useSelector(state => state)

  useEffect(() => {
    if (!localStorage.access_token) history.push('/login')
  }, [])

  useEffect(() => {
    dispatch(fetchBookingApprovals())
  }, [])

  return (
    <div>
      <table class="min-w-full table-auto">
        <thead class="justify-between">
          <tr class="bg-gray-800">
            <th class="px-16 py-2 text-gray-300 text-center">
              No
            </th>
            <th class="px-16 py-2 text-gray-300 text-center">
              Name
            </th>
            <th class="px-16 py-2 text-gray-300 text-center">
              Status
            </th>
            <th class="px-16 py-2 text-gray-300 text-center">
              Booked by
            </th>
            <th class="px-16 py-2 text-gray-300 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bookingApprovals?.map((data, id) => {
            return <TableRowApproval key={`${data.id}${data.vendor_type}`} data={data} id={id} />
          })}
        </tbody>
      </table>
    </div>
  )
}