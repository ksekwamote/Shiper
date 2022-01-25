import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SimpleLineIcons ,FontAwesome } from '@expo/vector-icons';
import firebase from '../../config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';


const colors  ={
    grey :'#1E1E1E',
    light:'#323232',
    white: '#fff' ,
    lightgrey: 'lightgrey'
    }

    


const Header = () =>{
    return (
        <View style={{display:'flex', flexDirection: 'row'}}>
        <View style={{  display:'flex', justifyContent: 'center' , alignItems: 'center',paddingHorizontal:15, borderColor:colors.light, borderWidth:1 , borderRadius: 10 ,}}>
            <View>
                 <FontAwesome style={{padding:0}} name="angle-left" size={30} color="white" />
            </View>
           
        </View>
        <View style={{marginLeft:20, display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
            <Text style={{fontWeight: 'bold' , fontSize: 25 ,color: '#fff'}} >Log In</Text>
        </View>
    </View>
    )
}

const SocialHeader = () =>{

    return (
        <View style={{marginTop:40}}>
                <Text style={{color: '#fff'}} >Login in wuth one of the following options</Text>
                <View style={styles.social}>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="google" size={25} color="white" />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="facebook" size={25} color="white" />

                    </TouchableOpacity>
                </View>
            </View>
    )

}

const LogFields = () =>{

    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigation = useNavigation()

    function login(user, pass){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(()=>{

            console.log(`Email: ${user} ... Password: ${pass}`)

         return firebase.auth().signInWithEmailAndPassword(user,pass)
        })
        .then(() => navigation.navigate("success"))
        .catch(err => alert("Password or Email is incorrect"+err)) 
    }

    return (
        <View style={{marginTop:40}}>
            <View>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput onChangeText={setEmail} style={styles.textInput} placeholderTextColor={colors.lightgrey} placeholder='Enter your email address'></TextInput>
            </View>
            <View>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput onChangeText={setPassword} style={styles.textInputPassword} placeholderTextColor={colors.lightgrey} placeholder='Enter your password'></TextInput>
            </View>
            <View style={{display:'flex' , justifyContent: 'center' , alignItems: 'center' , marginTop:50}}>
                <View>
                    <TouchableOpacity onPress={()=>login(email ,password)} style={{ display: 'flex' , justifyContent:'center' , alignItems: 'center' , backgroundColor:colors.white , borderRadius:15 , width: 250 , padding:15}}>
                        <Text style={{color:'#000' , fontWeight:'bold'}}>Login</Text>
                    </TouchableOpacity>
                </View>

                <Pressable style={{marginTop:10}} onPress={()=> navigation.navigate('signup') } >
                    <Text style={styles.inputLabel}>Dont have an account? <Text style={{fontWeight: 'bold'}}>Sign Up</Text></Text>
                </Pressable>
            </View>
           

        </View>
    )
}
export default function SignIn() {

    useEffect(()=>{
        createChannels();
    },[])

    const createChannels = ()=>{
        PushNotification.createChannel({
            channelId:"test-channel",
            channelName:"Test Channel"
        })
    }

    return (
        <SafeAreaView style={{flex:1 , backgroundColor:'#000'}}>

            <View style={{display:'flex',backgroundColor:'#000' , padding: 10}}>
            <Header/>
            <SocialHeader/>
            <LogFields/>

                
            </View>

        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({

center: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
},
    social: {
        display:'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center', 
        flexDirection: 'row', 
        marginTop:10
    },
    socialButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' ,
        width: 125,
        height:50,
        backgroundColor: colors.grey,
        borderColor: colors.light,
        borderRadius:15,
        borderWidth:1
        

    } , 
    inputLabel:{
        color: 'white',
        marginBottom:10
    },
    textInput: {
        borderRadius: 10,
        borderWidth:1,
        borderColor: colors.light,
        backgroundColor: colors.grey,
        color: colors.white,
        height: 50,
        marginBottom:20 ,
        padding:10
        },

    textInputPassword: {
        borderRadius: 10,
        borderWidth:1,
        borderColor: colors.light,
        backgroundColor: colors.grey,
        color: colors.white,
        height: 50,
        marginBottom:20,
        padding:10

    }
})
