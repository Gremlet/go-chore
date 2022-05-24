import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import styles from '../styles/loginStyles'

const Registration = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)

    const auth = getAuth()
    const db = getFirestore()

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                return updateProfile(auth.currentUser, { displayName: username }).catch((error) => {
                    console.log('error', error)
                })
            })
            .then((result) => {
                return setDoc(doc(db, 'users', auth.currentUser.uid), {
                    username: username,
                    Health: 100,
                    Experience: 0,
                    Tasks: {
                        Daily: [],
                        Weekly: [],
                        Monthly: [],
                        OneOff: [],
                    },
                    Achievements: {
                        Paper: false,
                        Wood: false,
                        Stone: false,
                        Steel: false,
                        Bronze: false,
                        Silver: false,
                        Gold: false,
                        Platinum: false,
                        Diamond: false,
                    },
                })
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
                    placeholder="Username"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {error && <Text style={styles.errorText}>Oops! Please check your email address!</Text>}

                <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Already got an account?{' '}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Log in
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Registration
