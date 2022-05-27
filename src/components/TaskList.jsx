import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { Button, Dialog, Portal } from 'react-native-paper'
import ConfettiCannon from 'react-native-confetti-cannon'
import { getFirestore, doc, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const TaskList = ({ taskArray, getTasks }) => {
    const auth = getAuth()
    const db = getFirestore()

    const [visible, setVisible] = useState(false)
    const [currentHealth, setCurrentHealth] = useState(0)
    const [XP, setXP] = useState(0)
    const [healthPoints, setHealthPoints] = useState(0)
    const [confetti, setConfetti] = useState(false)

    useEffect(() => {
        const healthRef = doc(db, 'users', auth.currentUser.uid)
        getDoc(healthRef).then((docSnap) => {
            setCurrentHealth(docSnap.data().Health)
        })
    }, [onButtonPress])

    const showDialog = () => setVisible(true)
    const hideDialog = () => {
        setVisible(false)
        setConfetti(false)
    }

    const onButtonPress = async (taskId, taskDifficulty) => {
        showDialog()
        setConfetti(true)

        setXP(taskDifficulty * 10)
        setHealthPoints(taskDifficulty)

        let newArr = taskArray.map((item) => {
            if (item.id === taskId) {
                return { ...item, done: true }
            } else {
                return item
            }
        })

        const doneRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(
            doneRef,
            {
                Tasks: {
                    OneOff: newArr,
                },
            },
            { merge: true }
        )

        await updateDoc(doneRef, {
            Experience: increment(XP),
        })

        currentHealth !== 100
            ? await updateDoc(doneRef, {
                  Health: increment(healthPoints),
              })
            : null

        getTasks()
    }

    return (
        <>
            <FlatList
                style={styles.flat}
                data={taskArray}
                renderItem={({ item }) =>
                    !item.done && (
                        <View style={styles.list}>
                            <Text style={styles.listTitle}>
                                {item.text}
                                <MaterialCommunityIcons name="clipboard-check" size={30} color="#F0544F" />
                            </Text>
                            <Text style={styles.listText}>
                                Date added: {new Date(item.dateAdded.seconds * 1000).toDateString()}{' '}
                            </Text>
                            <Text style={styles.listText}>
                                Deadline: {new Date(item.deadline.seconds * 1000).toDateString()}{' '}
                            </Text>
                            <Text style={styles.listText}>
                                Difficulty: {item.difficulty === 1 && 'Easy'}
                                {item.difficulty === 2 && 'Medium'}
                                {item.difficulty === 3 && 'Hard'}
                            </Text>
                            <Button
                                onPress={() => {
                                    onButtonPress(item.id, item.difficulty)
                                }}
                            >
                                Done? Click here!
                            </Button>
                        </View>
                    )
                }
            />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>Nice job! 🏆</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogText}>Yay, you did it!</Text>
                        <Text style={styles.dialogText}>
                            You gained {XP} xp {currentHealth !== 100 ? `and ${healthPoints} health` : ''}
                        </Text>
                        {confetti && <ConfettiCannon count={100} origin={{ x: 0, y: 0 }} explosionSpeed={150} />}
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    flat: {
        width: '90%',
    },
    list: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#16F4D0',
        padding: 10,
        marginVertical: 10,
    },
    listTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_400Regular',
    },
    listText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
    },
    dialog: {
        backgroundColor: '#F4D35E',
    },
    dialogTitle: {
        fontFamily: 'Poppins_400Regular',
    },
    dialogText: {
        fontFamily: 'Poppins_400Regular',
    },
})

export default TaskList
