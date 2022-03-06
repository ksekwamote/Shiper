const accountSid = 'ACb2048abb6993308a562518661211f4e2';
const authToken = '7cab7d16e01c94371f3d67013fc3c896';
const client = require('twilio')(accountSid, authToken);



module.exports = async (message) => {

    const sendMessage  = await client.messages.create(message) 

     return sendMessage
    
}


//   .then(message => response.send(message.sid)) 
//   .done();