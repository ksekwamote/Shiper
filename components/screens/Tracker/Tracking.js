import React from 'react'
import { View, Text  , StyleSheet, ScrollView, Image} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



const TrackingHeader = () => {
    return (
            <View style={styles.container}>
                <Text style={styles.font} >Your Parcels</Text>
                <TouchableOpacity style={styles.equal}>
                    <SimpleLineIcons style={styles.rotate} name="equalizer" size={20} color="black" />
                </TouchableOpacity>
            </View>
    )

}

const TrackingItem = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('history') } style={styles.item}>
            <View style={styles.deliveryPack}>
                <View style={styles.delivery}>
                    <Image style={{width:50 , height:30}} source={require('../../../assets/images/logo/dhl.png')} />

                </View>
                <View style={styles.itemDetails} > 
                    <Text style={{fontWeight: 'bold', fontSize:15}}>RD 3451 1234 45</Text>
                    <Text>{'Japan -> Russian'} </Text>
                </View>
            </View>

            <View style={styles.centerRow}>
                <View style={styles.status}>
                </View>
                <Text style={{fontWeight:'bold'}} >Delivered</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Tracking() {
    return (
        
        <View>
             <TrackingHeader/>
             <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                    <TrackingItem/>
                </View>
             </ScrollView>            
        </View>
    )
}




const styles = StyleSheet.create({

    status: {
        height:10, 
        width:10 , 
        borderRadius:10 , 
        backgroundColor: 'pink' , 
        marginRight:5
    },
    centerRow: {
        display:'flex' , 
        flexDirection: 'row' , 
        alignItems:'center'
    },
    itemDetails: {
        display:'flex' , 
        justifyContent: 'center' , 
        alignItems: 'center' , 
        flexDirection: 'column'
    },

    deliveryPack: {
        display:'flex' , 
        justifyContent: 'flex-start' ,
        alignItems: 'center' , 
        flexDirection: 'row' 
    },
    delivery: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 50 , 
        height:50 , 
        borderRadius:5, 
        marginRight:10
    },

    item: {
        height:75 ,
        borderTopWidth:0,
        borderBottomWidth: 1,
        borderTopColor: 'rgba(211,211,211 ,1)',
        borderBottomColor:'rgba(211,211,211 ,1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal:10
    },
    scroll : {
            position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    font: {
        fontWeight: 'bold',
        fontSize: 20
    },
    container: {
        display:'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding:15
    },

    equal: {
        padding:8,
        backgroundColor:'rgba(211,211,211,0.8)',
        borderRadius:10,
        paddingHorizontal:10
    },
    rotate: {
        transform: [{ rotate: '90deg' }],
    }

})