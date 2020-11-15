import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE, CLEAR_MESSAGE} from '.' 

 
export const login = (username, password) => {
    return (dispatch) =>{
        axios
          .post(API_URL + "signin", {
            username,
            password,
          })
          .then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
      
            return response.data;
          });
    }
  };

export const fetchBoard = (level = 'easy') => {
    console.log("FETCHING BOARD : -", level);
    return (dispatch) => {
        dispatch(STARTLOADING())
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(res => res.json())
            .then(result => {
                const { board } = result
                dispatch(SETBOARD(board))
                dispatch(STOPLOADING())
                // dispatch(SETSTATUS(level))
                // console.log("fetching board", { board });
            })
    }
}
export const validate = (data) => { 
    return (dispatch) => {
        dispatch(STARTLOADING())
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }) 
            .then(res => res.json())
            .then(result => { 
                console.log("VALIDASI:", result);
                dispatch(SETSTATUS(result.status))
                dispatch(STOPLOADING())
            })
    }
} 