import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userRegister } from '../store/actions/action';
import firebase from '../services/firebase';
import swal from 'sweetalert';
import Logo from '../assets/banner4.jpg';


const auth = firebase.auth()

const Register = () => {

    const [inputRegister, setRegister] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

	useEffect(() => {
        if (localStorage.access_token && localStorage.currentUser) history.push('/')
    }, [])

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(inputRegister, "<<<<<<page handleRegister");
        dispatch(userRegister(inputRegister, trigger))
				swal({
					title: "Thank you!",
					text: "You have been registered!",
					icon: "success",
					button: "OK",
				});
				history.push('/login')
    };

    function trigger(email, password) {
        // console.log("triggered")
        auth.createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, "errCode", errorMessage, "errMessage");
                // ...
            });
    }

    const handleCancel = () => {
        history.push('/')
    };

    const handleChange = (e) => {
        setRegister({ ...inputRegister, [e.target.name]: e.target.value });
    };

    return (
        <div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
                <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover"
                style={{ backgroundImage: `url(${Logo}`, width: `50%` }}>
                    </div>
					<div class="w-full lg:w-7/12 bg-orange-200 p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-3xl text-center">Create an Account</h3>
						<form class="px-8 pt-6 pb-8 mb-4 rounded" onSubmit={(e) => handleRegister(e)}>
							<div class="mb-4 md:flex md:justify-between">
								<div class="mb-4">
									<label class="block mb-2 text-sm font-bold text-gray-800" for="name">
										Name
									</label>
									<input
										class="w-full px-2 py-2 text-sm leading-tight text-gray-800 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="name"
										type="text"
                                        placeholder="Input your Name"
                                        onChange={handleChange}
									/>
								</div>
								<div class="md:ml-2">
									<label class="block mb-2 text-sm font-bold text-gray-800" for="phone">
										Phone Number
									</label>
									<input
										class="w-full px-2 py-2 text-sm leading-tight text-gray-800 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="phone_number"
										type="number"
                                        placeholder="Phone Number"
                                        onChange={handleChange}
									/>
								</div>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-800" for="email">
									Email
								</label>
								<input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-800 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									name="email"
									type="email"
                                    placeholder="Email"
                                    onChange={handleChange}
								/>
							</div>
							<div class="mb-4">
								<div class="mb-4 md:mr-2 md:mb-0">
									<label class="block mb-2 text-sm font-bold text-gray-800" for="password">
										Password
									</label>
									<input
										class="w-full px-3 py-2 mb-5 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="password"
										type="password"
                                        placeholder="******************"
                                        onChange={handleChange}
									/>
								</div>
							</div>
							<div class="mb-6 text-center">
								<button
									class="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Sign Up
								</button>
							</div>
							<hr class="mb-6 border-t" />
							
						</form>
							<div class="text-center">
								<button
									class="inline-block text-sm text-gray-500 align-baseline hover:text-gray-800"
									onClick={handleCancel}
								>
									Already have an account? Login Here!
								</button>
							</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Register
