import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { auth } from '../firebase/config'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import Home from '../screens/Home'

const Stack = createStackNavigator()

const Navigation = () => {
    const [signedIn, setSignedIn] = useState(false)

    auth.onAuthStateChanged((user) => {
        if (user) {
            setSignedIn(true)
        } else {
            setSignedIn(false)
        }
    })

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {signedIn ? (
                    <Stack.Screen name="Home" component={Home} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Registration" component={Registration} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
