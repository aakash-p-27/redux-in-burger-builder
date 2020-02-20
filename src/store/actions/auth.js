import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }  
}

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }  
}

export const authFale = (error) =>{
    return{
        type: actionTypes.AUTH_FALE,
        error: error
    }  
}
export const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expireyDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logOut());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHF7Yx3ovw8KFvjwsOqp53ujIicazB2iA';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHF7Yx3ovw8KFvjwsOqp53ujIicazB2iA';
        }
        axios.post(url, authData)
        .then(response =>{
            const expireyDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expireyDate', expireyDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(error =>{
            dispatch(authFale(error.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch => {
    const token = localStorage.getItem('token');
    if(!token){
        dispatch(logOut());
    }else{
        const expireyDate = new Date(localStorage.getItem('expireyDate'));
        if(expireyDate <= new Date()){
            dispatch(logOut());
        }else{
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeOut((expireyDate.getTime() - new Date().getTime()) / 1000 ));
        }
    }
    }
} 