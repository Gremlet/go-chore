import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { View, StyleSheet, ScrollView } from 'react-native'
import { FAB, Portal, Dialog, Button, TextInput, Paragraph, RadioButton } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { getFirestore, doc, arrayUnion, setDoc, getDoc, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import colors from '../styles/colours'
import TaskList from '../components/TaskList'

const Tasks = () => {
    const db = getFirestore()
    const auth = getAuth()

    const [visible, setVisible] = useState(false)
    const [taskText, setTaskText] = useState('')
    const [date, setDate] = useState('')
    const [difficulty, setDifficulty] = useState(1)
    const [datePickerVisibility, setDatePickerVisibility] = useState(false)
    const [taskArray, setTaskArray] = useState([])

    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const showDatePicker = () => setDatePickerVisibility(true)
    const hideDatePicker = () => setDatePickerVisibility(false)

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(docRef)

        setTaskArray(docSnap.data().Tasks.OneOff)
    }

    const handleDatePicked = (date) => {
        setDate(date)
        hideDatePicker()
    }

    const onDialogSubmit = async () => {
        hideDialog()

        let newTaskObject = {
            id: Math.floor(Math.random() * 100000 + 1000),
            text: taskText,
            dateAdded: Timestamp.fromDate(new Date()),
            deadline: Timestamp.fromDate(date),
            difficulty: difficulty,
            done: false,
        }

        const docRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(
            docRef,
            {
                Tasks: {
                    OneOff: arrayUnion(newTaskObject),
                },
            },
            { merge: true }
        )

        getTasks()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Add some one-off tasks to gain XP here! Tap the icon on the bottom right to add a new task. Tap the
                checkmark when you've completed a task.
            </Text>
            <Text style={styles.tasksHeader}>{auth.currentUser.displayName}'s one-off tasks</Text>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Add task</Dialog.Title>
                    <Dialog.Content>
                        <TextInput label="Task" value={taskText} onChangeText={(taskText) => setTaskText(taskText)} />
                        <Paragraph>When should this task be completed?</Paragraph>
                        <Button icon="calendar-month" onPress={showDatePicker} />
                        <Paragraph>{date.toString()}</Paragraph>
                        <RadioButton.Group onValueChange={(value) => setDifficulty(value)} value={difficulty}>
                            <RadioButton.Item label="Easy" value={1} />
                            <RadioButton.Item label="Medium" value={2} />
                            <RadioButton.Item label="Hard" value={3} />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onDialogSubmit}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <DateTimePickerModal
                isVisible={datePickerVisibility}
                mode="date"
                onConfirm={handleDatePicked}
                onCancel={hideDatePicker}
            />

            <TaskList taskArray={taskArray} getTasks={getTasks} />

            <FAB style={styles.fab} small icon="plus" onPress={showDialog} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.purple,
    },
    text: {
        fontSize: 16,
        marginTop: 40,
        paddingHorizontal: 20,
        fontFamily: 'Poppins_400Regular',
        color: colors.yellow,
    },
    tasksHeader: {
        marginVertical: 20,
        fontSize: 30,
        fontFamily: 'Poppins_400Regular',
        color: colors.yellow,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Tasks
