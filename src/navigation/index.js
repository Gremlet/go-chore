import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { auth } from '../firebase/config'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import Landing from '../screens/Landing'

const Navigation = () => {
    const Stack = createStackNavigator()

    const [signedIn, setSignedIn] = useState(false)
    const [splash, setSplash] = useState(true)
    useState(() => {
        const timeout = setTimeout(() => setSplash(false), 2000)
        return () => clearTimeout(timeout)
    }, [])

    auth.onAuthStateChanged((user) => {
        if (user) {
            setSignedIn(true)
        } else {
            setSignedIn(false)
        }
    })

    return splash ? (
        <Splash />
    ) : (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {signedIn ? (
                    <Stack.Screen name="Landing" component={Landing} />
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
