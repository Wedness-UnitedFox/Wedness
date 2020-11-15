import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userRegister } from '../store/actions/action'

const Register = () => {

    const [inputRegister, setRegister] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(inputRegister, "<<<<<<page handleRegister");
        dispatch(userRegister(inputRegister))
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/vendor/login')
    };

    const handleChange = (e) => {
        setRegister({ ...inputRegister, [e.target.name]: e.target.value });
    };

    return (
        <div className="container shadow" style={{ width: "25%" }}>
            <h3 className="text-center">Register</h3>
            <div className="container mt-3">
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Input your name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="email"
                            name="email"
                            type="email"
                            placeholder="Input your email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="password"
                            name="password"
                            type="password"
                            placeholder="Input your password"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="Phone Number"
                            name="phone_number"
                            type="number"
                            placeholder="Input your Phone Number"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>

                    </div>
                </form>
                <button className="btn btn-info" onClick={(e) => handleCancel(e)}>Cancel</button>
            </div>

        </div>
    )
}

export default Register
