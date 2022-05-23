import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'

const HomeScreen = () => {
    const auth = getAuth()

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {auth.currentUser.displayName}</Text>
            <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
                <Text style={styles.buttonTitle}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#6649B6',
    },
    text: {
        fontSize: 20,
        fontFamily: 'PatrickHand_400Regular',
        color: '#F4D35E',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#D81E5B',
        height: 32,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    buttonTitle: {
        fontFamily: 'PatrickHand_400Regular',
        color: '#F4D35E',
    },
})

export default HomeScreen
