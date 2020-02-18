import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const parchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const parchaseBurgerFale = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FALE,
        error: error
    }
}

export const parchaseBurgerStart = (orderData) =>{
    return dispatch => {
        axios.post( '/orders.json', orderData )
        .then( response => {
            console.log(response.data)
          dispatch(parchaseBurgerSuccess(response.data));
        } )
        .catch( error => {
           dispatch(parchaseBurgerFale(error));
        } );
    }
}