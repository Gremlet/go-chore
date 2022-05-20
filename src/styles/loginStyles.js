import { StyleSheet } from 'react-native'

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
        fontFamily: 'PatrickHand_400Regular',
    },
    footerView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'PatrickHand_400Regular',
    },
    footerLink: {
        color: '#F4D35E',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'PatrickHand_400Regular',
    },
    errorText: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        fontFamily: 'PatrickHand_400Regular',
    },
})

export default styles