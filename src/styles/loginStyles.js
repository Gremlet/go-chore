import { StyleSheet } from 'react-native'
import colors from './colours'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.purple,
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
        backgroundColor: colors.yellow,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: colors.purple,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
    },
    footerView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'Poppins_400Regular',
    },
    footerLink: {
        color: colors.yellow,
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    errorText: {
        fontSize: 20,
        color: colors.fuchsia,
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
    },
})

export default styles
