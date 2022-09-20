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
        const settings = {
            sort_according_to_recent: true,
            bulk_uploading:true,
            shipment_avatar: true,
            enable_notificatons:true
        }


        const trackersRef = firebase.firestore().collection("Trackers").doc(user.uid)

        trackersRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            console.log(`There's a snapshot`)
          } else {
            trackersRef.set({
                Menu:{
                PushNotification: pushNotification,
                WhatsappNotification: whatsappNotification,
                settings
            }})
          }
      });
    
        	// .then(snapshot=>{
                    // if(!snapshot.data().Notifications){
                    //     firebase.firestore().collection('Trackers').doc(user.uid).set({
                    //         Menu:{
                    //         PushNotification: pushNotification,
                    //         WhatsappNotification: whatsappNotification,
                    //         settings,
                    //         ExpoToken: expoToken
                    //     }}).then(()=> console.log('Hello World')).catch(console.log)                
                    //  }

            //          console.log('Push Notifications')
            // })
            // .catch(err => {
            //     console.log(err)
            //     firebase.firestore().collection('Trackers').doc(user.uid).set({
            //         Notifications:{
            //             PushNotification: pushNotification,
            //             WhatsappNotification: whatsappNotification,
            //             settings,
            //             ExpoToken: expoToken
            //         }
            // }).then(()=> console.log('Hello World')).catch(console.log)
        // })


}