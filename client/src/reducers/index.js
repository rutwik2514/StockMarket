// import {changeState} from "./states";
// import { changeState2 } from "./states";
import { dashboardData } from "./states";
import {combineReducers} from "redux"

const rootreducer = combineReducers({
    // changeState,
    dashboardData
})

export default rootreducer;