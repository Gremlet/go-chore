import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import colors from '../styles/colours'

const Achievements = () => {
    let achievements = [
        { id: 1, name: 'Paper 📄' },
        { id: 2, name: 'Wood 🪵' },
        { id: 3, name: 'Stone 🪨' },
        { id: 4, name: 'Steel 🔨' },
        { id: 5, name: 'Bronze 🥉' },
        { id: 6, name: 'Silver 🥈' },
        { id: 7, name: 'Gold 🥇' },
        { id: 8, name: 'Platinum 🪙' },
        { id: 9, name: 'Diamond 💎' },
    ]
    return (
        <>
            <Text style={styles.title}>Achievements</Text>
            <View style={styles.container}>
                {achievements.map((item, index) => (
                    <View key={item.id} style={styles.item}>
                        <Text>{item.name}</Text>
                    </View>
                ))}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        justifyContent: 'space-evenly',
    },
    title: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        color: colors.yellow,
    },

    item: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: colors.yellow,
    },
})

export default Achievements
