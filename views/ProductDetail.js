import React, { useContext } from 'react';
import { Vibration } from 'react-native'
import { Container, Content, Footer, FooterTab, Thumbnail, Button, Body, H1, Card, Text, CardItem } from 'native-base'
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

const ProductDetail = () => {

    //Pedido context
    const { product } = useContext(OrdersContext);
    const { name, price, category, image, description, id } = product; 
    //Hook para redireccionar
    const navigation = useNavigation();
    
    return ( 
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.title}>{name}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            {/* <Image style={globalStyles.image} source={{uri: image}} /> */}
                            <Thumbnail style={globalStyles.image} large square source={{uri:image}} />
                            <Text style={{marginTop: 20}}>{description}</Text>
                            <Text style={globalStyles.quantity}>Precio: ${price}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.button}
                        onPress={ () => {
                            Vibration.vibrate(250)
                            navigation.navigate('FormProduct')
                        }}
                    >
                        <Text style={globalStyles.buttonText}>Orden Producto</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
     );
}
 
export default ProductDetail;
