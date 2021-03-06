import { ADD_ITEM, ADD_REGISTER, FETCH_BOOKING_APPROVALS, FETCH_SERVICES, SET_LOGIN, SET_ERROR, SET_LOADING, FETCH_SERVICE } from '../actions'

const initialState = {
    loading: false,
    error: null,
    services: [],
    service: {},
    isLogin: false,
    bookingApprovals: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return { ...state, ...action.payload.data, isLogin: true }
        case "SET_LOGIN2":
            return { ...state, isLogin: true }
        case "SET_LOGOUT":
            return { ...state, isLogin: false }
        case ADD_REGISTER:
            return { ...state, ...action.payload.data }
        case FETCH_SERVICES:
            return { ...state, services: action.payload }
        case FETCH_SERVICE:
            return { ...state, service: action.payload }
        case ADD_ITEM:
            let newItem = state.services.concat(action.payload.data)
            return { ...state, services: newItem }
        case SET_LOADING:
            return { ...state, loading: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        case FETCH_BOOKING_APPROVALS:
            return { ...state, bookingApprovals: action.payload }
        default:
            return state
    }
}