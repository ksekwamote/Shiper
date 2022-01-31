const functions = require("firebase-functions");
const Easypost = require('@easypost/api');
const api = new Easypost('EZTK253bee4ca1d8408f994a23d699b96a24I4ZE4aX7WUN1FPaQvYAG0w');
const { Expo } = require('expo-server-sdk') 
const admin  = require('firebase-admin')
const fetch = require('node-fetch')
const sendNotification = require('./utils/sendNotification')
const sendPushNote  = require('./utils/sendPushNote')
const getDetails = require("./utils/getDetails")
const getNoteDetails = require("./utils/getNoteDetails")


admin.initializeApp(functions.config().firebase)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//ERROR HANDLING FOR THE AWAITS

const pushToken = "iKI8DJIt40wXmbzPmBvlGO"
let expo = new Expo() 

exports.tracker = functions.https.onRequest((request, response) => {

const tracker = new api.Tracker({
  tracking_code: request.body.code,
  carrier:request.body.carrier,
});

tracker.save().then(result => response.send(result)).catch(console.log)

});

async function getDocumentData (id) // GETTING DATA FOR THE SPECIFIC DOCUMENT ID
{
      return new Promise((resolve, reject)=>{
        admin.firestore()
        .collection("Trackers")
        .doc(id)
        .get()
        .then(snapshot => resolve(snapshot.data()))
        .catch(err => reject(err))
      })  
  
   
}

async function getAllDocumentIds(){ //GET ALL DOCUMENT ID'S IN A COLLECTIONS

  return new Promise((resolve, reject)=>{
    let ids =[]
    admin.firestore()
    .collection("Trackers")
    .get()
    .then(snapshot =>snapshot.forEach(doc => ids.push(doc.id)))
    .then(()=> resolve(ids))
    .catch(err => reject(err))
  })

}

async function getAllDocumentInfo(){
  const documentIds = await getAllDocumentIds() //GET ALL THE INFO FOR EACH RESPECTIVE ID

  console.log(documentIds)
  const documentInfos = documentIds.map(async id =>{
    const info = await getDocumentData(id)
    return info
  })

  return Promise.all(documentInfos)
}

async function getAllNoteDetails(){
  const alldocumentInfo = await getAllDocumentInfo()  // TRANSLATE DOCUMENT INFO INTO NOTIFICATION DETAILS HEADER

  const allNoteDetails = alldocumentInfo.map(async info =>{
    const note = await getNoteDetails(info)
    return note
  })

  return Promise.all(allNoteDetails)

}



exports.sendPushNotification = functions.https.onRequest(async(request ,response) => {

  sendPushNote(await getAllNoteDetails())
  .then(()=> response.send({result:"done"}))
  .catch(err => response.send(err))
    
     
})


exports.testData = functions.https.onRequest(async(request ,response)=>{
   



    //  admin.firestore()                       //promise.all
    //  .collection("Trackers")
    //  .get()
    // .then(snapshot=> snapshot.forEach(async doc =>  await sendPushNote(doc.data())))
    //  .then(()=> response.send({result:"done"}))
    //  .catch(err => response.send(err))

   
  const noteDetails = Array.prototype.concat.apply([], (await getAllNoteDetails()))

   sendPushNote(noteDetails.filter(item => item!=null ))
  .then(()=> response.send({result:"done"}))
  .catch(err => response.send(err))


    
  })




exports.scheduleNotifications  =  functions.pubsub.schedule('0 */6 * * *').onRun(context => {


  
})

exports.notifyTracker = functions.https.onRequest((request , response)=>{

  let messages = []

  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`)
  }

  messages.push({
    to: pushToken,
    sound: 'default',
    body: 'This is a test notification',
    data: { withSome: 'data' },
  })

  let chunks  = expo.chunkPushNotifications()

  let tickets = [];
  
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error);
    }
  }
})();




})


