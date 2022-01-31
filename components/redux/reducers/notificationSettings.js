const initialState = {
    All: false,
    pre_transit: true,
    in_transit:false,
    out_of_delivery:false,
    delivered:true,
    return_to_sender:false,
    failure:true,
  }
  
export default function notificationSettingReducer(state = initialState , action){
    switch (action.type) {
        case "CHANGE NOTIFICATION SETTINGS":
            return action.payload
        default:
            return state
    }
}