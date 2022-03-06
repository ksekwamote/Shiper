import * as React from "react";
import { Text, View,Image, ScrollView ,TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneInput from 'react-native-phone-number-input';
import * as firebase from "firebase";

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
try {
  firebase.initializeApp({
    apiKey: "AIzaSyCb-kOWB3XHtE_xOAHWCRElOIG45mIV8rQ",
  authDomain: "shiper-ac3d7.firebaseapp.com",
  projectId: "shiper-ac3d7",
  storageBucket: "shiper-ac3d7.appspot.com",
  messagingSenderId: "264640785874",
  appId: "1:264640785874:web:7773b57bff2f2931e36c0b",
  measurementId: "G-GCWNQFYZ77"
  });
} catch (err) {
  // ignore app already initialized error in snack
}

export default function VerifyNumber() {
  const recaptchaVerifier = React.useRef(null);
  const phoneInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{ flex:1 ,margin:10 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
       <View style={{display:'flex' , justifyContent:'center', alignItems:'center'}} >
            <Image resizeMode="cover" style={{width:200, height:200}} source={require("../../../assets/images/icons/security.png")}/>
            <Text style={{fontSize:20 ,fontWeight:'bold' , textAlign:'center'}} >OPT Verification</Text>
            <View style={{width:250}}>
                <Text style={{textAlign:'center',color:"grey"}} >We will send you a <Text style={{fontWeight:'bold'}} >One Time Password</Text> on this number.</Text>
                </View>
          </View>

          <View style={{margin:10}} >
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
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        style={{backgroundColor:"#000" , padding:10 , paddingHorizontal:50 , borderRadius:10}}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            console.log("The verifyID is:  "+verificationId)
            setVerificationId(verificationId);
            // showMessage({
            //   text: "Verification code has been sent to your phone.",
            // });
            alert("Verification code has been sent to your phone. Scroll down below to enter the OTP Code.")
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />


      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            //showMessage({ text: "Phone authentication successful 👍" });
            alert("Phone authentication successful 👍")
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
          onPress={() => showMessage(undefined)}>
          <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}

      <TouchableOpacity onPress={()=> console.log(firebase.auth().currentUser)} >
          <Text>Press Me</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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