import React, { useEffect } from 'react'
import { View, Text  , StyleSheet, ScrollView, Image , FlatList} from 'react-native'
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


const TrackingTabs  = (props) => {
    return (
        
       <TouchableOpacity onPress={()=> props.setSelected(props.status)}  key={props.key}  style={[styles.UnselectedStatus ,props.selected && styles.selectedStatus ]} >
            <Text style={[styles.unselectedText ,props.selected && styles.selectedText ]} >{props.status}</Text>
       </TouchableOpacity>
    )
}


const TrackingHeader = (props) => {

            /***SUPER SLOWWWWWW */

        const [selected  , setSelected] = React.useState("All")
        const status = ["All","pre_transit" , "in_transit" , "out_for_delivery" , "delivered" , "return_to_sender" , "failure"]

        function onSelect(select) {
                setSelected(select)
                props.setSelect(select)
          }

    return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryContainer}
                >
                    {
                        status.map((item,index)=>{
                                return (
                                    <TrackingTabs
                                    selected={item==selected}
                                    key={index}
                                    status={item}
                                    setSelected={onSelect}
                                    />
                                )
                        })
                    }

                </ScrollView>

                {/* <Text style={styles.font} >Your Parcels</Text>
                <TouchableOpacity style={styles.equal}>
                    <SimpleLineIcons style={styles.rotate} name="equalizer" size={20} color="black" />    
                </TouchableOpacity>
                <TrackingTabs/> */}
            </View>
    )

}

const TrackingItem = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user  = firebase.auth().currentUser
    const bool = true


    function onClickTrackItem(item)
    {
            dispatch(changeTrackingItem(item))
           // handleNotification()
            navigation.navigate('trackingDetails')

    }

    const track = props.trackItem
    const location = track.carrier_detail.origin_location
    const destination = track.carrier_detail.destination_location


    return (
        <View>
            <TouchableOpacity  onPress={()=> onClickTrackItem(track) } style={{...styles.item , borderRightColor:statusColor(track.status)  }}>
            <View style={styles.deliveryPack}>

                <View style={styles.delivery}>
                    <Image style={{width:50 , height:30}} source={require('../../../assets/images/logo/dhl.png')} />
                </View>
                <View style={styles.itemDetails} > 
                    <Text style={{fontWeight: 'bold' , marginVertical:5}}>{track.title}</Text>
                    <Text style={{ fontSize:12, marginVertical:5}}>{track.tracking_code}</Text>
                   <Text style={{fontSize:12, marginVertical:5}}> {location}</Text> 
                </View>
            </View>
           <View style={{...styles.centerRow ,backgroundColor: statusColor(track.status)}}>
                <Text style={{fontWeight:'bold' }} >{track.status}</Text>
            </View>
        </TouchableOpacity>
          
        </View>
    )

   
}

export default function Tracking() {
    const trackingInfo = useSelector(state => state.trackingInfo)
    const dispatch = useDispatch()
    const user  = firebase.auth().currentUser
    const [select  , setSelect] = React.useState("All")

    function getTrackingData(trackingCode , carrier , title){
         axios.post('https://us-central1-shiper-ac3d7.cloudfunctions.net/tracker' , {code:trackingCode , carrier })
            .then(res => dispatch(changeTrackingInfo({...res.data , title})))
            .then(()=> console.log(trackingInfo))
            .catch(err => console.log("The error here is: "+err))
    }

    function handleClick(){
        firebase.firestore().collection("Trackers").doc(user.uid).update({
            ExpoToken: "575gv434N"
        })
    }
    

    useEffect(() =>  {
        firebase.firestore().collection('Trackers')
        .doc(user.uid).get()
            .then(snapshot => snapshot.data().Tracker.forEach(item => getTrackingData(item.trackingCode , item.carrier ,item.title )))
        //console.log(user.uid)
    }, []);

    return (
        
        <View>
             <TrackingHeader
                setSelect={setSelect}
             />
                <FlatList 
                    contentContainerStyle={{ paddingBottom: 30}}
                    data={trackingInfo.map(item => item)}
                    keyExtractor={item => item.key}
                    renderItem={({item , index})=>{
                        if (select=="All")
                            return(

                                <TrackingItem 
                                key={index}
                                trackItem={item}
                                />
                            )
                        if(item.status ==select){
                            return(

                                <TrackingItem 
                                key={index}
                                trackItem={item}
                                />
                            )

                        }
                    
                    }}
                
                />
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
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
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
    categoryContainer:{
        flexDirection:"row",
        justifyContent: "space-between",
      
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
    selectedStatus: { 
        display:'flex' ,
    justifyContent:'center' ,
    borderColor:"#fff" ,
     marginRight:10,
     alignItems:'center', 
     padding:10 ,
     paddingHorizontal:15 ,
     backgroundColor:"#000" ,
     borderRadius:25
    },

    UnselectedStatus: {
         display:'flex' ,
    justifyContent:'center' ,
    borderColor:"#000" ,
    borderWidth:1,
     marginRight:10,
     alignItems:'center', 
     padding:10 ,
     paddingHorizontal:15 ,
     backgroundColor:"#fff" ,
     borderRadius:25} ,
     selectedText:{color:"#fff" , marginBottom:3},
     unselectedText:{color:"#000" , marginBottom:3},


})