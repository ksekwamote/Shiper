import { View, StyleSheet, TouchableOpacity , ScrollView} from 'react-native'
import React from 'react'
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Text,
} from 'react-native-paper';
import firebase from 'firebase';
import { Entypo , Ionicons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
    const paperTheme = useTheme();
    const user  = firebase.auth().currentUser
    const navigation = useNavigation()

  return (
    <ScrollView style={{flex:1}}>
        <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row',marginTop: 15}}>
                    <Avatar.Image 
                        source={{
                            uri: user.photoURL
                        }}
                        size={50}
                    />
                    <View style={{marginLeft:15, flexDirection:'column'}}>
                        <Title style={styles.title}>{user.displayName}</Title>
                        <Caption style={styles.caption}>{user.email}</Caption>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.section}>
                        <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                        <Caption style={styles.caption}>Pending</Caption>
                    </View>
                    <View style={styles.section}>
                        <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                        <Caption style={styles.caption}>Delivered</Caption>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=> console.log(user)} style={{backgroundColor:'black' , padding:10, marginTop:20 , paddingHorizontal:20 , display:'flex' , justifyContent:'center' , alignItems:'center' }} >
              <Text style={{color:'white', fontSize:25 , textAlign:'center' , fontWeight:'bold'}} >BUY PREMIUM</Text>
            </TouchableOpacity>
            <View style={{display:'flex' ,marginTop:15 ,justifyContent:'center' , alignItems:'center'}} >
              <Text style={{fontSize:18, fontWeight:'bold'}}>Features</Text>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Account')} style={styles.drawerSection}>
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Ionicons style={{marginLeft:10}} name='person' color='black' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Account</Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Notifications') } style={styles.drawerSection} >
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Entypo style={{marginLeft:10}} name='bell' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Notifications</Text>
                  </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('Settings') } style={styles.drawerSection} >
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Ionicons style={{marginLeft:10}} name='cog' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Settings</Text>
                  </View>
            </TouchableOpacity> */}
            
            <TouchableOpacity style={styles.drawerSection} >
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Ionicons style={{marginLeft:10}} name='language' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Language</Text>
                  </View>
            </TouchableOpacity>
            <View style={{display:'flex' ,marginTop:15 ,justifyContent:'center' , alignItems:'center'}} >
              <Text style={{fontSize:18, fontWeight:'bold'}}>Support</Text>
            </View>

            <TouchableOpacity onPress={()=> navigation.navigate('about') } style={styles.drawerSection} >
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Ionicons style={{marginLeft:10}} name='newspaper' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >About Us</Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('report') } style={styles.drawerSection} >
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Entypo style={{marginLeft:10}} name='chat' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Report A Bug</Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerSection} >
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Entypo style={{marginLeft:10}} name='star' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Rate Us</Text>
                  </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Account')} style={styles.drawerSection}>
                  <View style={{display:'flex',flexDirection:'row'}}> 
                        <Ionicons style={{marginLeft:10}} name='lock-closed' color='black' size={25} />
                       <Text style={{fontSize:18 ,marginLeft:20 }} >Privacy Policy</Text>
                  </View>
            </TouchableOpacity>
        </View>
</ScrollView>
  )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });