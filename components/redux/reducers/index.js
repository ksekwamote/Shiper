import { combineReducers } from "redux";
import trackingInfoReducer from "./trackingInfo"
import trackingItemReducer from "./trackingItem";
import trackingidReducer from "./trackingId";


export default reducers  = combineReducers({
    trackingInfo: trackingInfoReducer,
    trackingItem: trackingItemReducer ,
    trackingID: trackingidReducer
})

 
