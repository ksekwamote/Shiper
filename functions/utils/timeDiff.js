

module.exports = async (date) => {

   if ( Math.abs(new Date()- new Date(date))/ 36e5 <= 6) return true
   return false
    
}