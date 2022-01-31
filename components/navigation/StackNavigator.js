import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator } from '@react-navigation/stack'
import { Home, SignIn,SignUp,Success,History ,AddTracker ,TrackingDetails ,Tracker , Notifications } from '../screens/index.js'; 

export default function StackNavigator() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="notifications">
            <Stack.Screen name='home' 
                component={Home}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='signin' 
                component={SignIn} 
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='signup' 
                component={SignUp} 
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen name='success' 
                component={Success} 
                options={{
                    header: () => null,
                }}
            />
            

            <Stack.Screen name="tracker"
             component={Tracker}
             options={{
                header: () => null,
            }}
              />

            <Stack.Screen name="notifications"
             component={Notifications}
             options={{
                header: () => null,
            }}
              />

            <Stack.Screen name="trackingDetails"
             component={TrackingDetails}
              />


            <Stack.Screen name="addTracker"
             component={AddTracker}
              />
            <Stack.Screen name='history' component={History} />
            
      </Stack.Navigator>
    )
}

