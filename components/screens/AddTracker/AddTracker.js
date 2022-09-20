import React from 'react'
import { StyleSheet, Text, View , TextInput , Picker  , TouchableOpacity, ScrollView} from 'react-native'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { changeTrackingInfo } from '../../redux/actions/actions'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Colors } from 'react-native-paper';
import firebase from 'firebase'



function AddTracker() {

    const [carrier , setCarrier] = React.useState('UPS')
    const ID = useSelector(state => state.trackingID)
    const [trackingCode , setTrackingCode] = React.useState(ID)
    const [itemDes , setItemDes] = React.useState('')
    const [loading ,setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const user  = firebase.auth().currentUser
    const data = firebase.firestore().collection("Trackers").where(firebase.firestore.FieldPath.documentId(), "==", user.uid).get()

    function updateFirestore(){

        firebase.firestore().collection('Trackers').doc(user.uid)
        .update({Tracker: firebase.firestore.FieldValue.arrayUnion({
            trackingCode, title: itemDes , carrier 
        })}).then(()=>console.log('done')).catch(err=> console.log(err))
  
    }

    function insertFirestore(){        ///fix
        firebase.firestore().collection('Trackers').doc(user.uid).set({
            Tracker: [{
                trackingCode, title: itemDes , carrier 
            }]
        })
    }


    function onAddTracker(){
        setLoading(true)
        axios.post('https://us-central1-shiper-ac3d7.cloudfunctions.net/tracker' , {code : trackingCode , carrier: carrier})
        .then(res => dispatch(changeTrackingInfo(res.data)))
        .then(() => updateFirestore())
        .then(()=> navigation.navigate('tracker'))
        .then(res => setLoading(false))
        .catch(err => console.log(err))+

        console.log('Hello World')
    }

    return (
        <ScrollView style={{flex:1 , margin: 25}}>
            <View>
                <View style={{justifyContent:'center' , alignItems:'center'}} >
                    <Text style={{fontWeight: 'bold' , fontSize:25}}>Track your parcel</Text>
                </View>

                <View style={{ marginTop: 20 , display:'flex' , justifyContent:'center' , alignItems:'center'}}>

                    <View style={{ marginVertical:10 }}>
                        <Text style={styles.text}> TRACKING CODE</Text>
                        <TextInput onChangeText={setTrackingCode} style={styles.input} placeholderTextColor={'gray'} value={trackingCode} ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                        <Text style={styles.text}> Item(s) Description</Text>
                        <TextInput onChangeText={setItemDes} style={styles.input} placeholderTextColor={'grey'} placeholder='Gucci Handbag and Make Up Kit' ></TextInput>
                    </View>

                    <View style={{marginVertical:10}}>
                        <Text style={styles.text}> Carrier(optional)</Text>
                    </View>
                </View>

                <View style={styles.center}>
                    {/* Autocomplete Picker */}
                <Picker
                        selectedValue={carrier}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setCarrier(itemValue)}>
                        <Picker.Item label="USPS" value="USPS" />
                        <Picker.Item label="UPS" value="UPS" />
                        <Picker.Item label="FedEx" value="FedEx" />
                        <Picker.Item label="DHL Express" value="DHL Express" />
                        <Picker.Item label="LaserShip" value="LaserShip" />
                    </Picker>
                </View>

                {
                    loading ?  <ActivityIndicator size={'large'} animating={true} color={Colors.red800} />: 
                <View style={styles.center} >
                    <TouchableOpacity onPress={()=> onAddTracker()} style={{ display: 'flex' , justifyContent:'center' , alignItems: 'center' , backgroundColor:'black' , borderRadius:15 , width: 250 , padding:15}}>
                        <Text style={{color:'white' , fontWeight:'bold'}}>Add A Trackers</Text>
                    </TouchableOpacity>
                </View>

            }

                {/* <TouchableOpacity  style={{marginTop:20}} onPress={() => testFirestore()} > 
                            <Text>Press here </Text>
                </TouchableOpacity> */}


              

                

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {borderRadius:10 , borderWidth:1  , padding: 10 , height:50 , width:250},
    text: {fontStyle:'italic' ,marginVertical:5 , justifyContent:'center' , fontWeight:'bold'},
    center: {display:'flex' , justifyContent: 'center' ,alignItems:'center'}
})

export default  AddTracker