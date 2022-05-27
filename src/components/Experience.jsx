import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import { ProgressBar } from 'react-native-paper'

const Experience = ({ xp }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> ⭐️ Experience - {xp}</Text>
            <ProgressBar progress={xp !== 0 ? xp / 100 : 0} color={'#F4D35E'} style={styles.progressBar} />
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
        fontFamily: 'PatrickHand_400Regular',
        color: '#16F4D0',
    },
    progressBar: {},
})

export default Experience
