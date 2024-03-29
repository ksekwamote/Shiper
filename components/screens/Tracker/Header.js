import React from 'react'
import { View, Text , StyleSheet , TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import SearchTab from './SearchTab';
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';

export default function Header() {

   const user = firebase.auth().currentUser
   const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.apart} >
                <View>
                        <Text style={{fontWeight: 'bold', fontSize:25 , color:"#fff"}}>Shiper</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate("Menu")} >
                        <Entypo name="menu" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.justify} >

                <View style={{display:'flex' , paddingVertical:10 ,justifyContent: 'space-between' , alignItems: 'center' , flexDirection: 'row'}}>
                        <Text style={styles.heading}>Hi {user.displayName.split(' ')[0]}, welcome to Shiper</Text>
                </View>

                <SearchTab />

            </View>
            
        </View>
    )
}


const styles  = StyleSheet.create({
    apart: {
        display: 'flex' ,
        justifyContent: 'space-between' ,
        alignItems: 'center',
        flexDirection: 'row'
    },
    justify : {
         display: 'flex',
         justifyContent: 'flex-start',
        
    },
    heading: {
        fontSize: 20,
        color:"#fff"
    } ,
    row: {
        display:'flex' , 
        justifyContent: 'space-between' ,
         alignItems: 'center' , 
         flexDirection: 'row'
    },
    container : {
        backgroundColor: 'black',
        padding:15, 
        marginTop:25
    }
})