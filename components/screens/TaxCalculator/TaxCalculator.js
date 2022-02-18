import React from 'react';
import { View , StyleSheet  , Text , TextInput , TouchableOpacity  , Dimensions} from "react-native"
import {Picker} from '@react-native-picker/picker';
import { SimpleLineIcons ,MaterialCommunityIcons , FontAwesome , FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Calculator(){
    const [origin, setOrigin] = React.useState('China');
    const [destination, setDestination] = React.useState('Botswana');
    const [price , setPrice] = React.useState();
    const [currency ,setCurrency] = React.useState('BWP')
    const [product , setProduct] = React.useState('Battery')

    return (

        <View style={{...styles.center , margin:10 , marginTop:50}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>{'TAX & IMPORT DUTY CALCULATOR'}</Text>
            <View style={{alignSelf:'flex-start', paddingVertical:10}}>
            <Text> <FontAwesome5 name="truck" size={20} color="black" />   Shipping Origin  </Text>
            </View>
            <View style={{margin:0 , padding:5 , borderColor:"#000" , borderWidth:2 , borderRadius:10 , width:windowWidth-20}}>
                
                <Picker
                selectedValue={origin}
                onValueChange={(itemValue, itemIndex) =>
                    setOrigin(itemValue)
                
                }>
                <Picker.Item label="United States" value="United States" />
                <Picker.Item label="China" value="China" />
                </Picker>
            </View>
            <View style={{alignSelf:'flex-start', paddingVertical:10 }}>
            <Text> <FontAwesome5 name="plane-arrival" size={20} color="black" />   Shipping Destination    </Text>
            </View>
            <View style={{margin:0 ,padding:5 , borderColor:"#000" , borderWidth:2 , borderRadius:10 , width:windowWidth-20}}>
                
                <Picker
                selectedValue={destination}
                onValueChange={(itemValue, itemIndex) =>
                    setDestination(itemValue)
                }>
                <Picker.Item label="South Africa" value="South Africa" />
                <Picker.Item label="Botswana" value="Botswana" />
                </Picker>
            </View>

            <View style={{alignSelf:'flex-start', paddingVertical:10 }}>
            <Text><MaterialCommunityIcons name="fruit-pineapple" size={20} color="black" />   Product Category   </Text>
            </View>
            <View style={{margin:0 ,padding:5 , borderColor:"#000" , borderWidth:2 , borderRadius:10 , width:windowWidth-20}}>
                
                <Picker
                selectedValue={product}
                onValueChange={(itemValue, itemIndex) =>
                    setProduct(itemValue)
                }>
                <Picker.Item label="Accessory" value="Accessory" />
                <Picker.Item label="Battery" value="Battery" />
                </Picker>
            </View>

           


            <Text style={{margin:20}} >Item Selling Price</Text>
            <View style={{ display:'flex',flexDirection:'row' ,justifyContent:'space-between' , alignItems: 'center'}}>
                
            <View>
                <Picker
                selectedValue={currency}
                onValueChange={(itemValue, itemIndex) =>
                    setCurrency(itemValue)
                }
                style={{width:100}}
                >
                <Picker.Item label="BWP" value="BWP" />
                <Picker.Item label="USD" value="USD" />
                </Picker>
            </View>

                <View style={{marginRight:50}}>
                <TextInput style={styles.input}></TextInput>
                </View>  
            </View>
            <View style={{padding:10}}>
                <Text>Product Category</Text>
            </View>
            
            

            <TouchableOpacity style={{padding:20, backgroundColor:"lightblue", borderRadius:15, paddingHorizontal:50, marginTop:20}} >
                <Text>GET QOUTE</Text>
            </TouchableOpacity>
        </View>
    )
}



export default function TaxCalculator(){
  
    const icons =["cube"]

    return(
        
        
        <ScrollView>
                 <Calculator/>
        </ScrollView>
           
        
        
    )
}

const styles  = StyleSheet.create({

    center :{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    },
    input: {
       borderBottomWidth:2,
       borderColor: "#000",
       width:100
      
    }

})