import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import colors from '../styles/colours'

const Health = ({ health }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> ❤️ Health - {health}</Text>
            <ProgressBar progress={health / 100} color={colors.orange} style={styles.progressBar} />
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
    progressBar: {},
})

export default Health
