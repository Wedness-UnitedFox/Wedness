import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addItem } from '../store/actions/action';

const AddNew = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [inputNew, setNew] = useState([])
    const [vendorType, setVendorType] = useState("")

    const handleNew = (e) => {
        e.preventDefault();
        if (inputNew.service_type !== "")
            console.log(inputNew, "<<<<<<page handle Add");
        dispatch(addItem(inputNew, vendorType))
        history.push('/home')
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/home')
    };

    const handleChange = (e) => {
        if (e.target.name === "price") e.target.value = +e.target.value
        if (e.target.name === "service_type") setVendorType(e.target.value)
        setNew({ ...inputNew, [e.target.name]: e.target.value });
    };

    return (
        // <div className="container shadow">
        //     <h3 className="text-center">Add New Item</h3>
        //     <div className="container mt-3">
        //         <form onSubmit={handleNew}>
        //             <select required className="form-control" onChange={handleChange} name="service_type">
        //                 <option>Choose Vendor Type</option>
        //                 <option value="venue">Venue</option>
        //                 <option value="catering">Catering</option>
        //                 <option value="organizer">Organizer</option>
        //             </select>
        //             <div className="form-group">
        //                 <input
        //                     className="form-control"
        //                     label="Name"
        //                     name="name"
        //                     type="text"
        //                     placeholder="Input Name"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 <input
        //                     className="form-control"
        //                     label="Description"
        //                     name="description"
        //                     type="text"
        //                     placeholder="Input Description"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 <input
        //                     className="form-control"
        //                     label="Email"
        //                     name="email"
        //                     type="email"
        //                     placeholder="Input Email"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 <input
        //                     className="form-control"
        //                     label="Address"
        //                     name="address"
        //                     type="text"
        //                     placeholder="Input Address"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 <input
        //                     className="form-control"
        //                     label="Phone Number"
        //                     name="phone_number"
        //                     type="text"
        //                     placeholder="Input Phone Number"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 <input
        //                     className="form-control"
        //                     label="Price"
        //                     name="price"
        //                     type="number"
        //                     placeholder="Input Price"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 {vendorType === 'venue' ?
        //                 <><select required className="form-control" onChange={handleChange} name="type">
        //                     <option default value="">Choose Venue Type</option>
        //                     <option value="indoor">Indoor</option>
        //                     <option value="outdoor">Outdoor</option>
        //                 </select>
        //                 <input
        //                     className="form-control"
        //                     label="Type"
        //                     name="capacity"
        //                     type="number"
        //                     placeholder="Input Capacity"
        //                     onChange={handleChange}
        //                     required
        //                 /></>
        //                 : ""
        //                 }
        //                 <input
        //                     className="form-control"
        //                     label="Avatar"
        //                     name="avatar"
        //                     type="text"
        //                     placeholder="Input Photo"
        //                     onChange={handleChange}
        //                     required
        //                 />
        //                 <button type="submit" className="btn btn-primary">
        //                     Submit
        //                 </button>
        //             </div>
        //         </form>
        //         <button className="btn btn-info" onClick={(e) => handleCancel(e)}>Cancel</button>
        //     </div>
        // </div>

        <div>
            <div class="antialiased text-gray-900">
                <div class="mx-4 card bg-white p-10 md:rounded-lg my-8 mx-auto" style={{ width: 600 }}>
                    <div class="title">
                        <h3 class="text-2xl text-gray-900 font-semibold">Add Your Services Here!</h3>
                        {/* <h1 class="font-bold text-center">Add Your Services Here!</h1> */}
                    </div>
                    <form onSubmit={handleNew} >
                        <div class="options md:flex md:space-x-6 text-sm items-center text-gray-700 mt-4">
                            <h2 class="w-1/2 mb-2 text-gray-900">Services type: </h2>
                            <select class="w-full border border-gray-200 p-2 focus:outline-none focus:border-gray-500" onChange={handleChange} name="service_type" required>
                                <option>Choose Vendor Type</option>
                                <option value="venue">Venue</option>
                                <option value="catering">Catering</option>
                                <option value="organizer">Organizer</option>
                            </select>
                        </div>
                        <input placeholder="Service Name" class="border p-2 w-full mt-3" name="name"
                            type="text"
                            onChange={handleChange}
                            required />
                        <div class="flex space-x-5 mt-3">
                            <input type="email" placeholder="Your Email" class="border p-2  w-1/2"
                                name="email"
                                onChange={handleChange}
                                required />
                            <input type="tel" placeholder="Your Number" class="border p-2 w-1/2"
                                name="phone_number"
                                onChange={handleChange}
                                required />
                        </div>
                        <textarea cols="10" rows="2" placeholder="Your address" class="border p-2 mt-3 w-full"
                            name="address"
                            type="text"
                            onChange={handleChange}
                            required ></textarea> 
                        <input placeholder="Price" class="border p-2 w-full mt-3" name="price"
                            type="number"
                            onChange={handleChange}
                            required />
                        <input placeholder="Photo Url" class="border p-2 w-full mt-3" name="avatar"
                            type="text"
                            onChange={handleChange}
                            required />


                        <textarea cols="10" rows="4" placeholder="Descriptions of your product" class="border p-2 mt-3 w-full"
                            name="description"
                            type="text"
                            onChange={handleChange}
                            required ></textarea> 

                            {vendorType === 'venue' ?
                                <div class="flex flex-col text-sm">
                                    <label class="font-bold mb-2">Venue Type</label>
                                    <select required class="w-full border border-gray-200 p-2 focus:outline-none focus:border-gray-500" onChange={handleChange} name="type">
                                        <option default value="">Choose Venue Type</option>
                                        <option value="indoor">Indoor</option>
                                        <option value="outdoor">Outdoor</option>
                                    </select>
                                    <label class="font-bold mb-2">Capacity</label>
                                    <input
                                        class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                        label="Type"
                                        name="capacity"
                                        type="number"
                                        placeholder="Input Capacity"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                : ""
                            }

                        <div class="form mt-4">
                            {/* <div class="flex flex-col text-sm">
                                <label for="title" class="font-bold mb-2 mt-2">Title</label>
                                <input class="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    label="Name"
                                    name="name"
                                    type="text"
                                    placeholder="Input Name"
                                    onChange={handleChange}
                                    required />
                            </div> */}
                            {/* <div class="flex flex-col text-sm">
                                <label for="title" class="font-bold mb-2 mt-2">Email</label>
                                <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Input Email"
                                    onChange={handleChange}
                                    required />
                            </div> */}
                            {/* <div class="flex flex-col text-sm">
                                <label for="title" class="font-bold mb-2 mt-2">Address</label>
                                <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    label="Address"
                                    name="address"
                                    type="text"
                                    placeholder="Input Address"
                                    onChange={handleChange}
                                    required />
                            </div> */}
                            {/* <div class="flex flex-col text-sm">
                                <label for="title" class="font-bold mb-2 mt-2">Phone Number</label>
                                <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    label="Phone Number"
                                    name="phone_number"
                                    type="text"
                                    placeholder="Input Phone Number"
                                    onChange={handleChange}
                                    required />
                            </div> */}
                            {/* <div class="flex flex-col text-sm">
                                <label for="title" class="font-bold mb-2 mt-2">Price</label>
                                <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    placeholder="Input Price"
                                    onChange={handleChange}
                                    required />
                            </div> */}
                            {/* <div class="flex flex-col text-sm">
                                <label for="title" class="font-bold mb-2 mt-2">Photo</label>
                                <input class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                    label="Avatar"
                                    name="avatar"
                                    type="text"
                                    placeholder="Input Photo"
                                    onChange={handleChange}
                                    required />
                            </div>
                            {vendorType === 'venue' ?
                                <div class="flex flex-col text-sm">
                                    <label class="font-bold mb-2">Venue Type</label>
                                    <select required class="w-full border border-gray-200 p-2 focus:outline-none focus:border-gray-500" onChange={handleChange} name="type">
                                        <option default value="">Choose Venue Type</option>
                                        <option value="indoor">Indoor</option>
                                        <option value="outdoor">Outdoor</option>
                                    </select>
                                    <label class="font-bold mb-2">Capacity</label>
                                    <input
                                        class=" appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500"
                                        label="Type"
                                        name="capacity"
                                        type="number"
                                        placeholder="Input Capacity"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                : ""
                            }
                            <div class="text-sm flex flex-col">
                                <label for="description" class="font-bold mt-2 mb-2">Description</label>
                                <textarea class=" appearance-none w-full border border-gray-200 p-2 h-40 focus:outline-none focus:border-gray-500"
                                    label="Description"
                                    name="description"
                                    type="text"
                                    placeholder="Input Description"
                                    onChange={handleChange}
                                    required>
                                </textarea>
                            </div> */}
                        </div>

                        <div class="submit">
                            <button type="submit" class=" w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNew
