import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import styles from '../styles/loginStyles'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const auth = getAuth()

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log('result', result)
            })

            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log('error', errorCode, errorMessage)
                setError(true)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <Image source={require('../../assets/logo-vertical.png')} style={styles.logo} />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
                {error && <Text style={styles.errorText}>Invalid email or password!</Text>}
                <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Register
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Login
