import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { Button } from 'react-native-paper'
import { getFirestore, doc, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const TaskList = ({ taskArray, getTasks }) => {
    const auth = getAuth()
    const db = getFirestore()

    const [currentHealth, setCurrentHealth] = useState(0)

    useEffect(() => {
        const healthRef = doc(db, 'users', auth.currentUser.uid)
        getDoc(healthRef).then((docSnap) => {
            setCurrentHealth(docSnap.data().Health)
        })
    }, [onButtonPress])

    const onButtonPress = async (taskId, taskDifficulty) => {
        console.log('This task id is', taskId, 'and is level', taskDifficulty)

        const XP = taskDifficulty * 10
        const healthPoints = taskDifficulty

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
        fontFamily: 'PatrickHand_400Regular',
    },
    listText: {
        fontFamily: 'PatrickHand_400Regular',
        fontSize: 15,
    },
})

export default TaskList
