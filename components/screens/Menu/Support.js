import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firebase from 'firebase'

export function Report() {

  const [bug , setBug] = useState('')

  function onsendEmail(){
      if(bug=='') return alert('Please describe the Bug in the field above')
      const useremail = firebase.auth().currentUser.email
      firebase.firestore().collection('mail').add({
        to: "ksekwamote@gmail.com",
        message: {
          subject: "Shiper BUG REPORT FROM CLIENT",
          text: `The email comes from ${useremail}:  ${bug}`,
          html: "This is the <code>HTML</code> section of the email body.",
        },
      })
      .then(()=> alert('Your bug has succesfully been sent to the Developers , we will provide feedback as soon as possible.') )
      .then(()=> setBug(''))
      .then(()=> console.log('Queued for delivery')).catch(console.log)


  }

  return (
    <View style={{flex:1 , display:'flex' , justifyContent:'center', alignItems:'center'}} >
      <View style={{ margin:10}}>
      <TextInput value={bug} onChangeText={setBug} multiline={true} numberOfLines={10} style={styles.textInput}  placeholder='Kindly describe the bug, we apologize for any inconveniece caused'></TextInput>
      </View>
      <TouchableOpacity onPress={()=>onsendEmail()} style={{padding:10 , paddingHorizontal:20 ,backgroundColor:'#000'}} >
        <Text style={{textAlign:'center' ,color:'#fff' ,fontWeight:'bold' , fontSize:15}} >Submit Report</Text>
      </TouchableOpacity>
      

    </View>
  )
}


export function AboutUs() {
  return (
    <View style={{flex:1 , margin:20}}>
      <View style={{display:'flex' , justifyContent:'center'}}>
          <TouchableOpacity style={{backgroundColor:'#000' , padding:10}}>
              <Text style={{textAlign:'center' , color:"#fff"}} >DIGITAL X</Text>
          </TouchableOpacity>
          <Text style={{fontWeight:'bold' , fontSize:18 , textAlign:'center'}} >About Us</Text>
      </View>

      <View>
            <Text>
                Digital X is a youth owned digital or software enterprise company that started in 2020.
                Over the course of 2 years we have developed and published numerous products to meet customer needs.
                One of our popular products is an online application that helps prospective employees create stunning
                CV's or resume's as a way of helping them to advance or propel their careers. We have another online app that
                helps consumers calculate their import duty before making a decision to purchase a product. Our vision is
                to provide unique and easy solutions to make people's lives better and our mission is to become a leader in
                software enterprise development.
            </Text>

            <Text>
                The Shiper product was created to help people who frequently engage ecommerce sites to properly track their
                products under one setting. Shiper has accessibility to tracking information in more than 100 popular shipping companies. Our app provides 
                you with the most timely updates through different modes of communication to help your stay up to date when it 
                comes to the journey of your package.
            </Text>
      </View>

    </View>
  )
}


export function Privacy() {
  return (
    <View>
      <Text>Support</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderWidth:1,
    borderColor: '#000',
    backgroundColor: 'lightgrey',
    color: '#000',
    marginBottom:20 ,
    padding:10,
    width:300,
    textAlignVertical:'top'
    },
})