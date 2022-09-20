import { View, Text, SafeAreaView , Switch , StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import React from 'react';
import firebase from 'firebase';
import { useDispatch , useSelector } from 'react-redux';
import { changeNotificationSettings } from '../../redux/actions/actions'
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



function NotificationsHeader()
{
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <View style={{display: 'flex' , justifyContent: 'space-between' , alignItems:'flex-start' , flexDirection:'row' , paddingHorizontal:20 }}>
    <View style={{marginRight:20}}>
        <Text style={{fontSize:20}}>Allow Push Notificationss</Text>
        <Text>Recieve push notifcations on key status updates</Text>
    </View>
    <View style={{alignItems: 'center'}} >

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        />

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
       firebase.firestore().collection('Trackers').doc(user.uid).update({
        Notifications: obj
      })
  }

  function sortObject(obj){
    return {
      All: obj.All,
      pre_transit: obj.pre_transit,
      in_transit:obj.in_transit,
      out_for_delivery:obj.out_of_delivery,
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
          out_of_delivery:bool,
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
      <View style={{justifyContent:'center' , alignItems:'center'}} >
  
        <Checkbox
          value={props.settingState}
          onValueChange={setSetting}
          style={styles.checkbox}
        />
  
      </View>
  </View>
    
    )


}

function NoticationSettings()
{


}


export default function Notifications() {


  
  const settings  = useSelector(state => state.notificationSetting)
  const navigation = useNavigation()

  return (
   <SafeAreaView>
     <TouchableOpacity onPress={()=> navigation.navigate('Push Notifications') } style={{ padding:10 , borderWidth:0.5 , borderColor:"grey" ,display:'flex' , justifyContent:'space-between' ,alignItems:'center' , flexDirection:'row'}} >
       <View>
          <Text style={{fontSize:20}} >Push Notifications</Text>
       </View>
       <View>
            <AntDesign name="arrowright" size={30}  />
       </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=> navigation.navigate('Whatsapp Notifications') } style={{ padding:10 , borderWidth:0.5 , borderColor:"grey" ,display:'flex' , justifyContent:'space-between' ,alignItems:'center' , flexDirection:'row'}} >
       <View>
          <Text style={{fontSize:20}} >Whatsapp Notifications</Text>
       </View>
       <View>
            <AntDesign name="arrowright" size={30}  />
       </View>
     </TouchableOpacity>
    
      
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
