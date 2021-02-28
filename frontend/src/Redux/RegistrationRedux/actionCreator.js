import axios from "axios";
import {
  REGISTRATION_FAILURE,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS
} from "./actionType";

export const registrationReq = () => ({
  type: REGISTRATION_REQUEST
});

export const registrationSuccess = (payload) => ({
  type: REGISTRATION_SUCCESS,
  payload
});

export const registrationFailure = (payload) => ({
  type: REGISTRATION_FAILURE,
  payload
});

export const registrationUser = ({
  name,
  email,
  password,
}) => (dispatch) => {
  dispatch(registrationReq());
  axios({
    method: "POST",
    url: "http://localhost:5000/auth/register",
    headers:{
      "Content-Type":"application/json"
    },
    data: {
      name,
      email,
      password
    }
  })
    .then((res) => {
      console.log(res);
      dispatch(registrationSuccess({ res }));
    })
    .catch((err) => {
      console.log(err);
      registrationFailure({ err });
    });
};
