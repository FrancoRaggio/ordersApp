import React, { useReducer } from 'react';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import firebase from '../../firebase';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from '../../types';
import _ from 'lodash'

const FirebaseState = (props) => {

    //Crear state inicial
    const initialState = {
        menu: [],
        error: false
    }

    //use Reducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)

    //Funcion que se ejecuta para traer los productos
    const getProducts = async () => {

        dispatch({
            type: GET_PRODUCTS,
        })

        //consultar firebase
        await firebase.db
            .collection('products')
            .where('exist', '==', true)
            .onSnapshot(handlesnapshot);
          
        function handlesnapshot(snapshot) {
            let products = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }) 
            //Ordenar por categoria con lodash
            products = _.sortBy(products, 'category')

            //Tenemos resultados de la BD
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: products
            })
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                getProducts
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;
