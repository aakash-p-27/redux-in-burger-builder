import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFale = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FALE,
        error: error
    }
}
export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () =>{
    return {
        type: actionTypes.PURCHES_INIT
    }
}

export const purchaseBurger = (orderData, token) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth=' + token, orderData )
        .then( response => {
            console.log(response.data)
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } )
        .catch( error => {
           dispatch(purchaseBurgerFale(error));
        } );
    }
}

// order list

export const fatchOrdersSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fatchOrdersFale = (err) =>{
    return{
        type: actionTypes.FETCH_ORDER_FALE,
        error: err
    }
}

export const fatchOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fatchOrders = (token, userId) =>{
    return dispatch => {
        const queryParms = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        dispatch(fatchOrdersStart());
        axios.get('/orders.json' + queryParms)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            console.log('orderList', fetchedOrders)
            dispatch(fatchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fatchOrdersFale(err));
        });
    }
}