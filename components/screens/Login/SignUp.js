import React, { useState } from 'react'
import {  StyleSheet, Text, TextInput, TouchableOpacity, View , Pressable , Image , KeyboardAvoidingView } from 'react-native'
import { FontAwesome , Feather } from '@expo/vector-icons';
import firebase from '../../config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { ScrollView } from 'react-native';




const colors  ={
    grey :'#1E1E1E',
    light:'#323232',
    white: '#fff' ,
    lightgrey: 'lightgrey' ,
    googlered: "#DB4437",
    faceblue:"#4267B2"
    }

    

    //Verify Emails


const Header = () =>{
    return (
        <View style={{display:'flex', flexDirection: 'row' , marginTop:10}}>
        {/* <View style={{  display:'flex', justifyContent: 'center' , alignItems: 'center',paddingHorizontal:15, borderColor:colors.light, borderWidth:1 , borderRadius: 10 ,}}>
            <View>
                 <FontAwesome style={{padding:0}} name="angle-left" size={30} color="white" />
            </View>
           
        </View> */}
        <View style={{marginLeft:20, display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
            <Text style={{fontWeight: 'bold' , fontSize: 25 ,color: '#fff'}} >Create Account</Text>
        </View>
    </View>
    )
}

const SocialHeader = () =>{

    return (
        <View style={{marginTop:40}}>
                <Text style={{color: '#fff'}} ></Text>
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
    const [confirmPass , setConfirmPass] = useState("")
    const navigation = useNavigation()
    const [show , setShow] = useState(false)
    const [show1 , setShow1] = useState(false)

    function login(user, pass){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(()=>{

            console.log(`Email: ${user} ... Password: ${pass}`)

         return firebase.auth().signInWithEmailAndPassword(user,pass)
        })
        .then(() => navigation.navigate("success"))
        .catch(err => alert("Password or Email is incorrect"+err)) 
    }

function createUser(email , pass , confirmpass){

    if(!pass || !email || !confirmPass){alert('Please fill out all fields'); return} 
    if(pass==confirmpass) 
    {
       firebase.auth().createUserWithEmailAndPassword(email ,pass)
       .then(userCredential => {
           userCredential.user.sendEmailVerification()
           //firebase.auth().signOut()
       })
       .then(()=> navigation.navigate("verification"))
       .catch(()=>alert("User not set , Please confirm your details and try again")) //Existing user
    }
    else{
        alert('Password and Confirmation password do not match')
    }
  }

  
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: "264640785874-j4pi2444li28vhu95oosv19a2h13ggrk.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        firebase.auth().signInWithCredential(credential)
            .then(user => {
                navigation.navigate("success")
            })
            .catch((error) => {
                Alert.alert('Error occurred ', error)
           });
        
      } else {
        return { cancelled: true };
      }
    } catch (e) {
        alert(`Google Login Error: ${e}`);
    }
  }

  async function signInWithFacebookAsync() {
    try {
      await Facebook.initializeAsync({
        appId: '469150434817936',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile' , "email"],
        });
      if (type === 'success') {

        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
            .then(user => { 
                 navigation.navigate("success")
            })
            .catch((error) => {
                 Alert.alert('Error occurred ', error)
            });
    //     const response = await fetch(`https://graph.facebook.com/me?access_token=EAAGqsJkDd5ABAHCfWLgp4mmDed6pRraMo5WtZAx1ZBHfGtr8g1Gv1OD8xudUfKkpm31CEMRghRZAKWSONsFUHG2wWVp3W9pQrEfzfZBlr0QIuF7Ke63BGwP2crsZB6HrERQyEaT7N0NP1Nxt4mQIZAWEF0ZAt3o4NlodEUN9X7BBFGovscM9ZCWXqlmjTyPwHuzgTb2uQ6RDFUiLEgTPEAVM`);
    //   Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


    return (
        <View style={{marginTop:20 , marginHorizontal:10}}>
            <View>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput onChangeText={setEmail} style={styles.textInput} placeholderTextColor={colors.lightgrey} placeholder='Enter your email address'></TextInput>
            </View>
            <View>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.textInputPassword} >
                     <TextInput style={{color:"#fff"}} secureTextEntry={show} onChangeText={setPassword} placeholderTextColor={colors.lightgrey} placeholder='Enter your password'></TextInput>
                     <TouchableOpacity style={{display:'flex', justifyContent:'center' , alignItems:'center'}} onPress={()=> setShow(!show) }>
                            {
                              show ? <Feather name="eye" size={18} color="white" />: 
                              <Feather name="eye-off" size={18} color="white" />   
                            }
                             
                     </TouchableOpacity>
                   
                </View>
            </View>
            <View>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.textInputPassword} >
                     <TextInput style={{color:"#fff"}} secureTextEntry={show1} onChangeText={setPassword} placeholderTextColor={colors.lightgrey} placeholder='Enter your password'></TextInput>
                     <TouchableOpacity style={{display:'flex', justifyContent:'center' , alignItems:'center'}} onPress={()=> setShow1(!show1) }>
                            {
                              show1 ? <Feather name="eye" size={18} color="white" />: 
                              <Feather name="eye-off" size={18} color="white" />   
                            }
                             
                     </TouchableOpacity>
                   
                </View>
            </View>
            <View style={{display:'flex' , justifyContent: 'center' , alignItems: 'center' }}>
                <View>
                    <TouchableOpacity onPress={()=>createUser(email , password , confirmPass)} style={{ display: 'flex' , justifyContent:'center' , alignItems: 'center' , backgroundColor:colors.white , borderRadius:15 , width: 250 , padding:15}}>
                        <Text style={{color:'#000' , fontWeight:'bold'}}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
             
                <View style={{marginBottom:10, marginTop:10}}>
                    <TouchableOpacity onPress={()=>signInWithGoogleAsync()} style={{ display: 'flex' , justifyContent:'center' ,flexDirection:'row' ,alignItems: 'center' , backgroundColor:colors.googlered , borderRadius:10 , width: 250 , padding:10}}>
                         <FontAwesome style={{marginRight:10}} name="google" size={20} color="white" />
                        <Text style={{color:'#fff' , fontWeight:'bold'}}>Sign Up with Google</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>signInWithFacebookAsync()} style={{ display: 'flex' , justifyContent:'center' ,flexDirection:'row' , alignItems: 'center' , backgroundColor:colors.faceblue , borderRadius:10 , width: 250 , padding:10}}>
                    <FontAwesome style={{marginRight:10}} name="facebook" size={20} color="white" />
                        <Text style={{color:'#fff' , fontWeight:'bold'}}>Sign Up with Facebook</Text>
                    </TouchableOpacity>
                </View>
                <Pressable style={{marginTop:10}} onPress={()=> navigation.navigate('signin') } >
                    <Text style={styles.inputLabel}>Already have an account? <Text style={{fontWeight: 'bold'}}>Sign In</Text></Text>
                </Pressable>
            </View>
           

        </View>
    )
}
export default function SignUp() {
    return (
        <ScrollView style={{flex:1 , backgroundColor:'#000'  }}>

            
            <Header/>
          
            <LogFields/>



        </ScrollView>
        
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
        marginBottom:10 ,
        fontWeight:'bold'
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
        padding:10,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'

    }
})
