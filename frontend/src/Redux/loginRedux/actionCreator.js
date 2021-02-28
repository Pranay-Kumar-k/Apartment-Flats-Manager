import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOGOUT_SUCCESS} from "./actionType"
import axios from "axios"

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload
});

export const loginUserData = ({ email, password }) => (dispatch) => {
  dispatch(loginRequest());
  axios({
    method: "POST",
    url: "http://localhost:5000/auth/login",
    headers:{
      'Content-Type':"application/json"
    },
    data: {
      "email":email,
      "password":password
    }
  })
    .then((res) => {
      dispatch(loginSuccess(res.data));
      console.log(res);
    })
    .catch((err) => {
      dispatch(loginFailure({ err }));
    });
};

export const logoutUser= () => {
  return{
      type:USER_LOGOUT_SUCCESS
  }
}
