import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { FAB } from 'react-native-paper'
import colors from '../styles/colours'
import Experience from '../components/Experience'
import Health from '../components/Health'
import Achievements from '../components/Achievements'

const Home = () => {
    const auth = getAuth()
    const db = getFirestore()

    const [username, setUsername] = useState('')
    const [xp, setXp] = useState(0)
    const [health, setHealth] = useState(0)
    const [achievements, setAchievements] = useState({})

    useEffect(() => {
        getUsername()
        getXp()
        getHealth()
        getAchievements()
        checkAndUpdateAchievements()
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
        getAchievements()
        checkAndUpdateAchievements()
    }

    const getAchievements = () => {
        const achRef = doc(db, 'users', auth.currentUser.uid)
        getDoc(achRef).then((docSnap) => {
            setAchievements(docSnap.data().Achievements)
        })
    }

    const checkAndUpdateAchievements = () => {
        const achRef = doc(db, 'users', auth.currentUser.uid)

        if (xp >= 100) {
            updateDoc(achRef, {
                'Achievements.Paper': true,
            })
        }
        if (xp >= 200) {
            updateDoc(achRef, {
                'Achievements.Wood': true,
            })
        }
        if (xp >= 300) {
            updateDoc(achRef, {
                'Achievements.Stone': true,
            })
        }
        if (xp >= 400) {
            updateDoc(achRef, {
                'Achievements.Steel': true,
            })
        }
        if (xp >= 500) {
            updateDoc(achRef, {
                'Achievements.Bronze': true,
            })
        }
        if (xp >= 600) {
            updateDoc(achRef, {
                'Achievements.Silver': true,
            })
        }
        if (xp >= 700) {
            updateDoc(achRef, {
                'Achievements.Gold': true,
            })
        }
        if (xp >= 800) {
            updateDoc(achRef, {
                'Achievements.Platinum': true,
            })
        }
        if (xp >= 900) {
            updateDoc(achRef, {
                'Achievements.Diamond': true,
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>Welcome {username}!</Text>
            </View>
            <Experience xp={xp} />
            <Health health={health} />
            <Achievements achievements={achievements} />
            <FAB style={styles.refreshFab} label="Tap for latest stats" icon="refresh" onPress={refreshProgress} />
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
        right: 80,
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
