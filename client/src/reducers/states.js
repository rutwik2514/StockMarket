const initialstate = []

export const dashboardData = (state = initialstate, action) =>{
    switch(action.type){
        case "RENDER" : {
           return state = action.payload;
        }
        default : return state;
    }
}
