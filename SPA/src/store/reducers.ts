import {combineReducers, ReducersMapObject} from 'redux';
import {connectRouter} from "connected-react-router";
import {History} from "history";
import {TYPES} from "../typings/types";




const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),

});


export default createRootReducer
