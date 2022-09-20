import React from 'react'
import { View, Text ,SafeAreaView } from 'react-native'
// import Header from './Header.js';
import Header from './Header';
import Tracking from './Tracking';



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
