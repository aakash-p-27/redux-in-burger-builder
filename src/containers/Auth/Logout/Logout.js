import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Logout extends Component{
    componentDidMount(){
        this.props.logOut();
    }
    render(){
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logOut: () => dispatch(actions.logOut())
    }
}
export default connect(null, mapDispatchToProps)(Logout);