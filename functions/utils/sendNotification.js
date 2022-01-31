const getTracker = require('./getTracker')
const timeDiff = require('./timeDiff')
const modifyUserMessage= require('./modifyUserMessage')
const getLastState = require('./getLastState')
const fetch = require('node-fetch')


module.exports = async (userDetails ,ExpoToken) =>{
    
    const trackingDetails = await getTracker(userDetails)
    const {status , message} = modifyUserMessage(getLastState(trackingDetails))
    const canSend = timeDiff(getLastState(trackingDetails).datetime)

    return new Promise((resolve , reject)=>{
        const expoPushToken = 'ExponentPushToken[iKI8DJIt40wXmbzPmBvlGO]'
        

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Shiper Notification: AAAAAAAAA',
    body: 'Your package is now in transit and will be delivered in 4 days',
    data: { someData: 'goes here' },
  };

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(()=> resolve({success: true})).catch(err => reject(err))

        // console.log(`Tracking details:  ${trackingDetails}`) 
        // reject({reason: "No update in 6 hours"})
        
    
    })
    
}