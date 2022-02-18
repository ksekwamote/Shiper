import React, { useState} from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View , Button , ImageBackground , Alert } from 'react-native'
import { SimpleLineIcons ,FontAwesome } from '@expo/vector-icons';
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
        {/* <View style={{  display:'flex', justifyContent: 'center' , alignItems: 'center',paddingHorizontal:15, borderColor:colors.light, borderWidth:1 , borderRadius: 10 ,}}>
            <View>
                 <FontAwesome style={{padding:0}} name="angle-left" size={30} color="white" />
            </View>
           
        </View> */}
        <View style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
            <Text style={{fontWeight: 'bold' , fontSize: 25 ,color: '#fff'}} >Log In</Text>
        </View>
    </View>
    )
}

const SocialHeader = () =>{

    const navigation = useNavigation()

    // onAuthStateChanged(auth, user => {
    //     if (user != null) {
    //       console.log('We are authenticated now!');
    //     }
      
    //     // Do other things
    //   });
    

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

const LogFields = () =>{

  const [email, setEmail] = useState("")
  const [password , setPassword] = useState("")

  const navigation = useNavigation()


  function login(user, pass){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(()=>{
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
    return (
      
           <ImageBackground source={require("../../../assets/images/home/gold2.jpg")} resizeMode="stretch" style={styles.image} >
                <Header/>
                <SocialHeader/>
                <LogFields/>
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
        padding:10
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
