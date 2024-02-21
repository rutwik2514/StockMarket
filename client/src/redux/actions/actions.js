export const renderDashboardData = (payload) =>{
    return{
        type:"RENDER",
        payload: payload 
    };
}

export const isLoadingTrue = () =>{
    return{
        type:"TRUE"
    }
}

export const isLoadingFalse = () =>{
    return {
        type:"FALSE"
    }
}

export const changeStockData = (payload) =>{
    return {
        type:"UPDATE"
    }
}