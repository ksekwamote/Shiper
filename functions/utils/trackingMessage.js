function getShortDate(date) {
  date = new Date(date)
  const days = ['Sun' , 'Mon' ,'Tue' ,'Wed' , 'Thu' ,'Fri' , 'Sat']
  const mons= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return ` ${days[date.getDay()]} , ${date.getDate()} ${mons[date.getMonth()]}`

}
function localtime(date = new Date(item)){
  return (date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}))
}
function dateDiff(date){ 
  return new Date(date).getDate() - new Date().getDate()
}

module.exports  = sendWhatsappMessage = ( trackingDetails) =>{

  const { message , status ,tracking_location , source , est_delivery_date  , package , datetime } = trackingDetails

  const { city , state , country ,zip } = tracking_location

  const shortDate = getShortDate(new Date(est_delivery_date))
  const daysLeft  = dateDiff(est_delivery_date)

  var billing = `Your ${package} package is on a *pre_transit* status.The Billing information has been recieved and the product is currently awaiting scanning .
   Your package is estimated to be delivered by ${shortDate}. There are about *${daysLeft} days left*. `
  
  var origin = `Your ${package} package is on an *in_transit* status.
  The shipment has reached the local packaging facility responsible for delivery and has been dispatched to a facility driver.
  We expect the package to be delivered by ${shortDate}. There are about *${daysLeft} days left* for the package to arrive.  `
  
  var depature = `Your ${package} package is on an *in_transit* status.
  The shipment has departed a ${source} facility and is on its way to the next facility. Its currently in ${city} , ${state} , ${country}.
  .There are about *${daysLeft} days left*  , the package is expected to arrive on ${shortDate}`

  var arrival = `Your ${package} package is on an *in_transit* status.
  The shipment has arrived at a ${source} facility in ${city} , ${state} , ${country}. Its expected to arrive for delivery
  on ${shortDate} , that's about *${daysLeft} days* from now.  
  `
  //WHAT IF CITY AN STATE DO NOT EXIST
  var out = `Your ${package} package is on an *out_for_delivery* status .It has reached a *${source}* hub in ${city} , ${state} that's closest to your location, the courier will pick it up either today or the day after.`
  
  var delivered =`Your ${package} package is on a *delivered* status .The shipment has arrived at its final destination.
  Delivery Time: ${datetime}
  Delivery Location: ${city} , ${state} , ${country}  , ${zip}. Thank you for using Shiper to track your package`

  var defaultMessage  = `Your ${package} package is on a ${status} status.
  Tracking Message: *${message}*,
  Estimated Delivery Date: *${shortDate}*,
  Days Left: *${daysLeft}*
  `
  var returnToSender = `Your ${package} package is on a ${status} status.
  That means the package is scheduled to return to the sender on behalf of you as the reciever.
  Contact your carrier for more information about this package. The package is currently in ${city} , ${state} , ${country}
  and has halted the continuation of its journey.`

  var failure  = `Your ${package} package is on a ${status} status. Which means that your billing information has been voided.
  Most likely you as the shipper went into your online account and marked the shipment as voided as such the shipment will not be sent.`

  var unknown = `The carrier doesnt have any information about this product`

  var available = `Your ${package} package is on a ${status} status.The shipment is available for pickup from the carrier’s facility.
  Thank you for using Shiper to track your product.`



  if(status =="unknown") return unknown
  if(status =='available_for_pickup') return available

  switch (message) {
    case "BILLING INFORMATION RECEIVED":
      return billing
    case "ORIGIN SCAN":
      return origin
    case "DEPARTURE SCAN":
      return depature
    case "ARRIVAL SCAN":
      return arrival
    case "OUT FOR DELIVERY":
      return out
    case "DELIVERED":
      return delivered
    case "THE PACKAGE WILL BE RETURNED TO THE SENDER":
      return returnToSender
    case "BILLING INFORMATION VOIDED":
      return failure
    default:
      return defaultMessage
  }

  }

  