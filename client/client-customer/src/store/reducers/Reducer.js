import { SET_LOGIN, SET_VENUE, SET_ORGANIZER, SET_CATERING, LOGOUT, SET_PLANS} from '../actions'

const initialState = {
  userId: '',
  access_token: '',
  isLogin: false,
  plans:[],
  venues: [], 
  caterings: [],
  organizers: [],
  loading: false,
  messages: ''
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, ...action.payload.data, isLogin: true } 
    case LOGOUT:
      return {...state, isLogin:false, access_token:null}
    case SET_PLANS:
      // console.log(action, '<<<store SET VENUE<<<')
      return { ...state, plans: action.payload.data }
    case SET_VENUE:
      // console.log(action, '<<<store SET VENUE<<<')
      return { ...state, venues: action.payload.data }
    case SET_ORGANIZER:
      // console.log(action, '<<<store SET ORGANIZER<<<')
      return { ...state, organizers: action.payload.data }
    case SET_CATERING:
      // console.log(action, '<<<store SET CATERING<<<')
      return { ...state, caterings: action.payload.data }
    default:
      return state
  }
} 