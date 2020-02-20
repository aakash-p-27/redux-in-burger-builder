import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
 
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedireactPath: '/'
}
const authStart = (state, action) =>{
    return updateObject(state, {error: null, loading: true})
}

const authSuccess = (state, action) =>{
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFale = (state, action) =>{
    return updateObject(state, {error: action.error, loading: false})
}

const authLogout = (state, action) =>{
    return updateObject(state, {token: null, userId: null});
}

const setRedirectPath = (state, action) =>{
    return updateObject(state, {
        authRedireactPath: action.path
    })
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FALE: return authFale(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;
