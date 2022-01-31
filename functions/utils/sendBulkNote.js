const sendPushNote  = require("./sendPushNote")


const notes = [
    {
        object: "TrackingDetail",
          message: "Arrived at Post Office",
          description: null,
          status: "in_transit",
          status_detail: "arrived_at_facility",
          datetime: "2021-12-31T18:21:37Z",
          source: "USPS",
          trackingCode: "EZ3000000003",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "CHARLESTON",
            state: "SC",
            country: null,
            zip: "29407"}
      },
      {
        object: "TrackingDetail",
          message: "Arrived at Post Office",
          description: null,
          status: "in_transit",
          status_detail: "arrived_at_facility",
          datetime: "2021-12-31T18:21:37Z",
          source: "USPS",
          trackingCode: "EZ3000000003",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "CHARLESTON",
            state: "SC",
            country: null,
            zip: "29407"}
      },
      {
        object: "TrackingDetail",
          message: "Arrived at Post Office",
          description: null,
          status: "in_transit",
          status_detail: "arrived_at_facility",
          datetime: "2021-12-31T18:21:37Z",
          source: "USPS",
          trackingCode: "EZ3000000003",
          carrier_code: null,
          tracking_location: {
            object: "TrackingLocation",
            city: "CHARLESTON",
            state: "SC",
            country: null,
            zip: "29407"}
      }
]

module.export = async () =>{

    return new Promise((resolve , reject)=>{
        const expoPushToken = 'ExponentPushToken[iKI8DJIt40wXmbzPmBvlGO]'

       
        const pushes =  notes.map(item => sendPushNote(expoPushToken ,item))

        console.log(pushes)
    
       Promise.all(pushes).then(()=> resolve({result:"done"})).catch(err => reject(err))
   
   
    })
   
}
