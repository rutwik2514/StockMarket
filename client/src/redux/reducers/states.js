const initialstate = []

export const dashboardData = (state = initialstate, action) =>{
    switch(action.type){
        case "RENDER" : {
           return state = action.payload;
        }
        default : return state;
    }
}

export const isLoading = (state = false, action) =>{
    switch(action.type){
        case "TRUE" : {
            return state=true;
        }
        case "FALSE" : {
            return state=false;
        }
        default:return state=false
    }
}

export const stockData = (state = [], action) =>{
    switch(action.type){
        case "UPDATE" : {
            return state = action.payload
        }
        default: return state
    }
}
