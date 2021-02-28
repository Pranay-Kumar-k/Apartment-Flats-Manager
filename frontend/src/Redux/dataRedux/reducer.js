import { GET_ITEMS_FAILURE, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS } from "./actionType";


const initState = {
    isLoading:true,
    isError:false,
    items:[]
}

const reducer = (state = initState, {type,payload}) => {
    switch(type) {
        case GET_ITEMS_REQUEST:
            return {
                ...state,
            }
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                items:payload
            }
        case GET_ITEMS_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true
            }
        default:
            return state
    }
}

export default reducer