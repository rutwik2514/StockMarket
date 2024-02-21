// import {changeState} from "./states";
// import { changeState2 } from "./states";
import { dashboardData, isLoading, stockData } from "./states";
import {combineReducers} from "redux"

const rootreducer = combineReducers({
    // changeState,
    dashboardData,
    isLoading,
    stockData
})

export default rootreducer;