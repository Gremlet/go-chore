import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Tasks from './Tasks'
import Home from './Home'

const Landing = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#F0544F' }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check-bold" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Landing
