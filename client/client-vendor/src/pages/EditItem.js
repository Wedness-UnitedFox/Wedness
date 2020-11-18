import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editItem } from '../store/actions/action'

export default function EditItem() {
    const { id, service_type } = useParams()
    const { service, loading } = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()

    // console.log(service, loading)

    const [update, setUpdate] = useState({})

    useEffect(() => {
        setUpdate(service)
    }, [])

    useEffect(() => {
        if (!localStorage.access_token) history.push('/login')
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "price") e.target.value = +e.target.value
        if (e.target.name === "capacity") e.target.value = +e.target.value
        setUpdate({ ...update, [e.target.name]: e.target.value })
    }

    const handleEdit = () => {
        dispatch(editItem(id, service_type, update))
        history.push('/')
    };

    const handleCancel = () => {
        history.push('/')
    };

    return (
        <div>
            <div class="antialiased text-gray-900">
                <div class="mx-4 card bg-white p-10 md:rounded-lg my-8 mx-auto" style={{ width: 600 }}>
                    <div class="title">
                        <h3 class="text-2xl text-gray-900 font-semibold">Edit {update.service_type}</h3>
                    </div>
                    <form onSubmit={handleEdit}>
                        <div class="options md:flex md:space-x-6 text-sm items-center text-gray-700 mt-4">
                            <h2 class="w-1/2 mb-2 text-gray-900">Services type: </h2>
                            <select required class="w-full border border-gray-200 p-2 focus:outline-none focus:border-gray-500" onChange={handleChange} name="service_type" disabled={true}>
                                <option>Choose Vendor Type</option>
                                <option value="venue" selected={update.service_type === 'venue' ? true : false}>Venue</option>
                                <option value="catering" selected={update.service_type === 'catering' ? true : false}>Catering</option>
                                <option value="organizer" selected={update.service_type === 'organizer' ? true : false}>Organizer</option>
                            </select>
                        </div>
                        <input
                            class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800"
                            label="Name"
                            name="name"
                            type="text"
                            value={update.name}
                            onChange={handleChange}
                            required
                        />
                        <div class="flex space-x-5 mt-3">
                        <input
                            class="border p-2  w-1/2 text-gray-500 focus:text-gray-800"
                            label="Email"
                            name="email"
                            type="email"
                            value={update.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            class="border p-2  w-1/2 text-gray-500 focus:text-gray-800"
                            label="Phone Number"
                            name="phone_number"
                            type="text"
                            value={update.phone_number}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <input
                            class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800"
                            label="Address"
                            name="address"
                            type="text"
                            value={update.address}
                            onChange={handleChange}
                            required
                        />
                        <input
                            class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800"
                            label="Price"
                            name="price"
                            type="number"
                            min="0"
                            value={update.price}
                            onChange={handleChange}
                            required
                        />
                        {service_type === 'venue' ?
                            <div class="flex flex-col text-sm">
                                <><select required class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800" onChange={handleChange} name="type">
                                    <option default value="">Choose Venue Type</option>
                                    <option value="indoor" selected={update.type === 'indoor' ? true : false}>Indoor</option>
                                    <option value="outdoor" selected={update.type === 'outdoor' ? true : false}>Outdoor</option>
                                </select>
                                    <input
                                        class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800"
                                        label="Type"
                                        name="capacity"
                                        type="number"
                                        min="0"
                                        value={update.capacity}
                                        onChange={handleChange}
                                        required
                                    /></>
                            </div>
                            : ""
                        }
                        <input
                            class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800"
                            label="Avatar"
                            name="avatar"
                            type="text"
                            value={update.avatar}
                            onChange={handleChange}
                            required
                        />
                        <textarea cols="10" rows="4"
                            class="border p-2 w-full mt-3 text-gray-500 focus:text-gray-800"
                            label="Description"
                            name="description"
                            type="text"
                            value={update.description}
                            onChange={handleChange}
                            row="3"
                            required
                        />
                        <button type="submit" class=" w-full bg-green-600 shadow-lg text-white px-4 py-2 hover:bg-green-700 mt-8 text-center font-semibold focus:outline-none">
                            Submit
                        </button>

                    </form>
                    <button class=" w-full bg-gray-400 shadow-lg text-white px-4 py-2 hover:bg-gray-700 mt-8 text-center font-semibold focus:outline-none" onClick={() => handleCancel()}>Cancel</button>

                </div>
            </div>
        </div>
    )
}