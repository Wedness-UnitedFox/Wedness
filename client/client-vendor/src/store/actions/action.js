const axios = require('axios')

const apiUrl = "http://localhost:3000"
export function setLoading(data) {
    return {
        type: 'SET_LOADING',
        payload: data
    }
}

export function setError(data) {
    return {
        type: 'SET_ERROR',
        payload: data
    }
}
export const userLogin = (inputLogin) => {
    // console.log(inputLogin, "<<<<<<<store login");
    return (dispatch) => {
        axios({
            url: apiUrl + `/vendor/login`,
            method: "POST",
            data: inputLogin
        })
            .then(({data}) => {
                // console.log(data.access_token, "-----------masuk dispatch");
                localStorage.setItem('access_token', data.access_token)
                dispatch({
                    type: "SET_LOGIN",
                    payload: {
                        data
                    }
                });
            })
            .catch((err) => console.log("-----------error", err));
    };
};

export const userRegister = (inputRegister) => {
    return (dispatch) => {
        console.log(inputRegister, "<<<<<<<store regis");
        axios({
            url: apiUrl + `/vendor/register`,
            method: "POST",
            data: inputRegister
        })
            .then(({data}) => {
                console.log("-----------masuk dispatch");
                dispatch({
                    type: "ADD_REGISTER",
                    payload: {
                        data
                    }
                });
            })
            .catch((err) => console.log("-----------error", err));
    };
};

export const fetchServices = () => {
    let arr = []
    return (dispatch) => {
        axios({
            url: apiUrl + `/vendor/venue`,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .then(({data}) => {
            arr = [...arr, ...data]
            return axios({
                url: apiUrl + `/vendor/catering`,
                method: "GET",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
        })
        .then(({data}) => {
            arr = [...arr, ...data]
            return axios({
                url: apiUrl + `/vendor/organizer`,
                method: "GET",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
        })
        .then(({data}) => {
            arr = [...arr, ...data]
            console.log(arr, '<<<<<<<<<<<<<<<arrr action');
            dispatch({
                type: "FETCH_SERVICES",
                payload: 
                    arr
            })
        })
        .catch(err => {
            console.log(err.response);
            dispatch(setError(err))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}
}

export const fetchServiceById = (id, service_type) => {
    console.log("masuk action fetchId");
    return (dispatch) => {
        dispatch(setLoading(true))
        axios({
            url: apiUrl + `/vendor/${service_type}/${id}`,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(({ data }) => {
                console.log(data, "from fetchID in action.js")
                dispatch({
                        type: "FETCH_SERVICE",
                        payload: data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    dispatch(setLoading(false))
                })
        }
}

export const addItem = (inputNew, service_type) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        console.log(inputNew, "<<<<<<<store add");
        axios({
            url: apiUrl + `/vendor/${service_type}`,
            method: "POST",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: inputNew
        })
            .then(({ data }) => {
                console.log(data, "-----------masuk dispatch");
                dispatch({
                    type: "ADD_ITEM",
                    payload: {
                        data
                    }
                });
            })
            .catch(err => {
                console.log(err.response)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    };
};

export const deleteItem = (id, service_type) => {
    return (dispatch, getState) => {
        dispatch(setLoading(true))
        axios({
            url: apiUrl + `/vendor/${service_type}/` + id,
            method: "DELETE",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(() => {
                const state = getState()
                const newServices = state.services.filter(service => service.id !== id || service.service_type !== service_type)

                dispatch({
                    type: "FETCH_SERVICES",
                    payload: newServices
                })
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}

export const editItem = (id, service_type, input_data) => {
    return (dispatch, getState) => {
        axios({
            url: apiUrl + `/vendor/${service_type}/${id}`,
            method: "PUT",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: input_data
        })
            .then(({ data }) => {
                const state = getState()
                const updateData = input_data
                const currentServices = state.services
                const filteredServices = currentServices.filter(service => {
                if(service.id !== updateData.id || service.service_type !== updateData.service_type){
                    return service
                }
            })
                dispatch({
                    type: "FETCH_SERVICES",
                    payload: filteredServices
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}