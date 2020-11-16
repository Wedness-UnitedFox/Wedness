import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userLogin } from '../store/actions/action';
import firebase from '../services/firebase'

const auth = firebase.auth()

const Login = () => {

    const [inputLogin, setLogin] = useState({});
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inputLogin
        dispatch(userLogin(inputLogin))
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Login berhasil')
            localStorage.setItem('currentUser', JSON.stringify(auth.currentUser))
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            var errorCode = error.code;
            console.log(errorMessage, errorCode)
            // ...
        });
        history.push('/home')
    };

    const handleRegister = (e) => {
        e.preventDefault();
        history.push('/register')
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
