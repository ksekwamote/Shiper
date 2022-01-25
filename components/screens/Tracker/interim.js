import React, { useEffect } from 'react'
import { View, Text  , StyleSheet, ScrollView, Image} from 'react-native'
import { SimpleLineIcons ,MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector , useDispatch } from 'react-redux';
import { changeTrackingItem  , changeTrackingInfo} from '../../redux/actions/actions';
import firebase from 'firebase';
import axios from 'axios';

function statusColor (status){
    switch (status) {
        case 'delivered':
            return "lightgreen"
        case 'out_for_delivery':
            return "lightblue"
        case "failure":
            return "red"
        case 'in_transit':
            return "yellow"
        case 'pre_transit':
            return "orange"
        case 'return_to_sender':
            return "red"
        default:
            return "lightgrey"
    }
}

const TrackingHeader = () => {
    return (
            <View style={styles.container}>
                <Text style={styles.font} >Your Parcels</Text>
                <TouchableOpacity style={styles.equal}>
                    <SimpleLineIcons style={styles.rotate} name="equalizer" size={20} color="black" />
                   
                </TouchableOpacity>
            </View>
    )

}

const TrackingItem = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user  = firebase.auth().currentUser
    const bool = true

    //CONTEXT API STORE FIREBASE CONFIGS

  
    

    function onClickTrackItem(item)
    {
            dispatch(changeTrackingItem(item))
            navigation.navigate('trackingDetails')

    }



    function body(){
        return (
            <TouchableOpacity  onPress={()=> onClickTrackItem(props.trackItem) } style={{...styles.item , borderRightColor:statusColor(props.status)  }}>
            <View style={styles.deliveryPack}>

                <View style={styles.delivery}>
                    <Image style={{width:50 , height:30}} source={require('../../../assets/images/logo/dhl.png')} />
                </View>
                <View style={styles.itemDetails} > 
                    <Text style={{fontWeight: 'bold' , marginVertical:5}}>Dolcse and Gabanna Jerseys</Text>
                    <Text style={{ fontSize:12, marginVertical:5}}>{props.tracking_code}</Text>
                   <Text style={{fontSize:12, marginVertical:5}}> {props.tracking_location}</Text> 
                </View>
            </View>
           <View style={{...styles.centerRow ,backgroundColor: statusColor(props.status)}}>
                <Text style={{fontWeight:'bold' }} >{props.status}</Text>
            </View>
        </TouchableOpacity>
        )
    }


    return (
        <View>
            {
                body()
            }
        </View>
    )

   
}

export default function Tracking() {
    const trackingInfo = useSelector(state => state.trackingInfo)
    const dispatch = useDispatch()
    const user  = firebase.auth().currentUser

    function getTrackingData(trackingCode , carrier , title){
    
         axios.post('https://us-central1-shiper-ac3d7.cloudfunctions.net/tracker' , {code:trackingCode , carrier })
        .then(res => dispatch(changeTrackingInfo({...res.data , title})))
        //        //console.log('POST METHOD...'+trackingCode+"  ")
        //     }) // if doesnt already exist in state
          .catch(err => console.log("The error here is: "+err))
       // console.log(trackingCode , carrier , title)
    }
    

    useEffect(() =>  {

        console.log('Use Effectwwwwwwwwwwwwwwwwwwwww')

        firebase.firestore().collection('Trackers').where("uid" ,"==" ,user.uid).get()
            //.then(snapshot => snapshot.forEach(data=> getTrackingData(data.trackingCode ,data.carrier , data.title)))
            .then(snapshot => snapshot.forEach(item => getTrackingData(item.data().trackingCode ,item.data().carrier , item.data().title) ))//getTrackingData(item.data().trackingCode ,item.data().carrier , item.data().title)))
            .catch(err=> console.log(err))
      
    }, []);

    return (
        
        <View>
             <TrackingHeader/>
             <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    {/* <TrackingItem/> */}
                    {
                          trackingInfo.map((item,index)=> <TrackingItem 
                          key={index}
                          trackItem={item}
                          tracking_code={item.tracking_code}
                          tracking_location={item.carrier_detail.origin_location} 
                          destination_location={item.carrier_detail.destination_location}
                          status={item.tracking_details[item.tracking_details.length-1].status}
  
                          />  )

                    }
                   
                </View>
             </ScrollView>            
        </View>
    )
}




const styles = StyleSheet.create({

    status: {
        height:10, 
        width:10 , 
        borderRadius:10 , 
        backgroundColor: 'pink' , 
        marginRight:5
    },
    itemDetails: {
        display:'flex' , 
        justifyContent: 'flex-start' , 
        alignItems: 'flex-start' , 
        flexDirection: 'column'
    },

    deliveryPack: {
        display:'flex' , 
        justifyContent: 'flex-start' ,
        alignItems: 'center' , 
        flexDirection: 'row' 
    },
    delivery: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 50 , 
        height:50 , 
        borderRadius:5, 
        marginRight:10
    },
    scroll : {
            position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    font: {
        fontWeight: 'bold',
        fontSize: 20
    },
    container: {
        display:'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding:15, 
    },

    equal: {
        padding:8,
        backgroundColor:'rgba(211,211,211,0.8)',
        borderRadius:10,
        paddingHorizontal:10
    },
    rotate: {
        transform: [{ rotate: '90deg' }],
    },
    item: {
        height:85 ,
        borderTopWidth:0,
        borderBottomWidth: 1,
        borderTopColor: 'rgba(211,211,211 ,1)',
        borderBottomColor:'rgba(211,211,211 ,1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal:10,
        marginVertical:5,
        borderRightWidth: 8,
        //borderRightColor:statusColor(props.status) ,
        padding:10,
        backgroundColor:'#fff',
        borderTopRightRadius:10,
        borderBottomRightRadius:10

    },
    centerRow: {
        display:'flex' , 
        flexDirection: 'row' , 
        alignItems:'center',
        marginLeft:-50,
        //backgroundColor: statusColor(props.status),
        padding:3,
        paddingHorizontal:10,
        paddingBottom:5
        
    },

})