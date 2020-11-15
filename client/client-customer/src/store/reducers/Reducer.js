import {SET_BOARD, START_LOADING, STOP_LOADING, SET_STATUS, SET_SOLVEDBOARD, RESET_STATE, SET_LEADERBOARD} from '../actions'
const initialState = {
    board: [],
    solvedBoard: [],
    status: 'unsolved', 
    loading: false,
    leaderBoard:[]
}

export default function reducer(state = initialState, action) {  
  switch (action.type) {
    case SET_BOARD:
      return {...state, board:action.payload}

    case SET_SOLVEDBOARD:
      return {...state, solvedBoard:action.payload}

    case SET_STATUS:
      return {...state, status:action.payload}

    case START_LOADING:
      return {...state, loading:true}

    case STOP_LOADING:
      return {...state, loading:false}

    case SET_LEADERBOARD:
      return {...state, leaderBoard:action.payload}

    case RESET_STATE:
      return {...initialState, leaderBoard:state.leaderBoard}

    default:
      return state
  }
}
 