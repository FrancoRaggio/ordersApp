import React,{ useContext, useEffect, Fragment, useState } from 'react';
import { StyleSheet, Vibration } from 'react-native'
import { Container, Separator, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base'
import globalStyles from '../styles/global'
import FirebaseContext from '../context/firebase/firebaseContext'
import OrdersContext from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const Menu = () => {

    //Context de Firebase
    const { menu, getProducts } = useContext(FirebaseContext);
    //Context de Pedidos
    const { product, selectProduct } = useContext(OrdersContext);

    //Hook para redireccionar
    const navigation = useNavigation();
    
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
        await getProducts();
        setIsReady(true);
    }

    if (!isReady) {
        return <AppLoading />;
    }

    const showHeading = (category, index) => {

        if(index > 0){
            const categoryPrevius = menu[index - 1].category;
            if(categoryPrevius !== category) {
                return (
                    <Separator style={globalStyles.separator}>
                        <Text style={globalStyles.separatorText}>{category}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={globalStyles.container}>
                    <Text style={globalStyles.separatorText}>{category}</Text>
                </Separator>
            )
        }
    } 

    return ( 
        <Container style={globalStyles.container}>
            <Content style={{backgroundColor: '#fff'}}>
                <List>
                    { menu.map( (product, index) => {
                        const { image, name, description, category, id, price } = product;
                        return (
                            <Fragment key={id}>
                                {showHeading(category, index)}
                                <ListItem 
                                    onPress={ () => {
                                        selectProduct(product);
                                        Vibration.vibrate(250)
                                        navigation.navigate('ProductDetail')
                                    }}
                                >
                                    <Thumbnail large square source={{uri:image}} />
                                    <Body>
                                        <Text>{name}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >
                                            {description}
                                        </Text>
                                        <Text>Precio: ${price}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
     );
}

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#000'
    },
    separatorText: {
        color: '#ffda00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})
 
export default Menu;
