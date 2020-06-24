import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const NewOrder = () => {

    const navigation = useNavigation();

    return ( 
        <Container style={globalStyles.container}>
            <View style={[globalStyles.content, styles.content]}>
                <Button
                    style={globalStyles.button}
                    rounded
                    block
                    onPress={ () => navigation.navigate('Menu') }
                >
                    <Text style={globalStyles.buttonText}>Crear Nueva Orden</Text>
                </Button>
                <Button
                    style={globalStyles.button}
                    rounded
                    block
                    onPress={ () => navigation.navigate('Profile') }
                >
                    <Text style={globalStyles.buttonText}>Perfil</Text>
                </Button>
            </View>
        </Container>
     );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
})
 
export default NewOrder;