import { View, Text, SafeAreaView , Switch , StyleSheet, Image} from 'react-native';
import Checkbox from 'expo-checkbox';
import React  from 'react';
import firebase from 'firebase';
import { useDispatch , useSelector } from 'react-redux';
import { changeNotificationSettings } from '../../redux/actions/actions'
import { ScrollView } from 'react-native';
import NumberVerify from './NumberVerify';
import VerifyNumber from './VerifyNumber';
import { AntDesign , MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';


function NotificationsHeader()
{
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <View style={{display: 'flex', backgroundColor:"#455A64" , justifyContent: 'space-between' , alignItems:'flex-start' , flexDirection:'row' , paddingHorizontal:20 , paddingVertical:10 }}>
    <View style={{marginRight:20}}>
        <Text style={{fontSize:18, color:"#fff" , fontWeight:'bold' , textAlign:'left'}}>Allow Whatsapp Notifications</Text>
        <Text style={{color:"#fff" , textAlign:'left'}} > Recieve user friendly updates through whatsapp. Each message costs 50c</Text>
    </View>
    <View style={{alignItems: 'center'}} >
{/* 
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        /> */}

<Image source={require("../../../assets/images/icons/whatsapp.png")}/>

    </View>
</View>
  )
}


/*****   LOADER LOADER UPDATES THE REDUX*** */

function Setting(props)
{
  const user  = firebase.auth().currentUser
  const [isSelected, setSelection] = React.useState(props.settingState);
  const dispatch = useDispatch()

  function updateToFirebase(obj){
          
       dispatch(changeNotificationSettings(obj))
      //  firebase.firestore().collection('Trackers').doc(user.uid).update({
      //   Notifications: obj
      // })
  }

  function sortObject(obj){
    return {
      All: obj.All,
      pre_transit: obj.pre_transit,
      in_transit:obj.in_transit,
      out_for_delivery:obj.out_for_delivery,
      delivered:obj.delivered,
      return_to_sender:obj.return_to_sender,
      failure:obj.failure,
  }

  }
  
  
  function setSetting(bool){

   // console.log(bool)
    if (props.settingName=="All") {
        updateToFirebase({
          All: bool,
          pre_transit: bool,
          in_transit:bool,
          out_for_delivery:bool,
          delivered:bool,
          return_to_sender:bool,
          failure:bool,
      })
    return
    } 

    //NOT GOOD
    if (props.settingName == "pre_transit"){ updateToFirebase(sortObject({...props.setting ,pre_transit:bool})); return}
    if (props.settingName == "in_transit"){ updateToFirebase(sortObject({...props.setting ,in_transit:bool})); return}
    if (props.settingName == "out_for_delivery"){ updateToFirebase(sortObject({...props.setting ,out_for_delivery:bool})); return}
    if (props.settingName == "delivered"){ updateToFirebase(sortObject({...props.setting ,delivered:bool})); return}
    if (props.settingName == "return_to_sender"){ updateToFirebase(sortObject({...props.setting ,return_to_sender:bool})); return}
    if (props.settingName == "failure"){ updateToFirebase(sortObject({...props.setting ,failure:bool})); return}
    

  }


  function onChangeSetting(bool){
      //FIREBASE 
     

    setSelection(bool)
  }


    return (

      <View style={{  justifyContent:'space-between' , marginBottom:-25 ,padding:20,flexDirection:'row' , paddingHorizontal:20 , marginTop:25 ,borderTopWidth:0.5 , borderTopColor:'grey' }}>
      <View style={{marginRight:20 , display:'flex', justifyContent:'center' , alignItems:'center'}}>
        <View style={{alignSelf:'center'}}>
                <Text style={{fontSize:15}} >{props.settingName}</Text>
        </View>
        
          
      </View>
      <View style={{ display:'flex', flexDirection:'row',justifyContent:'space-between' , alignItems:'center'}} >
  
        {/* <Checkbox
          value={props.settingState}
          onValueChange={setSetting}
          style={styles.checkbox}
        /> */}

            {
              props.settingState ?
        <View style={{backgroundColor:"#000", marginRight:10, padding:10 , paddingHorizontal:12 }}>
          <Text style={{color:"#fff"}} >ON</Text>
        </View> :
        <View style={{backgroundColor:"whitesmoke" , marginRight:10 , padding:10 ,borderColor:"#000" , borderWidth:1 }}>
          <Text style={{color:"#000"}} >OFF</Text>
        </View>
            }


          <View>

          <Switch
        trackColor={{ false: "#767577", true: "#81b0ff"}}
        thumbColor={props.settingState ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setSetting}
        value={props.settingState}
        />

          </View>
     
  
      </View>
  </View>
    
    )


}

