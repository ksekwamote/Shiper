import { FontAwesome , MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'


export default function BottomTab() {
    return (
        <View style={{flexDirection: 'row',padding:10 , paddingHorizontal:30 ,borderRadius:10, justifyContent: 'space-between' , backgroundColor:'rgba(211,211,211,0.8)'}}>
            <Icon icon="home" name="Home" />
            <Icon icon="radar" name="Tracker" />
            <Icon icon="calculator" name="Duty" />
            
            
        </View>
    )
}

const Icon  = (props) =>(
      
    <TouchableOpacity>
        <MaterialCommunityIcons
     name = {props.icon} 
    size={25}
     style={{marginBottom: 3 , 
        alignSelf: 'center'}} />
        <Text>{props.name}</Text>

    </TouchableOpacity>
             

        
       
    )
    

const styles = StyleSheet.create({})
