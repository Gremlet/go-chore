import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import Home from '../screens/Home'

const Stack = createStackNavigator()

const Navigation = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen name="Home">{(props) => <Home {...props} extraData={user} />}</Stack.Screen>
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
