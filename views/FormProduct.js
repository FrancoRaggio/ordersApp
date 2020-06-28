import React, { useState, useContext, useEffect } from 'react';
import { Alert, Vibration } from 'react-native'
import { Container, Content, Form, Icon, Input, Grid, Col, Button, Text, Footer, FooterTab } from 'native-base'
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const FormProduct = () => {

    const [ quantity, setQuantity ] = useState(1)
    const [ total, setTotal ] = useState(0)

    //UseNavigation
    const navigation = useNavigation();

    //Context
    const { product, setOrder } = useContext(OrdersContext)
    const { price } = product;

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        fontExpo()
    }, [])

    const fontExpo = async () => {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        setIsReady(true);
    }

    //En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calculateTotal()
    }, [quantity])

    //Calcular el total del producto por cantidad
    const calculateTotal = () => {
       let totalPay = price * quantity;
       setTotal(totalPay)
    }

    const decrement = () => {
        if(quantity > 1){
            let newQuantity = parseInt(quantity) - 1
            setQuantity(newQuantity)
        }
    } 
    
    const increment = () => {
        let newQuantity = parseInt(quantity) + 1
        setQuantity(newQuantity)
    } 
    
    const confirmOrder = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podra modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //Almacenar el pedido al pedido principal
                        let order = {
                            ...product,
                            quantity,
                            total
                        }
                        await setOrder(order)
                        
                        Vibration.vibrate(250)
                        navigation.navigate('SummaryOrder')
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
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.title}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center'}}
                                onPress={ () => decrement() }
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input 
                                style={{ fontSize: 20, textAlign: 'center'}} 
                                value={quantity.toString()}
                                keyboardType="numeric"
                                onChangeText={ (quantity) => setQuantity(quantity) }    
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center'}}
                                onPress={ () => increment() }
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.quantity}>Subtotal: ${total}</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.button}
                        onPress={ () => confirmOrder() }
                    >
                        <Text style={globalStyles.buttonText}>Ordenar Producto</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
     );
}
 
export default FormProduct;
