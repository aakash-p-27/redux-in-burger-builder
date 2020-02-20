import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const intialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purcheBurgerInit = (state, action) =>{
    return updateObject(state, {purchased: false});
}

const purcheBurgerStart = (state, action) =>{
    return updateObject(state, {loading: true});
}

const purcheBurgerSuccess = (state, action) =>{
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}

const purcheBurgerFale = (state, action) =>{
    return updateObject(state, {loading: false});
}

const fatchOrderStart = (state, action) =>{
    return updateObject(state, {loading: true});
}

const fatchOrderSuccess = (state, action) =>{
    return updateObject(state, {
        loading: false,
        orders: action.orders
    });
}

const fatchOrderFale = (state, action) =>{
    return updateObject(state, {loading: false});
}

const reducer = (state = intialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHES_INIT: return purcheBurgerInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purcheBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purcheBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FALE: return purcheBurgerFale(state, action);
        // order fatch methods
        case actionTypes.FETCH_ORDER_START: return fatchOrderStart(state, action);
        case actionTypes.FETCH_ORDER_SUCCESS:return fatchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FALE:return fatchOrderFale(state, action);
        default: return state;
    }

    return state;
}

export default reducer;