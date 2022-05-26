import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { Button } from 'react-native-paper'
const TaskList = ({ taskArray }) => {
    return (
        <FlatList
            style={styles.flat}
            data={taskArray}
            renderItem={({ item }) => (
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
                    <Button>Done? Click here!</Button>
                </View>
            )}
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
