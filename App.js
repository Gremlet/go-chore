import React from 'react'
import { enableScreens } from 'react-native-screens'
import Navigation from './src/navigation'
import { Text } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'

export default function App() {
    enableScreens()
    let [fontsLoaded] = useFonts({ Poppins_400Regular })

    return !fontsLoaded ? (
        <Text>Loading...</Text>
    ) : (
        <PaperProvider>
            <Navigation />
        </PaperProvider>
    )
}
