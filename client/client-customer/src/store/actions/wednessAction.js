import { SET_CATERING, SET_VENUE, SET_LOGIN, SET_ORGANIZER, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE, CLEAR_MESSAGE, SET_PLANS } from '.'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

const apiUrl = 'http://localhost:3000'

export const login = (inputLogin) => {
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
            .then(() => console.log("sukses"))
            .catch((err) => console.log("-----------error", err));
    };
};

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
export const bookNow = (data, success) => {
    
    return (dispatch, getState) => {
        if(!data.subtotal || !data.vendor_type || !data.VendorId ) {
            console.log("BOOK FAIL <-________________________"); 
        } else{
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
    // return (dispatch, getState) => {
    // const state = getState().Reducer 
    // const access_token = state.access_token
    // axios({
    //     url: apiUrl + `/user/plan`,
    //     method: "POST",
    //     headers: { access_token },
    //     data: data
    // }).then(({ data }) => {
    //     console.log("SUKSES ADD");
    // })
    //     .catch((err) => console.log("-----------error", err));
    // };
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
