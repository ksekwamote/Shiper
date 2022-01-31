const getDetails = require('./getDetails')
const getLastState = require('./getLastState')
const timeDiff = require('./timeDiff')
const modifyUserMessage = require('./modifyUserMessage')



module.exports = async (userInfo) => {

    const details = await getDetails(userInfo) //getting tracking details now
    const { Notifications } = userInfo

   const noteDetails = details.map(elem => {
           let lastState = getLastState(elem)
            if (timeDiff(lastState.datetime))
            {
              lastState["trackingCode"] = elem.tracking_code
              lastState["expoPushToken"] = userInfo.ExpoToken
              return lastState
            }
    })

    return noteDetails.map(elem => {
        console.log(`Notifications: ${Notifications[elem.status]}`)
      if (Notifications[elem.status]){
        return{
        to: elem.expoPushToken ,
        sound: 'default',
        title: `Shiper Notification : Package ${elem.trackingCode}`,
        body: `${elem.status} : ${modifyUserMessage(elem)}`,
        data: { someData: 'goes here' }
    }
    }
  })

}



