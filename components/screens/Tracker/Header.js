import React from 'react'
import { View, Text , StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import SearchTab from './SearchTab';


export default function Header() {

   

    return (
        <View style={styles.container}>
            <View style={styles.apart} >
                <View>
                        <Text style={{fontWeight: 'bold', fontSize:25 , color:"#fff"}}>Shiper</Text>
                </View>
                <View>
                        <Feather name="bell" size={24} color="white" />
                </View>
            </View>

            <View style={styles.justify} >

                <View style={{display:'flex' , paddingVertical:10 ,justifyContent: 'space-between' , alignItems: 'center' , flexDirection: 'row'}}>
                        <Text style={styles.heading}>Hi Kutlo, welcome to Shiper</Text>
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