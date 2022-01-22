import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Success() {

    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>

            <Image source={require("../../../assets/images/icons/success.png")}/>
            <View style={{marginVertical:20}} >
                <Text style={styles.text}>SUCESSS</Text>
            </View>
            <View style={{ marginVertical:20}}>
                <Text style={{color:'#fff' , fontSize:20}}>Login Succesful </Text>
            </View>

            <TouchableOpacity onPress={()=> navigation.navigate('tracker') } style={{backgroundColor:'#fff' ,display:'flex' ,justifyContent:'center' ,alignItems:'center' , marginVertical:20, padding:10 , paddingHorizontal:100 , borderRadius:10}}>
            <Text style={{fontWeight:'bold' , fontSize:25}}> OK</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
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
