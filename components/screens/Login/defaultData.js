import React from 'react';
import firebase from 'firebase';


export default function defaultData(expoToken){

    const user  = firebase.auth().currentUser

        const pushNotification = {
            delivered:true,
            failure:true,
            in_transit:true,
            out_for_delivery:true,
            pre_transit:true,
            return_to_sender:true
        }
        const whatsappNotification = {
            delivered:true,
            failure:true,
            in_transit:true,
            out_for_delivery:true,
            pre_transit:true,
            return_to_sender:true
        }



    firebase.firestore().collection("Trackers").doc(user.uid).get()
        	.then(snapshot=>{
                    if(!snapshot.data().PushNotification){
                        console.log('No Push Notifications')
                        firebase.firestore().collection('Trackers').doc(user.uid).set({
                            PushNotification: pushNotification,
                            WhatsappNotification: whatsappNotification,
                            ExpoToken: expoToken
                        }).then(()=> console.log('Hello World')).catch(console.log)                
                     }

                     console.log('Push Notifications')
            })
            .catch(err => {
                console.log(err)
                firebase.firestore().collection('Trackers').doc(user.uid).set({
                PushNotification: pushNotification,
                WhatsappNotification: whatsappNotification,
                ExpoToken: expoToken
            }).then(()=> console.log('Hello World')).catch(console.log)})


}