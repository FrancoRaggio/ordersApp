import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, H1, Button, Footer, FooterTab } from 'native-base'
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const SummaryOrder = () => {

    const { order, total, showTotal, deleteProduct, orderPlaced } = useContext(OrdersContext);
    const [isReady, setIsReady] = useState(false)

    //Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        fontExpo()
        calculateTotal()
    }, [])

    const fontExpo = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        setIsReady(true);
    }

    useEffect(() => {
        calculateTotal();
    }, [total])

    const calculateTotal = () => {
        let newTotal = 0;
        newTotal = order.reduce( (newTotal, article) => newTotal + article.total, 0)
        showTotal(newTotal)
    }

    //Redirecciona a progreso pedido
    const progressOrder = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //Crear pedido
                        const orderObject = {
                            delivery_time: 0,
                            complete: false,
                            total: Number(total),
                            order: order,
                            create_date: Date.now()
                        }
                        console.log(orderObject)
                        //Enviarlo a Firebase
                        try {
                            const newOrder = await firebase.db.collection('orders').add(orderObject);
                            await orderPlaced(newOrder.id)
                            //Redireccionar a Progreso de pedido
                            navigation.navigate('ProgressOrder')
                        } catch (error) {
                            console.error(error)
                        }
                    }
                },
                {
                    text: 'Revisar', 
                    style: 'cancel'
                }
            ]
        ) 
    }

    //Eliminar un producto del arreglo pedido
    const confirmDelete = (id) => {
        Alert.alert(
            '¿Deseas eliminar este articulo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //Eliminar del state
                        await deleteProduct(id)
                    }
                },
                {
                    text: 'Cancelar', 
                    style: 'cancel'
                }
            ]
        ) 
    }

    if (!isReady) {
        return <AppLoading />;
    }

    return ( 
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.title}>Resumen Pedido</H1>
                {order.map( (product, index) => {
                    const { name, quantity, image, id, price } = product
                    return (
                        <List key={id + index}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri: image}} />
                                </Left>

                                <Body>
                                    <Text>{name}</Text>
                                    <Text>Cantidad: {quantity}</Text>
                                    <Text>Precio: ${price}</Text>
                                    <Button
                                        onPress={ () => confirmDelete(id) }
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text 
                                            style={[globalStyles.buttonText, { color: '#fff' }]}
                                        >
                                            Eliminar
                                        </Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.quantity}>Total a Pagar: ${total}</Text>
                <Button
                    style={{ marginTop: 30 }}
                    full
                    dark
                    onPress={ () => navigation.navigate('Menu') }
                >
                    <Text style={{ color: '#fff' }}>Seguir Pidiendo</Text>
                </Button>

            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.button}
                        full
                        onPress={ () => progressOrder() }
                    >
                        <Text style={globalStyles.buttonText}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
     );
}

const style = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
 
export default SummaryOrder;