import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addItem } from '../store/actions/action';

const AddNew = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [inputNew, setNew] = useState([])
    const [vendorType, setVendorType] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        if (!localStorage.access_token) history.push('/login')
    }, [])

    const handleNew = (e) => {
        e.preventDefault();
        inputNew.avatar = image
        if (inputNew.service_type !== ""){
            // console.log(inputNew, "<<<<<<page handle Add");
            dispatch(addItem(inputNew, vendorType))
            history.push('/')
        }
    };

    const handleCancel = (e) => {
        e.preventDefault()
        history.push('/')
    };

    const handlePhoto = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'frfd811y')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/safruls/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()
        console.log(file, "after uploaded to cloudinary")
        if(file.secure_url) setImage(file.secure_url)
        else console.log("Error during upload")
        
    }

    const handleChange = (e) => {
        if (e.target.name === "price") e.target.value = +e.target.value
        if (e.target.name === "service_type") setVendorType(e.target.value)
        setNew({ ...inputNew, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div class="antialiased text-gray-900">
                <div class="mx-4 card bg-white p-10 md:rounded-lg my-8 mx-auto" style={{ width: 600 }}>
                    <div class="title">
                        <h3 class="text-2xl text-gray-900 font-semibold">Add Your Services Here!</h3>
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
                        <input placeholder="Photo Url" class="border p-2 w-full mt-3" 
                            name="avatar"
                            type="file"
                            onChange={handlePhoto}
                            style={{overflow: "hidden"}}
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
                        <div class="submit">
                            <button type="submit" class=" w-full bg-blue-600 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none ">Submit</button>
                        </div>
                        <div class="submit">
                            <button type="button" onClick={handleCancel} class=" w-full bg-gray-900 shadow-lg text-white px-4 py-2 hover:bg-blue-700 mt-8 text-center font-semibold focus:outline-none ">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNew
