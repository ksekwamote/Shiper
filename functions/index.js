const functions = require("firebase-functions");
const Easypost = require('@easypost/api');
const api = new Easypost('EZTK253bee4ca1d8408f994a23d699b96a24I4ZE4aX7WUN1FPaQvYAG0w');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.tracker = functions.https.onRequest((request, response) => {

let res;

// const tracker = new api.Tracker({
//   tracking_code: 'EZ1000000001',
//   carrier: 'USPS',
// });

//response.send(request.body)
const tracker = new api.Tracker({
  tracking_code: request.body.code,
  carrier:request.body.carrier,
});

tracker.save().then(result => response.send(result)).catch(console.log)

//response.send(res)


});


