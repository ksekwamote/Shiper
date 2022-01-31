
const getTracker  = require('./getTracker')

module.exports = (userInfo) => {

    const { Tracker  , Notifications} = userInfo

    let trackingDetails = Tracker.map(async item =>{
        const details = await getTracker(item)
        return details
    })

    return Promise.all(trackingDetails)

}