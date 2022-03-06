import React from "react"
import { Alert } from "react-native"
import { View , Image , StyleSheet , Text , TouchableOpacity , SafeAreaView} from "react-native"
import firebase from '../../config/fireConfig';
import { useNavigation } from '@react-navigation/native';

export default function Verification() {

    const [timerCount, setTimer] = React.useState(60)
    const [time, setTime] = React.useState(Date.now())
    const [disable , setDisable] = React.useState(true)
    const [limit , setLimit] = React.useState(60)
    const navigation = useNavigation()


    function defaultData(){
        const user  = firebase.auth().currentUser
        const notifications = {
            delivered: true,
            failure: true,
            in_transit:true,
            out_for_deliver:true,
            pre_transit:true,
            return_to_sender: true
        }
        
        firebase.firestore().collection('Trackers').doc(user.uid).set({
          Notifications: notifications
        }).then(()=> navigation.navigate("success"))
        .catch(console.log)
    }


    function resendVerificationLink(){
       
        setTimer(limit+60)
        setLimit(limit+60)
        setDisable(true)
        firebase.auth().currentUser.sendEmailVerification().then(res => alert("A verification link has been resent")).catch(err => console.log(err))
    }

    React.useEffect(() => {
        const interval = setInterval(() =>{ 
            setTime(Date.now())
            checkVerify()
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }, []);

    function checkVerify(){
        firebase.auth().currentUser.reload()
        .then(() =>{
            if (firebase.auth().currentUser.emailVerified) 
            {

             defaultData()
        }
        })
        .catch(err => console.log(err))
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
          setTimer(lastTimerCount => {
              lastTimerCount <= 1 && clearInterval(interval)
              if (lastTimerCount<=1) setDisable(false)
              if(lastTimerCount<=0) return lastTimerCount
              return lastTimerCount - 1
          })
         
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
            
      }, [disable]);

    return (
        <SafeAreaView style={{backgroundColor:"black" , flex:1 , paddingHorizontal:20}}>
            <View style={{display:"flex" , justifyContent:"center" , alignItems:"center" , padding:90}}>
                    <View style={{...styles.center , backgroundColor:"whitesmoke" , width:150, height:150, borderRadius:150 , padding:10 }}>
                            <Image source={require("../../../assets/images/home/send.png")} />
                    </View>
            </View>

            <View style={{...styles.center}}>
               <Text style={{fontWeight:"bold" , fontSize:20 , marginBottom:20 , color:"#fff"}}>Verification Link has been sent to </Text>
               <Text style={{fontWeight:"bold" , fontSize:20 , marginBottom:20 , color:"blue"}} >{firebase.auth().currentUser.email}</Text>
               <Text style={{color:"#fff" , textAlign:"center"}}>Please check your email and click the verification link , you will automatically be signed in after clicking the link.</Text>
               {/* <Text style={{fontSize:8 ,color:"#fff" }}>If you cant find our verification email , check your spam folder.</Text> */}
              
               <TouchableOpacity disabled={disable} onPress={()=> resendVerificationLink()} style={{marginTop:20 , backgroundColor: disable? "grey":"white" , padding:20}}>
                 <Text>Resend verification link</Text> 
               </TouchableOpacity>
               <Text style={{color:"white"}}>{timerCount}s</Text>


            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    center:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})

