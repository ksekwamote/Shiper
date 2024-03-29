import React, { useState} from 'react';
import { Pressable,StyleSheet, Text, TextInput, TouchableOpacity, View  , ImageBackground , Alert , ActivityIndicator } from 'react-native'
import {  Feather } from '@expo/vector-icons';
import firebase from '../../config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';




const colors  ={
    grey :'#1E1E1E',
    light:'#323232',
    white: '#fff' ,
    lightgrey: 'lightgrey'
    }

const Header = () =>{
    return (
        <View style={{display:'flex', flexDirection: 'row'}}>
        <View style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
            <Text style={{fontWeight: 'bold' , fontSize: 25 ,color: '#fff'}} >Log In</Text>
        </View>
    </View>
    )
}

const SocialHeader = ({setLoading}) =>{

    const navigation = useNavigation()

    // onAuthStateChanged(auth, user => {
    //     if (user != null) {
    //       console.log('We are authenticated now!');
    //     }
      
    //     // Do other things
    //   });
    

    async function signInWithGoogleAsync() {
        setLoading(true)
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
                    setLoading(false)
                    console.log("Google Login: "+error)
                    Alert.alert('Error occurred, please try logging in again.')
               });
            
          } else {
              setLoading(false)
            return { cancelled: true };
          }
        } catch (e) {
            setLoading(false)
            alert(`Google Login Error: ${e}. Please try to log in in again.`);
        }
      }
    
      async function signInWithFacebookAsync() {
          setLoading(true)
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
                    setLoading(false)
                    console.log('Facebook Error: '+ error)
                    Alert.alert('Error occurred, please try logging in again.')
                });
        //     const response = await fetch(`https://graph.facebook.com/me?access_token=EAAGqsJkDd5ABAHCfWLgp4mmDed6pRraMo5WtZAx1ZBHfGtr8g1Gv1OD8xudUfKkpm31CEMRghRZAKWSONsFUHG2wWVp3W9pQrEfzfZBlr0QIuF7Ke63BGwP2crsZB6HrERQyEaT7N0NP1Nxt4mQIZAWEF0ZAt3o4NlodEUN9X7BBFGovscM9ZCWXqlmjTyPwHuzgTb2uQ6RDFUiLEgTPEAVM`);
        //   Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        
          } else {
            // type === 'cancel'
            setLoading(false)
          }
        } catch ({ message }) {
            setLoading(false)
          alert(`Facebook Login Error: ${message}.Please try again.`);
        }
      }


    return (
        <View style={{marginTop:40}}>
                <Text style={{color: '#fff' , textAlign:'center', padding:5}} >Login in with one of the following options</Text>
                <View style={styles.social}>
                    <TouchableOpacity onPress={()=>signInWithGoogleAsync()} style={styles.socialButton }>
                        <Image source={require("../../../assets/images/icons/google.png")} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> signInWithFacebookAsync()} style={styles.socialButton}>
                        <Image source={require("../../../assets/images/icons/facebook.png")} />

                    </TouchableOpacity>
                </View>
            </View>
    )
 
}

const LogFields = ({setLoading}) =>{

  const [email, setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [show , setShow] = useState(true)

  const navigation = useNavigation()


  function login(user, pass){
      setLoading(true)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(()=>{
       return firebase.auth().signInWithEmailAndPassword(user,pass)
      })
      .then(() => navigation.navigate("success"))
      .catch(err => {alert("Password or Email is incorrect. Please try again."); setLoading(false) }) 
  }


    return (
        <View style={{marginTop:40}}>
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
                              show ? <Feather name="eye" size={20} color="white" />: 
                              <Feather name="eye-off" size={20} color="white" />   
                            }
                             
                     </TouchableOpacity>
                   
                </View>
            </View>

            <View style={{display:'flex' , justifyContent: 'center' , alignItems: 'center' , marginTop:50}}>
                <View>
                    <TouchableOpacity onPress={()=>login(email ,password)} style={styles.login}>
                        <Text style={{color:'#000' , fontWeight:'bold' , fontSize:20}}>Login</Text>
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

    const image = { uri: "https://reactjs.org/logo-og.png" };
    const [loading, setLoading] = useState(false)
    return (
      
      
          
           <ImageBackground source={require("../../../assets/images/home/gold2.jpg")} resizeMode="stretch" style={styles.image} >
                 {
                     loading ?
                 <View style={styles.center} >
                    <ActivityIndicator color={"#fff"} animating={loading} size={"large"} />
                    <Text style={{textAlign:'center' ,color:'#fff' ,fontSize:18 ,marginTop:20}} >Loading...</Text>
              </View>
                :
                <View>
                     <Header/>
                    <SocialHeader setLoading={setLoading} />
                    <LogFields setLoading={setLoading} />
                </View>
               
                 }
           </ImageBackground>
            
          

    
        
    )
}



const styles = StyleSheet.create({

center: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
}, image: {
    flex: 1,
    justifyContent: "center",
  padding:20
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
        backgroundColor: "#fff",
        borderColor:"#fff",
        borderRadius:15,
        borderWidth:5
    } , 
    inputLabel:{
        color: 'white',
        marginBottom:10,
        fontWeight:'bold',
        marginLeft:5
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
    },
    login:{ 
    display: 'flex' ,
     justifyContent:'center' , 
     alignItems: 'center' , 
     backgroundColor:colors.white , 
     borderRadius:15 ,
      width: 250 , 
      padding:10,
      borderColor:"#fff",
      borderWidth:1
    }
})
