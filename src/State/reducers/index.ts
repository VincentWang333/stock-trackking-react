import { combineReducers } from "@reduxjs/toolkit";
import stockPerformaceReducer from "./stockPerformaceReducer";

const reducers = combineReducers({
    stock: stockPerformaceReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>