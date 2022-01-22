import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View , Pressable } from 'react-native'
import { SimpleLineIcons ,FontAwesome } from '@expo/vector-icons';
import firebase from '../../config/fireConfig';
import { useNavigation } from '@react-navigation/native';



const colors  ={
    grey :'#1E1E1E',
    light:'#323232',
    white: '#fff' ,
    lightgrey: 'lightgrey'
    }

    

    //Verify Emails


const Header = () =>{
    return (
        <View style={{display:'flex', flexDirection: 'row' , marginTop:10}}>
        <View style={{  display:'flex', justifyContent: 'center' , alignItems: 'center',paddingHorizontal:15, borderColor:colors.light, borderWidth:1 , borderRadius: 10 ,}}>
            <View>
                 <FontAwesome style={{padding:0}} name="angle-left" size={30} color="white" />
            </View>
           
        </View>
        <View style={{marginLeft:20, display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
            <Text style={{fontWeight: 'bold' , fontSize: 25 ,color: '#fff'}} >Create Account</Text>
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
    const [confirmPass , setConfirmPass] = useState("")
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

function createUser(email , pass , confirmpass){

    if(!pass || !email || !confirmPass){alert('Please fill out all fields'); return} 
    if(pass==confirmpass) 
    {
       firebase.auth().createUserWithEmailAndPassword(email ,pass)
       .then(()=> alert("User succesfully set"))
       .then(()=> navigation.navigate("success"))
       .catch(()=>alert("User not set , Please confirm your details and try again")) //Existing user
    }
    else{
        alert('Password and Confirmation password do not match')
    }
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
            <View>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput onChangeText={setConfirmPass} style={styles.textInputPassword} placeholderTextColor={colors.lightgrey} placeholder='Confirm your password'></TextInput>
            </View>
            <View style={{display:'flex' , justifyContent: 'center' , alignItems: 'center' , marginTop:225}}>
                <View>
                    <TouchableOpacity onPress={()=>createUser(email , password , confirmPass)} style={{ display: 'flex' , justifyContent:'center' , alignItems: 'center' , backgroundColor:colors.white , borderRadius:15 , width: 250 , padding:15}}>
                        <Text style={{color:'#000' , fontWeight:'bold'}}>CREATE AN ACCOUNT</Text>
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
        <SafeAreaView style={{flex:1 , backgroundColor:'#000'}}>

            
            <Header/>
          
            <LogFields/>

                
          

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
