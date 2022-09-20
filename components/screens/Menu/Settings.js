import { StyleSheet, Switch, Text, View , TouchableOpacity  , Alert , ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect , useState } from 'react'
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

export function Account() {

    const user = firebase.auth().currentUser
    const navigation = useNavigation()


    function onDelete(){
        Alert.alert(
            "Delete Account",
          `Your account will be permanently deleted. All your data will be lost. Are you sure you want to do this?`,
            [
              {
                text: "NO",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "YES", onPress: () => deleteAccount() }
            ]
          );
    }

    function deleteAccount(){
        firebase.firestore().collection('Trackers').doc(user.uid).delete()
        .then(()=> alert('Account succesfully deleted'))
        .then(()=> navigation.navigate('signin'))
        .catch(console.log)
    }

    function signOut(){
        firebase.auth().signOut()
        .then(()=> navigation.navigate('signin'))
        .catch(console.log)
    }

  return (
    <View style={{flex:1}} >
        <TouchableOpacity onPress={()=>onDelete()} style={{padding:15 , borderWidth:0.5 , borderColor:'#000' }}>
            <Text style={{fontSize:18}} >Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:15 , borderWidth:0.5 , borderColor:'#000' }}>
            <Text style={{fontSize:18}} >End Premium Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> signOut() } style={{padding:15 , borderWidth:0.5 , borderColor:'#000' }}>
            <Text style={{fontSize:18}} >Logout</Text>
        </TouchableOpacity>
     
    </View>
  )
}


export default function Settings(){
    const [loading , setLoading]= React.useState(true)
    const [sortMostRecent, setSortMostRecent] =  React.useState("not yet")
    const [isBulk, setIsBulk] =  React.useState(true)
    const [isAvatar , setAvatar] = React.useState(true)
    const [notify , setNotify] = React.useState(true)
    const user  = firebase.auth().currentUser

    const trackersRef = firebase.firestore().collection("Trackers").doc(user.uid)

    useLayoutEffect(()=>{
    trackersRef.get()
    .then(snapshot => {
        const { sort_according_to_recent , bulk_uploading ,shipment_avatar ,enable_notificatons} = snapshot.data().Menu.settings
       // console.log(snapshot.data().Menu.Settings)
        setSortMostRecent(sort_according_to_recent)
        setIsBulk(bulk_uploading)
        setAvatar(shipment_avatar)
        setNotify(enable_notificatons)
    })
    .then(()=> setLoading(false)).catch(console.log)
    .catch(err => console.log('err'))
    },[])

    useEffect(()=>{
        if(sortMostRecent != "not yet"){
        trackersRef.update({
            "Menu.settings": ({
                sort_according_to_recent:sortMostRecent,
                bulk_uploading:isBulk,
                shipment_avatar:isAvatar,
                enable_notificatons:notify
            })
        })
    }689
    },[sortMostRecent , isBulk ,isAvatar ,notify])

  return (
   
<View style={{display:'flex' , flex:1}}>
    {
        loading ?  <View style={{ display: 'flex', justifyContent: "center", alignItems: "center", flex:1}} >
        <ActivityIndicator color={"#000"} animating={loading} size={"large"} />
        <Text style={{textAlign:'center' ,color:'#000' ,fontSize:18 ,marginTop:20}} >Loading...</Text>
  </View> :
        <>
        <View style={{display:'flex', paddingHorizontal:10 , justifyContent:'space-between', alignItems:'center' ,flexDirection:'row' , padding:10 , borderWidth:0.5 , borderColor:'#000'}}> 
                <View>
                     <Text style={{fontSize:20}} >Sort according to recent</Text>
                </View>

                <View>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={sortMostRecent ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setSortMostRecent(!sortMostRecent)}
                    value={sortMostRecent}
                    style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
                    disabled
                    />
                </View>
        </View>
        <View style={{display:'flex', paddingHorizontal:10 , justifyContent:'space-between', alignItems:'center' ,flexDirection:'row' , padding:10 , borderWidth:0.5 , borderColor:'#000'}}> 
                <View>
                     <Text style={{fontSize:20}} >Bulk Uploading</Text>
                </View>
                <View>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isBulk ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsBulk(!isBulk)}
                    value={isBulk}
                    style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
                    disabled
                    />
                </View>
        </View>
        <View style={{display:'flex', paddingHorizontal:10 , justifyContent:'space-between', alignItems:'center' ,flexDirection:'row' , padding:10 , borderWidth:0.5 , borderColor:'#000'}}> 
                <View>
                     <Text style={{fontSize:20}} >Shipment Avatar</Text>
                </View>
                <View>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isAvatar ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setAvatar(!isAvatar)}
                    value={isAvatar}
                    style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
                    disabled
                    />
                </View>
        </View>
        <View style={{display:'flex', paddingHorizontal:10 , justifyContent:'space-between', alignItems:'center' ,flexDirection:'row' , padding:10 , borderWidth:0.5 , borderColor:'#000'}}> 
                <View>
                     <Text style={{fontSize:20}} >Enable Notifications</Text>
                </View>
                <View>
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notify ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setNotify(!notify)}
                    value={notify}
                    style={{ transform: [{ scaleX: 1.5}, { scaleY: 1.5}] }}
                    disabled
                    />
                </View>
        </View>
        </>
}
    </View>
  
  )
}

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    }
})