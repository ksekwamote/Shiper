export default function trackingItemReducer(status ={} , action){
    switch (action.type) {
        case 'CHANGE TRACKING ITEM':
            return action.payload
        default:
            return status
    }
}