import React from 'react'
import { View, Text ,SafeAreaView, TouchableHighlightBase } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
// import Tracking from './Tracking';
// import Header from './Header.js';
import Header from './Header';
import Tracking from './Tracking';
import { useNavigation } from '@react-navigation/native';



export default function Tracker() {
    //const navigation = useNavigation()

    return (
      
        <SafeAreaView style={{flex:1 , backgroundColor: '#F5F5F5'}}>

            <View>
                <Header/>
                <Tracking/>
             
                
            </View>

        </SafeAreaView>
            
            


                

       
           
           
         



      
    )
}
