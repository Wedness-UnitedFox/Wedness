import { ADD_ITEM, ADD_REGISTER, DELETE, EDIT, FETCH_VENUE, SET_LOGIN } from '../actions'

const initialState = {
    isLogin: false,
    userId: '',
    token: '',
    refreshToken: '',
    expiresOn: '',
    data: '',
    venue: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return { ...state, ...action.payload.data, isLogin: true }
        case ADD_REGISTER:
            return { ...state, ...action.payload.data }
        case FETCH_VENUE:
            console.log(action, '<<<store fetch reducer<<<')
            return { ...state, venue: action.payload.data }
        case ADD_ITEM:
            console.log(action, '<<<store add reducer<<<')
            let newItem = state.venue.concat(action.payload.data)
            return {...state, venue: newItem}
        case DELETE:
            return { ...state, venue: action.payload.data }
        case EDIT:
            return { ...state, venue: action.payload.data }
        default:
            return state
    }
}