import React, { useContext } from 'react';
import { View } from 'react-native'
import { Container, Button, Text, Content, Card, CardItem, H1, Body, Thumbnail } from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import OrdersContext from '../context/orders/ordersContext'

const Profile = () => {
    
    //Context de Pedidos
    const { user } = useContext(OrdersContext);
    //Hook para redireccionar
    const navigation = useNavigation();

    return ( 
        <Container style={globalStyles.container}>
            <View style={globalStyles.content}>
                <Content style={globalStyles.content}>
                    <H1 style={globalStyles.title}>{user.name+' '+user.lastname}</H1>
                    <Card>
                        <CardItem>
                            <Body>
                                <Thumbnail style={globalStyles.image} large square source={{uri: user.image}} />
                                <Text style={{fontSize: 18}}>Direccion: {user.address}</Text>
                                <Text style={{fontSize: 18}}>Telefono: {user.phone}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{marginTop: 30}}>
                </View>
                <Button
                    style={[globalStyles.button, {marginBottom: 20}]}
                    rounded
                    block
                    onPress={ () => navigation.navigate('Camera') }
                >
                    <Text style={globalStyles.buttonText}>Sacar foto de perfil</Text>
                </Button>
            </View>
            
        </Container>
    );
}
 
export default Profile;