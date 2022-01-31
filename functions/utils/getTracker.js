const Easypost = require('@easypost/api');
const api = new Easypost('EZTK253bee4ca1d8408f994a23d699b96a24I4ZE4aX7WUN1FPaQvYAG0w');


module.exports = (userDetails)=>{
    const {carrier , trackingCode} = userDetails
    return new Promise((resolve , reject)=>{
        const tracker = new api.Tracker({
            tracking_code: trackingCode,
            carrier
          });
        tracker.save()
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}