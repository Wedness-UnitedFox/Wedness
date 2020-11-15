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
        history.push('/')
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/')
    };

    const handleChange = (e) => {
        if (e.target.name === "price") e.target.value = +e.target.value
        if (e.target.name === "service_type") setVendorType(e.target.value)
        setNew({ ...inputNew, [e.target.name]: e.target.value });
    };

    return (
        <div className="container shadow">
            <h3 className="text-center">Add New Item</h3>
            <div className="container mt-3">
                <form onSubmit={handleNew}>
                    <select required className="form-control" onChange={handleChange} name="service_type">
                        <option>Choose Vendor Type</option>
                        <option value="venue">Venue</option>
                        <option value="catering">Catering</option>
                        <option value="organizer">Organizer</option>
                    </select>
                    <div className="form-group">
                        <input
                            className="form-control"
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Input Name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Input Description"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Input Email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Address"
                            name="address"
                            type="text"
                            placeholder="Input Address"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Phone Number"
                            name="phone_number"
                            type="text"
                            placeholder="Input Phone Number"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Price"
                            name="price"
                            type="number"
                            placeholder="Input Price"
                            onChange={handleChange}
                            required
                        />
                        {vendorType === 'venue' ?
                            <><select required className="form-control" onChange={handleChange} name="type">
                                <option default value="">Choose Venue Type</option>
                                <option value="indoor">Indoor</option>
                                <option value="outdoor">Outdoor</option>
                            </select>
                                <input
                                    className="form-control"
                                    label="Type"
                                    name="capacity"
                                    type="number"
                                    placeholder="Input Capacity"
                                    onChange={handleChange}
                                    required
                                /></>
                            : ""
                        }
                        <input
                            className="form-control"
                            label="Avatar"
                            name="avatar"
                            type="text"
                            placeholder="Input Photo"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                <button className="btn btn-info" onClick={(e) => handleCancel(e)}>Cancel</button>
            </div>
        </div>
    )
}

export default AddNew
