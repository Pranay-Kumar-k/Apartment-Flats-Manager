import { applyMiddleware, combineReducers, createStore,compose } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./loginRedux/reducer";
import registerReducer from "./RegistrationRedux/reducer";
import dataReducer from "./dataRedux/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({login:loginReducer,register:registerReducer,items:dataReducer})

export const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )