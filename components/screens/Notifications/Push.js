import { View, Text, SafeAreaView , Switch , StyleSheet, ScrollView , Image  , ActivityIndicator} from 'react-native';
import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';




function NotificationsHeader()
{
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <View style={{display: 'flex' , padding:10, backgroundColor:"#000" , justifyContent: 'space-between' , alignItems:'flex-start' , flexDirection:'row' , paddingHorizontal:20 }}>
    <View style={{marginRight:20}}>
        <Text style={{fontSize:18 , color:"#fff" , fontWeight:'bold'}}>Allow Push Notifications</Text>
        <Text style={{color:"#fff"}} >Recieve push notifcations on key status updates.</Text>
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

        
<Image source={require("../../../assets/images/icons/notification.png")}/>
    </View>
</View>
  )
}


/*****   LOADER LOADER UPDATES THE REDUX*** */

function Setting(props)
{
  const user  = firebase.auth().currentUser
  const [isSelected, setSelection] = React.useState(props.settingState);
  const trackersRef = firebase.firestore().collection("Trackers").doc(user.uid)
  const dispatch = useDispatch()


  function updateToFirebase(obj){
    console.log(obj)
    trackersRef.update({
      "Menu.PushNotification":obj
    }).then(console.log)
    .catch(console.log)    
  }
  function setSetting(bool){

    //NOT GOOD
    if (props.settingName == "pre_transit"){ updateToFirebase({...props.setting ,pre_transit:bool}); return}
    if (props.settingName == "in_transit"){ updateToFirebase({...props.setting ,in_transit:bool}); return}
    if (props.settingName == "out_for_delivery"){ updateToFirebase({...props.setting ,out_for_delivery:bool}); return}
    if (props.settingName == "delivered"){ updateToFirebase({...props.setting ,delivered:bool}); return}
    if (props.settingName == "return_to_sender"){updateToFirebase({...props.setting ,return_to_sender:bool}); return}
    if (props.settingName == "failure"){ updateToFirebase({...props.setting ,failure:bool}); return}
 
  }


  function onChangeSetting(bool){
     setSelection(bool)
  }


    return (

      <View style={{  justifyContent:'space-between' , marginBottom:-25 ,padding:10,flexDirection:'row' , paddingHorizontal:20 , marginTop:25 ,borderTopWidth:0.5 , borderTopColor:'#a6a6a6' }}>
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

function NoticationSettings()
{


}


export default function Push() {

  //const settings  = useSelector(state => state.notificationSetting)
  const user  = firebase.auth().currentUser
  const [loading , setLoading] = React.useState(true)
  const trackersRef = firebase.firestore().collection("Trackers").doc(user.uid)
  const [push , setPush ] = React.useState()


  useEffect(()=>{
   trackersRef.get()
   .then(snapshot => {
     setPush(snapshot.data().Menu.PushNotification)})
   .then(()=> setLoading(false))
   .catch(console.log)
  })

  return (
   <SafeAreaView style={{flex:1}}>
     {
          loading ?  <View style={{ display: 'flex', justifyContent: "center", alignItems: "center", flex:1}} >
          <ActivityIndicator color={"#000"} animating={loading} size={"large"} />
          <Text style={{textAlign:'center' ,color:'#000' ,fontSize:18 ,marginTop:20}} >Loading...</Text>
    </View> :
    <>
     <NotificationsHeader/>
     <ScrollView style={{paddingBottom:50}} > 
      
        <Setting
        setting={push} 
        settingName={"pre_transit"} 
        settingState={push["pre_transit"]} 
        style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
        />
        <Setting
        setting={push} 
        settingName={"in_transit"} 
        settingState={push["in_transit"]} 
        style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
        />
        <Setting
        setting={push} 
        settingName={"out_for_delivery"} 
        settingState={push["out_for_delivery"]} 
        style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
        />
        <Setting
        setting={push} 
        settingName={"delivered"} 
        settingState={push["delivered"]} 
        style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
        />
        <Setting
        setting={push} 
        settingName={"return_to_sender"} 
        settingState={push["return_to_sender"]} 
        style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
        />
        <Setting
        setting={push} 
        settingName={"failure"} 
        settingState={push["failure"]} 
        style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
        />    
     </ScrollView>
     </>
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
});
