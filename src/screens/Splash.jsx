import React from 'react'
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import colors from '../styles/colours'

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo-vertical.png')} style={styles.logo} />
            <ActivityIndicator size="large" color={colors.yellow} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6649B6',
    },
    text: {
        fontSize: 20,
    },
    logo: {
        resizeMode: 'contain',
    },
})

export default Splash
