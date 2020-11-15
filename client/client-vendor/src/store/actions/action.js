const axios = require('axios')

const apiUrl = "http://localhost:3000"

export const userLogin = (inputLogin) => {
    console.log(inputLogin, "<<<<<<<store login");
    return (dispatch) => {
        axios({
            url: apiUrl + `/vendor/login`,
            method: "POST",
            data: inputLogin
        })
            .then(({data}) => {
                console.log(data.access_token, "-----------masuk dispatch");
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

export const fetchVenue = () => {
    return (dispatch) => {
        axios({
            url: apiUrl + `/vendor/venue`,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then((data) => {
                dispatch({
                    type: "FETCH_VENUE",
                    payload: {
                        data
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addItem = (inputNew) => {
    return (dispatch) => {
        console.log(inputNew, "<<<<<<<store add");
        axios({
            url: apiUrl + `/vendor/venue`,
            method: "POST",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: JSON.stringify(inputNew)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("-----------masuk dispatch");
                dispatch({
                    type: "ADD_ITEM",
                    payload: {
                        data
                    }
                });
            })
            .catch((err) => console.log("-----------error", err));
    };
};

export const deleteItem = (id) => {
    return (dispatch) => {
        axios({
            url: apiUrl + `/vendor/venue/` + id,
            method: "DELETE",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then((data) => {
                dispatch({
                    type: "DELETE",
                    payload: {
                        data
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const editItem = (id) => {
    return (dispatch) => {
        axios({
            url: apiUrl + `/vendor/venue/` + id,
            method: "PUT",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then((data) => {
                dispatch({
                    type: "EDIT",
                    payload: {
                        data
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}