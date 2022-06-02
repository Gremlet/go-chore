import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Button, Dialog, Portal, IconButton } from 'react-native-paper'
import ConfettiCannon from 'react-native-confetti-cannon'
import colors from '../styles/colours'
import { getFirestore, doc, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const TaskList = ({ taskArray, getTasks }) => {
    const auth = getAuth()
    const db = getFirestore()

    const [visible, setVisible] = useState(false)
    const [currentHealth, setCurrentHealth] = useState(0)
    const [confetti, setConfetti] = useState(false)
    const [XP, setXP] = useState(0)
    const [healthPoints, setHealthPoints] = useState(0)

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

    const onDeletePress = async (id) => {
        const remainingTasks = taskArray.filter((item) => item.id !== id)

        const deleteRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(
            deleteRef,
            {
                Tasks: {
                    OneOff: remainingTasks,
                },
            },
            { merge: true }
        )
        getTasks()
    }

    return (
        <>
            <FlatList
                style={styles.flat}
                data={taskArray}
                renderItem={({ item }) =>
                    !item.done && (
                        <View style={item.missed ? styles.missedList : styles.list}>
                            <View styles={styles.listHeader}>
                                <Text style={styles.listTitle}>
                                    {item.text}
                                    {'  '} 📝
                                </Text>
                            </View>
                            {item.missed ? (
                                <View>
                                    <Text style={styles.listText}>
                                        Aw, shucks. Looks like you missed this one and lost {item.difficulty} health.
                                    </Text>
                                    <Text style={styles.listText}>
                                        No, worries! Just delete it and add some more tasks and you'll be back on track!
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.listText}>
                                        Date added: {new Date(item.dateAdded.seconds * 1000).toDateString()}{' '}
                                    </Text>
                                    <Text style={styles.listText}>
                                        Deadline: {new Date(item.deadline.seconds * 1000).toDateString()}{' '}
                                    </Text>
                                    <Text style={styles.listText}>
                                        Difficulty: {item.difficulty === 1 && 'Easy ⭐️'}
                                        {item.difficulty === 2 && 'Medium ⭐️⭐️'}
                                        {item.difficulty === 3 && 'Hard ⭐️⭐️⭐️'}
                                    </Text>
                                </View>
                            )}

                            <Button
                                onPress={() => {
                                    onButtonPress(item.id, item.difficulty)
                                }}
                                icon="check-bold"
                                color={colors.yellow}
                                mode="contained"
                                style={styles.listButton}
                                labelStyle={{ fontFamily: 'Poppins_400Regular' }}
                                disabled={item.missed ? true : false}
                            />
                            <IconButton
                                icon="window-close"
                                color={colors.purple}
                                size={20}
                                onPress={() => {
                                    onDeletePress(item.id)
                                }}
                                style={styles.deleteButton}
                            />
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
        backgroundColor: colors.aqua,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    missedList: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: colors.orange,
        padding: 10,
        marginVertical: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    listTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_400Regular',
    },
    listText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
    },
    listButton: {
        marginVertical: 10,
    },
    dialog: {
        backgroundColor: colors.yellow,
    },
    dialogTitle: {
        fontFamily: 'Poppins_400Regular',
    },
    dialogText: {
        fontFamily: 'Poppins_400Regular',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
})

export default TaskList
