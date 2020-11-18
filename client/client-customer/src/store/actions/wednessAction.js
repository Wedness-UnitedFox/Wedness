import { SET_CATERING, SET_VENUE, SET_LOGIN, SET_ORGANIZER, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE, CLEAR_MESSAGE, SET_PLANS } from '.'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

// const apiUrl = 'http://10.0.2.2:3000'
const apiUrl = 'http://localhost:3000'

export const login = (inputLogin, cb) => {
    console.log(inputLogin, "<<<<<<<store login");
    return (dispatch) => {
        axios({
            url: apiUrl + `/user/login`,
            method: "POST",
            data: inputLogin
        })
            .then(({ data }) => {
                console.log(data.access_token, "-----------masuk dispatch");

                dispatch({
                    type: SET_LOGIN,
                    payload: {
                        data
                    }
                });
                return AsyncStorage.setItem('access_token', data.access_token)
            })
            .then(() => {
                console.log("sukses")
                cb()
            })
            .catch((err) => console.log("-----------error", err));
    };
};

export const register = (inputRegister,sukses, error) => {
    console.log("masuk register", inputRegister);
    return (dispatch) => {
        axios({
            url: apiUrl + `/user/register`,
            method: 'POST',
            data: inputRegister
        })
            .then(({ data }) => {
                console.log("Success in registering data", data)
                sukses()
            })
            .catch((err) => {
                error(err.response.data.msg)
                console.log("-----------error", err.response.data)
            })
    }
}

export const fetchVenue = () => {
    const access_token = AsyncStorage.getItem('access_token')
        .then(value => {
            console.log(value);
        })
        .catch(err => {

        })
    console.log(access_token, '<<<<<<<<<<<<<<<AccessToken');
    return (dispatch, getState) => {
        const state = getState().Reducer
        const access_token = state.access_token
        axios({
            url: apiUrl + `/user/venue`,
            method: "GET",
            headers: { access_token }
        }).then(({ data }) => {
            dispatch({
                type: SET_VENUE,
                payload: {
                    data
                }
            });
        })
            .catch((err) => console.log("-----------error", err));
    };
};

export const fetchCatering = () => {
    const access_token = AsyncStorage.getItem('access_token')
        .then(value => {
            console.log(value);
        })
        .catch(err => {

        })
    console.log(access_token, '<<<<<<<<<<<<<<<AccessToken');
    return (dispatch, getState) => {
        const state = getState().Reducer
        const access_token = state.access_token
        axios({
            url: apiUrl + `/user/catering`,
            method: "GET",
            headers: { access_token }
        }).then(({ data }) => {
            dispatch({
                type: SET_CATERING,
                payload: {
                    data
                }
            });
        })
            .catch((err) => console.log("-----------error", err));
    };
};

export const fetchOrganizer = () => {
    const access_token = AsyncStorage.getItem('access_token')
        .then(value => {
            console.log(value);
        })
        .catch(err => {

        })
    console.log(access_token, '<<<<<<<<<<<<<<<AccessToken');
    return (dispatch, getState) => {
        const state = getState().Reducer
        const access_token = state.access_token
        axios({
            url: apiUrl + `/user/organizer`,
            method: "GET",
            headers: { access_token }
        }).then(({ data }) => {
            dispatch({
                type: SET_ORGANIZER,
                payload: {
                    data
                }
            });
        })
            .catch((err) => console.log("-----------error", err));
    };
};


export const bookNow = (data, success) => {
    return (dispatch, getState) => {
        if (!data.subtotal || !data.vendor_type || !data.VendorId) {
            console.log("BOOK FAIL <-________________________");
        } else {
            AsyncStorage.getItem('access_token')
                .then(value => {
                    // console.log(value);
                    console.log(value, '<<<<<<<<<<<<<<<AccessToken', data);
                    return axios({
                        url: apiUrl + `/user/plan`,
                        method: "POST",
                        headers: { access_token: value },
                        data: data
                    })
                })
                .then(({ data }) => {
                    console.log(data, "<--- RESULT");
                    success()
                })
                .catch(err => {
                    console.log(err.response.data);
                })
        }
    }
};

export const fetchPlans = () => {
    return (dispatch, getState) => {
        AsyncStorage.getItem('access_token')
            .then(value => {
                console.log(value, '<<<<<<<<<<<<<<<AccessToken');
                return axios({
                    url: apiUrl + `/user/plan`,
                    method: "GET",
                    headers: { access_token: value },
                })
            })
            .then(({ data }) => {
                console.log(data, "<--- RESULT");
                dispatch({
                    type: SET_PLANS,
                    payload: {
                        data
                    }
                });
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }
}

export const deletePlan = (id) => {
    return (dispatch, getState) => {
        AsyncStorage.getItem('access_token')
            .then(value => {
                console.log(value, '<<<<<<<<<<<<<<<AccessToken  ', id);

                return axios({
                    url: apiUrl + `/user/plan/${id}`,
                    method: "DELETE",
                    headers: { access_token: value },
                })
            })
            .then(({ data }) => {
                console.log(data, "<--- RESULT");
                let { plans } = getState().Reducer
                // console.log(plans);
                let newPlans = plans.filter(plan => plan.id !== id)
                console.log(plans, "<---->", newPlans);

                dispatch({
                    type: SET_PLANS,
                    payload: {
                        data: newPlans
                    }
                });
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }
}

export const checkout = () => {
    return (dispatch, getState) => {
        AsyncStorage.getItem('access_token')
            .then(value => {
                console.log(value, '<<<<<<<<<<<<<<<AccessToken  ', id);

                return axios({
                    url: apiUrl + `/user/plan/checkout`,
                    method: "PUT",
                    headers: { access_token: value },
                })
            }) 
            .then(({ data }) => {
                console.log(data, "<--- RESULT");
                dispatch({
                    type: SET_PLANS,
                    payload: {
                        data:[]
                    }
                });
            })
            .catch(err => {
                console.log(err.response);
            })
    }
}