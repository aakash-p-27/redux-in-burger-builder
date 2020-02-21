import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure ({adapter: new Adapter()});

describe('<NavigationItems>', () =>{
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<NavigationItems />)
    });
    it('testing your navigation item if autenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('testing your navigation item if not autenticated', ()=>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('testing your logout navigation item', ()=>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
});