import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
} 

export const fatchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispach =>{
         axios.get( 'https://react-burger-app-ee433.firebaseio.com/ingredients.json' )
            .then( response => {
                dispach(setIngredients(response.data));
            } )
            .catch( error => {
                dispach(fatchIngredientsFailed());
            } );
    }
}