import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, TextInput  , StyleSheet , TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux';
import { changeTrackingID } from '../../redux/actions/actions';



export default function SearchTab() {

    const [id , setID] = React.useState('')
    const dispatch  = useDispatch()
    const navigation = useNavigation()

    function onSearch(){
        if (id){
            dispatch(changeTrackingID(id))
            navigation.navigate('addTracker')
        return
        }
        alert('Tracking ID Field is empty')
    }


    return (
        <View style={style.container}>
            <View style={{display:'flex', flexDirection:'row' , alignItems:'center'}}>
                    <Feather name="search" size={20} color="black" />
                    <TextInput onChangeText={setID}  style={{color: '#000' , marginLeft:5 , width:250}}  placeholder='Tracking ID' />
            </View>
        
        <TouchableOpacity onPress={() =>onSearch()} >
               {/* <AntDesign  name="scan1" size={20} color="black" /> */}
               <AntDesign  name="plus" size={20} color="black" />
        </TouchableOpacity>

          
          
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