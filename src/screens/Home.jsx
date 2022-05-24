import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'

import { getFirestore, doc, getDoc } from 'firebase/firestore'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = () => {
    const auth = getAuth()
    const db = getFirestore()

    const [username, setUsername] = useState('')

    useEffect(() => {
        getUsername()
    }, [])

    const getUsername = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data())
            setUsername(docSnap.data().username)
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>Welcome {username}!</Text>

                <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
                    <MaterialCommunityIcons name="logout" color={'#F4D35E'} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#6649B6',
    },
    top: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        fontSize: 20,
        fontFamily: 'PatrickHand_400Regular',
        color: '#F4D35E',
    },
    button: {
        backgroundColor: '#D81E5B',
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
})

export default Home
