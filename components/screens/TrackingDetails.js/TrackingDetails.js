import React ,{useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View , Dimensions, Image, ScrollView } from 'react-native'
import axios from 'axios';
import { useSelector } from 'react-redux';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function getShortDate(date) {
    date = new Date(date)
    const days = ['Sun' , 'Mon' ,'Tue' ,'Wed' , 'Thu' ,'Fri' , 'Sat']
    const mons= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return ` ${days[date.getDay()]} , ${date.getDate()} ${mons[date.getMonth()]}`

}

function localtime(date = new Date(item)){
    return (date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}))
}
function dateDiff(date){ // moments
    return new Date(date).getDate() - new Date().getDate()
}

const DetailsHeader  = (props) => {
    const detail = props.details
    const {tracking_details} = props.details
    const [message  , setMessage] = React.useState('')
    const [date  , setDate] = React.useState('')
    const [daysLeft , setDaysLeft] = React.useState('')

    useEffect(() => {
    
        setDate(getShortDate(new Date(detail.est_delivery_date)))
        setDaysLeft(`${dateDiff(detail.est_delivery_date)} Days Left`)
        statusController(detail.status)
        
    }, [])

    function statusController(status){
        if (status == 'delivered'){
            setMessage('Packaged Delivered On')
            setDate( getShortDate(new Date(tracking_details[tracking_details.length-1].datetime)))
            setDaysLeft('0 Days Left')
        }
        else if(status =='return_to_sender'){
            setMessage('Package returned to Sender , Address Does not Exist'); setDate(''); setDaysLeft('')
        }
        else if (status =='failure'){
            setMessage('Dead Mail');setDate(''); setDaysLeft('')
            
        }
        else {
            setMessage('Expected to Arrive on')
        }
    }

    return (
        <View>
             <View style={styles.statusContainer}>
                <Text style={{color:"#fff" ,fontWeight: 'bold' , fontSize:20 }}>{message}</Text>
                <Text style={{color:"#fff" ,fontWeight: 'bold' , fontSize:40 , }}>{date}</Text>
                {
                   date=="" ? <Image style={{margin:0 , padding:0 ,marginTop:-50}} source={require("../../../assets/images/icons/warning.png")} />:<></>
                }
                <Text style={{color:"#000" ,fontWeight: 'bold' , fontSize:20 , }}>{daysLeft}</Text>
                
            </View>
            <View style={{display:'flex' , justifyContent:'center' , alignItems:'center', backgroundColor:'lightblue' }} >
                <Text style={{color:"#000" ,fontWeight: 'bold' , fontSize:20 , }}>STATUS: {detail.status}</Text>    
            </View>
            
        </View>
    )
}

const TrailItem = (props) => {

    const trail = props.trail
    const {tracking_location} = trail
    const date = getShortDate(new Date(trail.datetime))
    const time  = localtime(new Date(trail.datetime))
    const location = `${tracking_location.city} , ${tracking_location.state} ${tracking_location.zip}`

    return (
        <View style={{backgroundColor: 'lightgrey' , padding:10 , margin:5 , borderLeftWidth:5}}>
            <View style={{display:'flex' ,justifyContent:'space-between' , alignItems: 'flex-start'  , flexDirection:'row'}}>
                <Text>{date}</Text>
                <Text>{time} </Text>
            </View>
            <View style={{marginVertical:5}}>
                <Text style={{fontWeight: 'bold' , fontSize:20}}>{trail.message}</Text>
            </View>
            <View>
                <Text>{location}</Text>
            </View>

        </View>
    )

}

const TrackingDetails = () => {

    const trackItem = useSelector(state => state.trackingItem)
    const [details ,setDetails] = useState(trackItem)

    // useEffect(() => {

        

     
    // }, [])

    return (
        <SafeAreaView style={styles.center}>
            <DetailsHeader details = {details} />
            <ScrollView>
                {
                    details.tracking_details.reverse().map((item, index)=> <TrailItem key={index} trail={item} />)
                }
                
            </ScrollView>
           
        </SafeAreaView>
    )
}

export default TrackingDetails

const styles = StyleSheet.create({
    center:{
        flex:1,
        display:'flex'
    },
    statusContainer:{
        backgroundColor:'black' , 
        height:windowHeight*0.25 ,
        width:windowWidth,
        display:'flex',
        justifyContent:'center' ,
        alignItems:'center'
    }
})
