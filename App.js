import React from 'react'
import { enableScreens } from 'react-native-screens'
import Navigation from './src/navigation'
import { Text } from 'react-native'
import { useFonts, PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand'

enableScreens()

export default function App() {
    let [fontsLoaded] = useFonts({ PatrickHand_400Regular })

    return !fontsLoaded ? <Text>Loading...</Text> : <Navigation />
}
