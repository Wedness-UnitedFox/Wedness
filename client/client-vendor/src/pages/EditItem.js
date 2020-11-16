import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editItem } from '../store/actions/action'

export default function EditItem () {
  const { id, service_type } = useParams()
  const {service, loading} = useSelector(state => state)
  const history = useHistory()
  const dispatch = useDispatch()

  // console.log(service, loading)

  const [update, setUpdate] = useState({})

  useEffect(() => {
    setUpdate(service)
  }, [])

  const handleChange = (e) => {
    if (e.target.name === "price") e.target.value = +e.target.value
    if (e.target.name === "capacity") e.target.value = +e.target.value
    setUpdate({...update, [e.target.name]: e.target.value})
  }

  const handleNew = () => {
    dispatch(editItem(id, service_type, update))
    history.push('/home')
  };

  const handleCancel = () => {
    history.push('/home')
  };

  return (
    <div>
      <pre>{JSON.stringify(service)}</pre>
      <div className="container shadow">
      <h3 className="text-center">Edit {update.service_type}</h3>
            <div className="container mt-3">
                <form onSubmit={handleNew}>
                    <select required className="form-control" onChange={handleChange} name="service_type" disabled={true}>
                        <option>Choose Vendor Type</option>
                        <option value="venue" selected={update.service_type === 'venue' ? true: false}>Venue</option>
                        <option value="catering" selected={update.service_type === 'catering' ? true: false}>Catering</option>
                        <option value="organizer" selected={update.service_type === 'organizer' ? true: false}>Organizer</option>
                    </select>
                    <div className="form-group">
                        <input
                            className="form-control"
                            label="Name"
                            name="name"
                            type="text"
                            value={update.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Email"
                            name="email"
                            type="email"
                            value={update.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Address"
                            name="address"
                            type="text"
                            value={update.address}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Phone Number"
                            name="phone_number"
                            type="text"
                            value={update.phone_number}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Price"
                            name="price"
                            type="number"
                            min="0"
                            value={update.price}
                            onChange={handleChange}
                            required
                        />
                        {service_type === 'venue' ?
                        <><select required className="form-control" onChange={handleChange} name="type">
                            <option default value="">Choose Venue Type</option>
                            <option value="indoor" selected={update.type === 'indoor' ? true : false}>Indoor</option>
                            <option value="outdoor" selected={update.type === 'outdoor' ? true : false}>Outdoor</option>
                        </select>
                        <input
                            className="form-control"
                            label="Type"
                            name="capacity"
                            type="number"
                            min="0"
                            value={update.capacity}
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
                            value={update.avatar}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className="form-control"
                            label="Description"
                            name="description"
                            type="text"
                            value={update.description}
                            onChange={handleChange}
                            row="3"
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                <button className="btn btn-info" onClick={() => handleCancel()}>Cancel</button>
            </div>
        </div>
    </div>
  )
}