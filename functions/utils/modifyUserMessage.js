module.exports = (details)=>{

    const {status , message} = details


    switch(status){
        case "out_for_delivery":
            return "Your package has arrived , its currently out for delivery."
        case "failure":
            return "Package undeliverable because of faulty or illegible address."
        case "delivered":
            return "You package has been delivered."
         default:
           return message
    }
}