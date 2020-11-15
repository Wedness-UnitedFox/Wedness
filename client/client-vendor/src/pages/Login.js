import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { userLogin } from '../store/actions/action'

const Login = () => {

    const [inputLogin, setLogin] = useState({});
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputLogin, "<<<<<<page handlesubmit");
        dispatch(userLogin(inputLogin))
        history.push('/')
    };

    const handleRegister = (e) => {
        e.preventDefault();
        history.push('/vendor/register')
    };

    const handleChange = (e) => {
        setLogin({ ...inputLogin, [e.target.name]: e.target.value });
    };

    return (
        <div className="container shadow" style={{width: "25%"}}>
            <div className="container mt-3">
            <h3 className="text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            label="email"
                            name="email"
                            type="email"
                            placeholder="your email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control"
                            label="password"
                            name="password"
                            type="password"
                            placeholder="your password"
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                           Sign In
                        </button> 
                        
                    </div>
                </form>
                <button className="btn btn-info" onClick={(e) => handleRegister(e)}>New Vendor? Register Here</button>
            </div>

        </div>
    )
}

export default Login
