import React , {useEffect , useState ,useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity , Dimensions} from 'react-native'
import firebase from '../../config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import defaultData from './defaultData';
import { AntDesign } from '@expo/vector-icons';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const HEIGHT = Dimensions.get("screen").height
const WIDTH  = Dimensions.get('screen').width
  
export default function Success() {

    const navigation = useNavigation()

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
   

    

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);


    return (
        <SafeAreaView style={styles.container}>

            <Image
            resizeMode="cover"
            style={{
                width: WIDTH*0.97,
                height: HEIGHT*0.55,
            }}
             source={require("../../../assets/images/home/sale.png")}/>
            <View style={{ marginVertical:10}}>
                <Text style={{color:'#fff' , fontSize:20}}>Login Succesful </Text>
            </View>
            <View style={{ padding:10}}>
                <Text style={{color:'#fff' , fontSize:12}}>Enjoy the BEST PARCEL TRACKING SOLUTION in the world,
                 trust us to give you the full path of your order and keep you up to date on its journey to your doorstep. </Text>
            </View>

            <TouchableOpacity onPress={()=> navigation.navigate('tracker') } style={{backgroundColor:'#fff' ,display:'flex' ,justifyContent:'space-between' ,alignItems:'center', flexDirection:'row' , marginVertical:20, padding:10 , paddingHorizontal:100 , borderRadius:10}}>
            <Text style={{fontWeight:'bold' , fontSize:25 , marginRight:10}}> CONTINUE</Text>
            <AntDesign style={{marginLeft:10}} name='arrowright' size={25} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

async function sendPushNotification(expoPushToken) {
  console.log(expoPushToken)
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Shiper Notification: EEEEEEEEEE',
      body: 'Your package is now in transit and will be delivered in 2 days',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    const user  = firebase.auth().currentUser
    
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      const defaultCode = defaultData(token)

      firebase.firestore().collection("Trackers").doc(user.uid).update({
        ExpoToken: token
    })
    
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }


const styles = StyleSheet.create({
    container:{
        flex:1 , 
        backgroundColor:'#000',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold' ,
        fontSize: 25,
        color: "#fff"
    }
})
