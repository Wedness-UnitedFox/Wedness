import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TableRow from '../components/TableRow'
import { fetchServices } from '../store/actions/action'

const Home = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const { services, loading, error } = useSelector((state) => state)

    useEffect(() => { 
        if (!localStorage.access_token) history.push('/login')
        else dispatch(fetchServices())
    }, [])

    // console.log(services, "hasil ngefetch nih")

    if (loading) return <p>Loading....</p>
    if (error) return <p>Error!</p>

    return (
        <div>
            {/* <pre>{JSON.stringify(services, null, 2)}</pre> */}
            <div >
                <table class="table-auto  w-full" >
                    <thead class="justify-between">
                        <tr class="bg-gray-800 text-center">
                            <th class="px-10 py-2 text-center text-gray-300" >
                                No
                            </th>
                            <th class="px-16 py-2 text-center text-gray-300">
                                Item
                            </th>
                            <th class="px-16 py-2 text-center text-gray-300">
                                Name
                            </th>
                            <th class="px-16 py-2 text-center text-gray-300">
                                Price
                            </th>

                            <th class="px-16 py-2 text-center text-gray-300">
                                Category
                            </th>

                            <th class="px-16 py-2 text-center text-gray-300">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-200">
                        {services.length > 0 ? services.map((data, id) => {
                            return <TableRow key={`${data.id}${data.service_type}${data.name}`} data={data} id={id} />
                        }) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home