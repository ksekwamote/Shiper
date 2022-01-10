import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { View, Text, TextInput  , StyleSheet} from 'react-native'


export default function SearchTab() {
    return (
        <View style={style.container}>
            <View style={{display:'flex', flexDirection:'row' , alignItems:'center'}}>
                    <Feather name="search" size={20} color="black" />
                    <TextInput style={{color: '#000' , marginLeft:5 , width:250}}  defaultValue='Tracking ID' />
            </View>
        

          <View>
                <AntDesign  name="scan1" size={20} color="black" />
          </View>
          
        </View>
    )
}

const style =  StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 
        backgroundColor: 'rgba(259, 259, 259, 1)' ,
        padding: 10,
        borderRadius: 10
    }
})