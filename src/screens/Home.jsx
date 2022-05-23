import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '../utils/fontAwesomeUtils'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import Splash from './Splash'
import HomeScreen from './HomeScreen'

const Home = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faHouse} color={color} size={size} />,
                }}
            />
            <Tab.Screen name="Splash" component={Splash} />
        </Tab.Navigator>
    )
}

export default Home
