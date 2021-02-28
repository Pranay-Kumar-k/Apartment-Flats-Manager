import { GET_ITEMS_FAILURE, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from "./actionType";
import axios from "axios"

export const getItemsReq = () => ({
    type: GET_ITEMS_REQUEST
  });
  
  export const getItemsSuccess = (payload) => ({
    type: GET_ITEMS_SUCCESS,
    payload
  });
  
  export const getItemsFailure = (payload) => ({
    type: GET_ITEMS_FAILURE,
    payload
  });


  export const getItemsData = ({sort,filter,query,limit,page}) => (dispatch) => {
      dispatch(getItemsReq())
    axios({
        method:"GET",
        url:"http://localhost:5000/data",
        params:{
          limit:limit,
          q:query,
          page:page,
          filter:filter,
        //     sort:sort
        }
    })
    .then(res => {
        console.log(res)
        dispatch(getItemsSuccess(res.data.current))
    })
    .catch(err => {
        console.log(err)
        dispatch(getItemsFailure(err))
    })
  }