import { ADD_ITEM, ADD_REGISTER, DELETE, EDIT, FETCH_SERVICES, SET_LOGIN, SET_ERROR, SET_LOADING } from '../actions'

const initialState = {
    loading: false,
    error: null,
    services: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return { ...state, ...action.payload.data}
        case ADD_REGISTER:
            return { ...state, ...action.payload.data}
        case FETCH_SERVICES:
            return { ...state, services: action.payload}
        case ADD_ITEM:
            // console.log(action.payload.data, '<<<<<<<<reducer');
            let newItem = state.services.concat(action.payload.data)
            // console.log(newItem, '<<<<<<<<<<<new item reducer')
            return { ...state, services: newItem }
        case DELETE:
            return { ...state, services: action.payload.data }
        case EDIT:
            return { ...state, services: action.payload.data }
        case SET_LOADING:
            return { ...state, loading: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}