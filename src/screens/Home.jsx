import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FAB } from 'react-native-paper'
import colors from '../styles/colours'
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

    const getAchievements = () => {}

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>Welcome {username}!</Text>
            </View>
            <Experience xp={xp} />
            <Health health={health} />
            <FAB style={styles.refreshFab} small icon="refresh" onPress={refreshProgress} />
            <FAB style={styles.signoutFab} small icon="logout" color={colors.orange} onPress={() => auth.signOut()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.purple,
    },
    top: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Poppins_400Regular',
        color: colors.yellow,
    },
    refreshFab: {
        position: 'absolute',
        margin: 16,
        right: 160,
        bottom: 0,
    },

    signoutFab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 16,
    },
})

export default Home
