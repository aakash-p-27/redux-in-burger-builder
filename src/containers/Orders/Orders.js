import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        console.log(this.props.token);  
        this.props.onFatchedOrder(this.props.token);
        console.log('orderlist', this.props.orders);
    }

    render () {
        let orderList = <Spinner />;
        if(!this.props.loading){
            orderList = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
                {orderList}
            </div>
        );
    }
}

const mapsStateToPropd = state =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFatchedOrder: (token) => dispatch(actions.fatchOrders(token))
    }
}

export default connect(mapsStateToPropd, mapDispatchToProps)(withErrorHandler(Orders, axios));