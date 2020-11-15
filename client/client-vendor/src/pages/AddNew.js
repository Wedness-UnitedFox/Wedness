import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addItem } from '../store/actions/action';

const AddNew = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const [inputNew, setNew] = useState([])

    const handleNew = (e) => {
        e.preventDefault();
        const { name, address, price, phone_number, photos, description, type, avatar} = inputNew;
        console.log(inputNew, "<<<<<<page handle Add");
        dispatch(addItem(inputNew))
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/')
    };

    const handleChange = (e) => {
        setNew({ ...inputNew, [e.target.name]: e.target.value });
    };

    return (
        <div className="container shadow">
            <h3 className="text-center">Add New Item</h3>
            <div className="container mt-3">
                <form onSubmit={handleNew}>
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
                            type="number"
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
                        <input
                            className="form-control"
                            label="Type"
                            name="type"
                            type="text"
                            placeholder="Input Type"
                            onChange={handleChange}
                            required
                        />
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
