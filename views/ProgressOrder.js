import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Container, H1, H3, Button, Text } from 'native-base'
import globalStyles from '../styles/global'
import OrdersContext from '../context/orders/ordersContext';
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'
import Countdown from 'react-countdown'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const ProgressOrder = () => {

    const navigation = useNavigation();
    const { idOrder } = useContext(OrdersContext);
    const [time, setTime] = useState(0)
    const [complete, setComplete] = useState(false)
    const [client, setClient] = useState({})
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        fontExpo()
        const getProduct = async () => {
            await firebase.db.collection('orders')
                        .doc(idOrder)
                        .onSnapshot(function(doc){
                            setTime(doc.data().delivery_time)
                            setComplete(doc.data().complete)
                            setClient({
                                name: doc.data().name,
                                lastname: doc.data().lastname
                            })
                        })
        }
        getProduct()
    }, [])

    const fontExpo = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        setIsReady(true);
    }

    //Muestra el countdown en la pantalla
    const renderer = ({minutes, seconds}) => {
        return(
            <Text style={styles.time}>
                {minutes}:{seconds}
            </Text>
        )
    }

    if (!isReady) {
        return <AppLoading />;
    }

    return ( 
        <Container style={globalStyles.container}>
            <View style={[globalStyles.content, {marginTop: 50}]}>
                {time === 0 && (
                    <>
                        <H1 style={{textAlign: 'center'}}>Gracias</H1>
                        <Text style={{textAlign: 'center'}}>Hemos recibido tu orden...</Text>
                        <Text style={{textAlign: 'center'}}>Estamos calculando el tiempo de entrega</Text>
                    </>
                )}

                {time > 0 && !complete && (
                    <>
                        <H3 style={{textAlign: 'center'}}>{client.name + ' ' + client.lastname} </H3>
                        <Text style={{textAlign: 'center'}}>Su orden estara lista en:</Text>
                        <Text style={{textAlign: 'center'}}>
                            <Countdown 
                                date={ Date.now() + time * 60000}
                                renderer={renderer}
                            />
                        </Text>
                    </>
                )}

                { complete && (
                    <>
                        <H3 style={{textAlign: 'center'}}>{client.name + ' ' + client.lastname} </H3>
                        <H1 style={styles.textComplete}>Su orden esta lista</H1>
                        <H3 style={styles.textComplete}>Por favor pase retirarlo</H3>
                        <Button
                            roundedblack
                            dark
                            style={[globalStyles.button, {marginTop:100}]}
                            onPress={ () => navigation.navigate('NewOrder') }
                        >
                            <Text style={globalStyles.buttonText}>Comenzar una Nueva Orden</Text>
                        </Button>
                    </>
                )}

            </View>
        </Container>
     );
}

const styles = StyleSheet.create({
    time: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30,
    },
    textComplete: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})
 
export default ProgressOrder;
