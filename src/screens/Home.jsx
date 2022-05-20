import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'

const Home = () => {
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
        justifyContent: 'center',
        backgroundColor: '#6649B6',
    },
    text: {
        fontSize: 40,
    },
    button: {
        backgroundColor: '#F4D35E',
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home
