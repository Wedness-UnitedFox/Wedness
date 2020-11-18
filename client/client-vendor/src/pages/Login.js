import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchServices, userLogin } from '../store/actions/action';
import firebase from '../services/firebase'
import Logo from '../assets/Wedness.svg';

const auth = firebase.auth()

const Login = () => {

    const [inputLogin, setLogin] = useState({});
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (localStorage.access_token && localStorage.currentUser) history.push('/')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inputLogin
        dispatch(userLogin(inputLogin))
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Login berhasil')
                localStorage.setItem('currentUser', JSON.stringify(auth.currentUser))
                history.push('/')
                dispatch(fetchServices())
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorMessage = error.message;
                var errorCode = error.code;
                console.log(errorMessage, errorCode)
                // ...
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        history.push('/register')
    };

    const handleChange = (e) => {
        setLogin({ ...inputLogin, [e.target.name]: e.target.value });
    };

    return (
        <div class="container mx-auto">
            <div class="flex justify-center px-6 my-12">
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg " style={{ backgroundImage: `url(${Logo}` }}>
                    </div>
                    <div class="w-full lg:w-1/2 bg-orange-200 p-5 rounded-lg lg:rounded-l-none">
                        <h3 class="pt-4 text-4xl text-center">Welcome Back!</h3>
                        <form class="px-8 pt-6 pb-8 mb-4 bg-blue rounded" onSubmit={(e) => { handleSubmit(e) }}>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                                    Email
								</label>
                                <input
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                    Password
								</label>
                                <input
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded appearance-none focus:outline-none focus:shadow-outline"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />

                            </div>
                            <div class="mb-6 text-center">
                                <button
                                    class="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Sign In
								</button>
                            </div>
                            <hr class="mb-6 border-t" />
                            <div class="text-center">
                                <button
                                    class="inline-block text-sm text-gray-500 align-baseline hover:text-gray-800"
                                    onClick={(e) => handleRegister(e)}
                                >
                                    Didn't have an Account? Register Here!
								</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
