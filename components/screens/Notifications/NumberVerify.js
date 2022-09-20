import React from 'react';

import { StyleSheet , ScrollView } from 'react-native'
// import PhoneInput from 'react-native-phone-number-input';
// import firebase from '../../config/fireConfig';
// import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { getApp } from 'firebase/app'

 


export default function NumberVerify(){
  //   const [phoneNumber, setphoneNumber] = useState('');
  //   const recaptchaVerifier = React.useRef(null);
  //   const [verificationId, setVerificationId] = React.useState();
  //   const [verificationCode, setVerificationCode] = React.useState();
  //   const auth = getAuth()
  //   const app = getApp()
  //   const [message, showMessage] = React.useState();
  // const attemptInvisibleVerification = false;

 


//   const requestOTP = () =>{
//       if(phoneNumber){
//         generateRecaptcha()
//         let appVerifier = window.recaptchaVerifier
//         signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         // ...
//         }).catch((error) => {
//         // Error; SMS not sent
//         // ...
//         });

//       }
//   }

  

    return (
        <ScrollView style={{flex:1 ,margin:10}} >
          {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
      />
            <View style={{display:'flex' , justifyContent:'center', alignItems:'center'}} >
            <Image resizeMode="cover" style={{width:200, height:200}} source={require("../../../assets/images/icons/security.png")}/>
            <Text style={{fontSize:20 ,fontWeight:'bold' , textAlign:'center'}} >OPT Verification</Text>
            <View style={{width:250}}>
            <Text style={{textAlign:'center',color:"grey"}} >We will send you a <Text style={{fontWeight:'bold'}} >One Time Password</Text> on this number.</Text>
                </View>
          </View>

            <View style={{width:250, margin:10 , display:'flex' , justifyContent:'center' , alignItems:'center'}} >
              
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
                    setphoneNumber(text);
                    }}
                />
              </View>

            <TouchableOpacity onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }} style={{backgroundColor:"#000" , padding:10 , paddingHorizontal:50 , borderRadius:10}} >
                <Text style={{color:'#fff' , fontSize:20 , textAlign:'center' , fontWeight:'bold'}} >GET OPT</Text>
            </TouchableOpacity>

             */}
                
        </ScrollView>
    )

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