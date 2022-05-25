import React from 'react'
import { Text } from 'react-native'
import { View, StyleSheet, Image } from 'react-native'

const Habits = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Habits view!</Text>
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
})

export default Habits
