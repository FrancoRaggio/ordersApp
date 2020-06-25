import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        marginHorizontal: '2.5%',
        flex: 1
    },
    button: {
        backgroundColor: '#ffda00'
    },
    buttonText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    },
    title: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 30
    },
    image: {
        height: 300,
        width: '100%'
    },
    quantity: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
    login: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    titleLogin: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    inputLogin: {
        color: '#fff',
        backgroundColor: '#fff',
        marginBottom: 20
    },
    link: {
        color: '#fff',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    }
})

export default globalStyles;