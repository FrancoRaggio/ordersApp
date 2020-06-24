import { SELECT_PRODUCT, 
    CONFIRM_ORDER_PRODUCT, 
    SHOW_SUMMARY, 
    DELETE_PRODUCT, 
    ORDER_ORDERED 
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case CONFIRM_ORDER_PRODUCT:
            return {
                ...state,
                order: [ ...state.order, action.payload ]
            }
        case SHOW_SUMMARY:
            return {
                ...state,
                total: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                order: state.order.filter( article => article.id !== action.payload )
            }
        case ORDER_ORDERED:
            return {
                ...state,
                order: [],
                total: 0,
                idOrder: action.payload
            }
        default:
            return state;
    }
}
