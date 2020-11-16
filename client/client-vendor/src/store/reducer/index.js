import { ADD_ITEM, ADD_REGISTER, DELETE, EDIT, FETCH_SERVICES, SET_LOGIN, SET_ERROR, SET_LOADING, FETCH_SERVICE } from '../actions'

const initialState = {
    loading: false,
    error: null,
    services: [],
    service: {},
    isLogin: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return { ...state, ...action.payload.data, isLogin: true}
        case ADD_REGISTER:
            return { ...state, ...action.payload.data}
        case FETCH_SERVICES:
            return { ...state, services: action.payload}
        case FETCH_SERVICE:
            return { ...state, service: action.payload}
        case ADD_ITEM:
            let newItem = state.services.concat(action.payload.data)
            return { ...state, services: newItem }
        case SET_LOADING:
            return { ...state, loading: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}