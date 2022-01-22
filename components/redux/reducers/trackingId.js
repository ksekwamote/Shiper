export default function trackingidReducer(status="" ,action){
    switch (action.type) {
        case "CHANGE TRACKING ID":
            return action.payload
        default:
            return status
    }
}