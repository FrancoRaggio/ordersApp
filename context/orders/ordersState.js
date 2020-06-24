import React, { useReducer } from 'react';
import OrdersReducer from './ordersReducer';
import OrdersContext from './ordersContext';
import { SELECT_PRODUCT, 
    CONFIRM_ORDER_PRODUCT, 
    SHOW_SUMMARY, 
    DELETE_PRODUCT, 
    ORDER_ORDERED 
} from '../../types';

const OrdersState = (props) => {

    //Crear state inicial
    const initialState = {
        order: [],
        product: false,
        total: 0,
        idOrder: ''
    }

    //use Reducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(OrdersReducer, initialState)

    //Selecciona el producto que el usuario desea ordenar
    const selectProduct = (product) => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: product
        })
    }

    //Cuando el usuario confirma el producto 
    const setOrder = (order) => {
        dispatch({
            type: CONFIRM_ORDER_PRODUCT,
            payload: order
        })
    }

    //Muestra el total a pagar en el resumen
    const showTotal = (total) => {
        dispatch({
            type: SHOW_SUMMARY,
            payload: total
        })
    }

    //Eliminar un articulo del carrito
    const deleteProduct = (id) => {
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        })
    }

    const orderPlaced = (id) => {
        dispatch({
            type: ORDER_ORDERED,
            payload: id
        })
    }

    return (
        <OrdersContext.Provider
            value={{
                order: state.order,
                product: state.product,
                total: state.total,
                idOrder: state.idOrder,
                selectProduct,
                setOrder,
                showTotal,
                deleteProduct,
                orderPlaced
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState;
