import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Splash from './Splash'
import HomeScreen from './HomeScreen'

const Home = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#F0544F' }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen name="Splash" component={Splash} />
        </Tab.Navigator>
    )
}

export default Home
