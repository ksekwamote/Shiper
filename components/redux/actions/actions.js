
export const changeTrackingInfo = (data)=>{

    return {
        type: "CHANGE TRACKING INFORMATION",
        payload: data
    }
} 

export const changeTrackingItem = (data)=>{
    
    return {
        type: "CHANGE TRACKING ITEM",
        payload: data
    }
}

export const changeTrackingID = (id)=>{
    return {
        type:"CHANGE TRACKING ID",
        payload: id
    }
}