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
    }
})

export default globalStyles;