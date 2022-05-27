import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import colors from '../styles/colours'

import { ProgressBar } from 'react-native-paper'

const Experience = ({ xp }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> ⭐️ Experience - {xp}</Text>
            <ProgressBar progress={xp !== 0 ? (xp % 100) / 100 : 0} color={colors.yellow} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
        height: '10%',
    },
    text: {
        padding: 5,
        fontFamily: 'Poppins_400Regular',
        color: colors.aqua,
    },
})

export default Experience
