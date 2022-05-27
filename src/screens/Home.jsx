import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import Experience from '../components/Experience'
import Health from '../components/Health'

const Home = () => {
    const auth = getAuth()
    const db = getFirestore()

    const [username, setUsername] = useState('')
    const [xp, setXp] = useState(0)
    const [health, setHealth] = useState(0)

    useEffect(() => {
        getUsername()
        getXp()
        getHealth()
    }, [])

    const getUsername = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(docRef)

        setUsername(docSnap.data().username)
    }

    const getXp = () => {
        const xpRef = doc(db, 'users', auth.currentUser.uid)
        getDoc(xpRef).then((docSnap) => {
            setXp(docSnap.data().Experience)
        })
    }

    const getHealth = () => {
        const healthRef = doc(db, 'users', auth.currentUser.uid)
        getDoc(healthRef).then((docSnap) => {
            setHealth(docSnap.data().Health)
        })
    }

    const refreshProgress = () => {
        getXp()
        getHealth()
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>Welcome {username}!</Text>

                <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
                    <MaterialCommunityIcons name="logout" color={'#F4D35E'} size={20} />
                </TouchableOpacity>
            </View>
            <Experience xp={xp} />
            <Health health={health} />
            <FAB style={styles.fab} small icon="refresh" onPress={refreshProgress} />
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 160,
        bottom: 0,
    },
})

export default Home
