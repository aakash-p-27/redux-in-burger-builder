import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// configure ({adapter: new Adapter()});
describe('test redux', () =>{
    it('should return the intial state', () => {
        // wrapper.setProps({ings: {salad:0}});
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedireactPath: '/'
        });
    });
    
    it('should store the token upon login', () =>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedireactPath: '/'
        },
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-id'
        }
        )).toEqual({
            token: 'some-token',
            userId: 'some-id',
            error: null,
            loading: false,
            authRedireactPath: '/'
        })
    })
})