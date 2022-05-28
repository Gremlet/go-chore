import React, { useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import colors from '../styles/colours'

const Achievements = ({ achievements }) => {
    const achievementBoxes = [
        { id: 1, symbol: '📄', name: 'Paper' },
        { id: 2, symbol: '🪵', name: 'Wood' },
        { id: 3, symbol: '🪨', name: 'Stone' },
        { id: 4, symbol: '🔨', name: 'Steel' },
        { id: 5, symbol: '🥉', name: 'Bronze' },
        { id: 6, symbol: '🥈', name: 'Silver' },
        { id: 7, symbol: '🥇', name: 'Gold' },
        { id: 8, symbol: '🪙', name: 'Platinum' },
        { id: 9, symbol: '💎', name: 'Diamond' },
    ]

    return (
        <>
            <Text style={styles.title}>Achievements</Text>
            <View style={styles.container}>
                <View style={achievements.Paper ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[0].symbol}</Text>
                    <Text>{achievementBoxes[0].name}</Text>
                </View>
                <View style={achievements.Wood ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[1].symbol}</Text>
                    <Text>{achievementBoxes[1].name}</Text>
                </View>
                <View style={achievements.Stone ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[2].symbol}</Text>
                    <Text>{achievementBoxes[2].name}</Text>
                </View>
                <View style={achievements.Steel ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[3].symbol}</Text>
                    <Text>{achievementBoxes[3].name}</Text>
                </View>
                <View style={achievements.Bronze ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[4].symbol}</Text>
                    <Text>{achievementBoxes[4].name}</Text>
                </View>
                <View style={achievements.Silver ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[5].symbol}</Text>
                    <Text>{achievementBoxes[5].name}</Text>
                </View>
                <View style={achievements.Gold ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[6].symbol}</Text>
                    <Text>{achievementBoxes[6].name}</Text>
                </View>
                <View style={achievements.Platinum ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[7].symbol}</Text>
                    <Text>{achievementBoxes[7].name}</Text>
                </View>
                <View style={achievements.Diamond ? styles.activeItem : styles.inactiveItem}>
                    <Text>{achievementBoxes[8].symbol}</Text>
                    <Text>{achievementBoxes[8].name}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        color: colors.yellow,
    },

    activeItem: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: colors.yellow,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    inactiveItem: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: colors.yellow,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        opacity: 0.4,
    },
})

export default Achievements
