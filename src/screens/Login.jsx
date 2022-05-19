import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {}

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }} keyboardShouldPersistTaps="always">
                <Image source={require('../../assets/logo-vertical.png')} style={styles.logo} />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
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
                <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                        <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                            Sign up
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#6649B6',
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: 'center',
        margin: 30,
        resizeMode: 'contain',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: '#F4D35E',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: '#6649B6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#ffffff',
    },
    footerLink: {
        color: '#F4D35E',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default Login
