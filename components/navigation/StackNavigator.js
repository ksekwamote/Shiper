import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator } from '@react-navigation/stack'
import Tracker from '../screens/Tracker/Tracker';
import History from '../screens/Tracker/History';
import Home from '../screens/Home/Home';
import SignIn from '../screens/Login/SignIn';


export default function StackNavigator() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name='home' 
                component={Home}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name="tracker"
             component={Tracker}
              />
            <Stack.Screen name='history' component={History} />
            <Stack.Screen name='signin' 
                component={SignIn} 
                options={{
                    header: () => null,
                }}
            />
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})
