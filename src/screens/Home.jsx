import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Splash from './Splash'
import HomeScreen from './HomeScreen'

const Home = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="Splash" component={Splash} />
        </Tab.Navigator>
    )
}

export default Home