function VerifyOrContinue({phoneNumber , setPhoneNumber , setVerify})
{
  
  const phoneInput = React.useRef(null);
  const user  = firebase.auth().currentUser


  function uploadPhoneNumber(){

    if(user){
      firebase.firestore().collection('Trackers').doc(user.uid).update({
        whatsapp: phoneNumber
    }).then(() => setVerify(false))
    .catch(console.log)
    }
    
  }
 
  const handleContinue = ()=>{
    if(!phoneNumber){
      alert('Please enter your Whatsapp Number')
      return;
    }
    console.log(typeof phoneNumber)

    if(phoneNumber){
      if(phoneNumber.length <8){ alert("Please enter a valid Phone Number"); return;}

      Alert.alert(
        "Confirm Number",
      `Are sure ${phoneNumber} is the correct Whatsapp Number? `,
        [
          {
            text: "NO",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "YES", onPress: () => uploadPhoneNumber() }
        ]
      );
    }

  

  }

  return(
    <View style={{flex:1, display:'flex' , justifyContent:'center' , alignItems:'center'}}>

          <View style={{flex:1,margin:10}} >
                <Text style={{margin:5}} ><Image resizeMode="cover" style={{width:20, height:20}} source={require("../../../assets/images/icons/whatsapp.png")}/>  Enter Whatsapp Number</Text>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    withShadow
                    autoFocus
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textInput}
                    onChangeFormattedText={text => {
                        setPhoneNumber(text);
                    }}
                />
        </View>

          <View style={{flex:1,margin:10 , display:'flex' , justifyContent:'space-evenly',alignItems:'center' , flexDirection:'row'}} >
                    <View>

                        <TouchableOpacity onPress={handleContinue} style={{padding:20, marginRight:50, borderRadius:10, backgroundColor:'#000'}} >
                        <Text style={{color:'#fff' , textAlign:'center'}}>Continue</Text><AntDesign style={{textAlign:'center'}} color="#fff" name="arrowright" size={30}  />
                       </TouchableOpacity>

                    </View>
                
                      <View>
                          <TouchableOpacity style={{padding:20,borderRadius:10, backgroundColor:'#000'}}>
                          <Text style={{color:'#fff' , textAlign:'center'}}>Verify Number</Text>
                            <MaterialCommunityIcons style={{textAlign:'center'}} color="#fff" size={30} name="cellphone-text" />
                          </TouchableOpacity>
                      </View>
                  
        </View>

    </View>
  )

}


export default function Whatsapp() {
  const settings  = useSelector(state => state.notificationSetting)
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verify , setVerify] = React.useState(true)

  function checkNumber(){
     const user  = firebase.auth().currentUser

     if(user){
       console.log('Were in user')
       firebase.firestore().collection('Trackers').doc(user.uid).get()
       .then(snapshot => {
         console.log(snapshot.data().Whatsapp)
         if(snapshot.data().whatsapp){
           setPhoneNumber(snapshot.data().whatsapp)
           setVerify(false)
         }
       })
       .catch(console.log)
     }
  }

  React.useLayoutEffect(()=>{
        checkNumber()
  },[])



  return (
   <SafeAreaView style={{flex:1}}>
     {/* <Pressable onPress={()=> console.log(firebase.auth().currentUser)}><Text>Press me</Text></Pressable> */}
     { 
     verify ? 
     <VerifyOrContinue phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setVerify= {setVerify} />
     :
     <View>
     <NotificationsHeader/>
     <View style={{display:'flex' , justifyContent:'center' ,alignItems:'center' , marginTop:20}} >
             <Text style={{fontWeight:'bold', fontSize:18, color:"#455A64"}} >{phoneNumber}</Text>
     </View>
   
    <ScrollView style={{paddingBottom:20}} >

    {
       Object.keys(settings).map((key , index) =>
       <Setting
        setting={settings} 
        key={index} 
        settingName={key} 
        settingState={settings[key]} 
        />
        )
     }
    </ScrollView>

     </View>
}  
    
     
      
   </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  phoneContainer: {
    width: '100%',
    height: 50,
  },
  button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  textInput: {
    paddingVertical: 0,
  },
});
