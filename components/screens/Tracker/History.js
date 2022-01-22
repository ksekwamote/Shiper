import React from 'react'
import { StyleSheet, Text, View  , TouchableOpacity, ScrollView , SafeAreaView} from 'react-native'
import { AntDesign , FontAwesome , Octicons , MaterialCommunityIcons ,Ionicons,Entypo, FontAwesome5} from '@expo/vector-icons';
import { useSelector } from 'react-redux'


function HistoryHeader() {
    return (
        <View >
            <View style={{display:'flex' , justifyContent: 'space-between' , alignItems: 'center' , flexDirection:'row'}} >
                
               <TouchableOpacity style={styles.buttons}>
                    <AntDesign name="arrowleft"  color="black" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttons}>
                    <FontAwesome name='calendar' color="black" size={20} />
                </TouchableOpacity>
       
               
            </View>

        </View>
    )
}

function HistoryBody(props){

    const item  = useSelector(state => state.trackingItem)
    const {tracking_details,carrier_detail} = item

    return (
        <View style={{marginTop:40}}>
            <View style={{display: 'flex' , justifyContent: 'space-between', alignItems: 'center' , flexDirection: 'row' , marginBottom:20}} >
                <View style={{display:'flex' , justifyContent: 'space-between' , alignItems: 'center' , flexDirection: 'row'}}>
                    <Octicons name='package' color='black' size={20} />
                    <Text style={{fontWeight: 'bold' , fontSize: 20}}> {item.tracking_code} </Text>
                </View>
            </View>

            <View style={{borderRadius: 15 , backgroundColor: 'black' , padding:10}} >
                <View style={{display:'flex' , justifyContent: 'space-between' , alignItems: 'center' , flexDirection: 'row'}}>
                   <View style={styles.dest}>
                        <Text style={{color:'white'}}>from</Text>
                        <Text style={styles.loc}>{props.tracking_location}</Text>
                   </View>

                   <View style={{display:'flex', justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
                       <View style={{borderBottomWidth:2 , borderBottomColor:'white'}}>
                             <MaterialCommunityIcons name='truck-outline' color="white" size={40} />
                       </View>
                       <Text style={{color:'white'}}>4 days</Text>
                   </View>

                   <View style={styles.dest}>
                        <Text style={{color:'white'}}>to</Text>
                        <Text style={styles.loc}>HOUSTON TX, 77001</Text>
                   </View>
                </View>
                <View style={{display:'flex' , justifyContent: 'space-between' , alignItems: 'center' , flexDirection: 'row'  , marginTop:20}}>
                   <View style={styles.dest}>
                        <Text style={{color:'white'}}>status</Text>
                        <Text style={styles.loc}>{item.status}</Text>
                   </View>

                   <View style={styles.dest}>
                        <Text style={{color:'white'}}>type</Text>
                        <Text style={styles.loc}>Depature</Text>
                   </View>

                   <View style={styles.dest}>
                        <Text style={{color:'white'}}>weight</Text>
                        <Text style={styles.loc}>700g</Text>
                   </View>
                </View>


            </View>

        </View>
    )
}

function HistoryFooter() {
    return (
        <View style={{marginTop: 20  , backgroundColor:'white' , padding:10 , borderRadius:10}}>
            <Text style={{fontSize:20 , fontWeight: 'bold'}} >History</Text>
            <View style={{marginTop:20 , display: 'flex' , justifyContent: 'space-evenly' , alignItems: 'center' , flexDirection: 'row'}}>

        	        <View style={styles.progress_line}>
                        <View style={styles.check_icon} >
                        <MaterialCommunityIcons name='truck-fast' color="black" size={25} />
                        </View>

                        <View style={styles.check_icon}>
                            <Entypo name="location"  color="black" size={25} />
                        </View>

                        <View style={styles.check_icon}>
                            <AntDesign name="checkcircle"  color="green" size={25} />
                        </View>

                        <View style={styles.check_icon}>
                            <AntDesign name="checkcircle"  color="green" size={25} />
                        </View>
                    </View>

                    <View style={styles.progress_check}>

                        <View style={styles.check}>
                            <Text>Estimateds delivery time is <Text style={{fontWeight:'bold'}}>March 22</Text> </Text>
                            <Text style={{color: 'grey'}}>Russia, Omsk</Text>
                        </View>

                        <View style={styles.check}>
                                <Text> Arrived in destination country </Text>
                                <Text style={{color: 'grey'}}><Ionicons name='time-outline' color="grey"  />  6 Mar , 12:32 PM - Russia</Text>
                        </View>

                        <View style={styles.check}>
                                <Text> Sent to destination country </Text>
                                <Text style={{color: 'grey'}}><Ionicons name='time-outline' color="grey"  />  5 Mar , 6:34 PM - China , Shanhai</Text>
                        </View>

                        <View style={styles.check}>
                                <Text> Accepted by DHL Expresss </Text>
                                <Text style={{color: 'grey'}}><Ionicons name='time-outline' color="grey"  />  3 Mar , 01:21 AM - China , Shanhai</Text>
                        </View>

                    </View>
            </View>
        </View>
    )
}

function ProductDetails() {
    return (
        <View style={{marginTop:20}}>
             <Text style={{fontSize:20 , fontWeight: 'bold'}} >Product Details</Text>
             <View style={{backgroundColor: 'white' , padding:15 , borderRadius:10 ,marginTop:20}}>

                 <View style={{display:'flex' , flexDirection:'row'}}>
                     <View style={{padding:10 , borderRadius:25 , backgroundColor: 'lightgreen'  , width:45 , height:45 , marginRight: 20}}>

                         <FontAwesome5 name="couch" size={20} color="green" />
                     </View>
                     <View style={{borderBottomColor:'lightgrey' , borderBottomWidth:1 , paddingBottom:10 }}>
                         <Text style={{fontWeight:'bold', fontSize:18}}>Furniture</Text>
                         <Text style={{color:'grey'}}> Monogoroh , Washington DC , New York</Text>
                         <Text style={{color:'grey'}}> Rashed  ,Kondokar</Text>
                         <Text style={{color:'grey'}}> 01435670405</Text>
                         

                     </View>

                 </View>
                 <View style={{display:'flex' , flexDirection:'row'}}>
                     <View style={{padding:10 , borderRadius:25 , backgroundColor: 'lightgreen'  , width:45 , height:45 , marginRight: 20}}>

                         <FontAwesome5 name="laptop" size={20} color="green" />
                     </View>
                     <View style={{borderBottomColor:'lightgrey' , borderBottomWidth:1 , paddingBottom:10}}>
                         <Text style={{fontWeight:'bold', fontSize:18}}>Mobile and Laptop</Text>
                         <Text style={{color:'grey'}}> Monogoroh , Washington DC , New York</Text>
                         <Text style={{color:'grey'}}> Rashed  ,Kondokar</Text>
                         <Text style={{color:'grey'}}> 01435670405</Text>
                     </View>

                 </View>

             </View>

        </View>
    )
}

function RecieverDetails() {
    return (
        <View style={{marginTop:20}}>
             <Text style={{fontSize:20 , fontWeight: 'bold'}} >Reciever Details</Text>
             <View style={{backgroundColor: 'white' , padding:15 , borderRadius:10 ,marginTop:20}}>

                 <View style={{display:'flex' , flexDirection:'row'}}>
                     <View style={{padding:10 , borderRadius:25 , backgroundColor: 'lightgreen'  , width:45 , height:45 , marginRight: 20}}>

                         <Ionicons name="person" size={20} color="green" />
                     </View>
                     <View style={{paddingBottom:10 }}>
                         <Text style={{fontWeight:'bold', fontSize:18}}>Ibrahim Emran</Text>
                         <Text style={{color:'grey'}}> Monogoroh , Washington DC , New York</Text>
                         <Text style={{color:'grey'}}> Rashed  ,Kondokar</Text>
                         <Text style={{color:'grey'}}> 01435670405</Text>
                     </View>

                 </View>
             </View>

        </View>
    )
    
}

export default function History() {

    const item = useSelector(state => state.trackingItem)


    return (
            <View style={{paddingHorizontal:20}}>
                <ScrollView>
                    <HistoryHeader/>
                    <HistoryBody/>
                    <HistoryFooter/>
                    <ProductDetails/>
                    <RecieverDetails/>

                </ScrollView>
                
            </View>
      
           
      
    )
}

const styles = StyleSheet.create({
    check_icon:{
        height:75,
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center'
    },
    progress_line:
    {
      
    },
    progress_check:
    {

    },
        buttons: {
            backgroundColor: 'white' ,
            padding: 10 ,
            borderRadius: 10
        },
        dest: {
            display:'flex' ,
         flexDirection: 'column', 
         justifyContent: 'flex-start'
        },
        loc: {
            fontWeight: 'bold' ,
         color: "white" ,
          fontSize:15
        },
       check: {
        height:75,
        display: 'flex',
        justifyContent: 'center',
       alignItems:'flex-start'
    } ,
    checkContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20
    }
})
