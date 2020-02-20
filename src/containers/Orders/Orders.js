import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {  
        this.props.onFatchedOrder(this.props.token, this.props.userId);
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
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFatchedOrder: (token, userId) => dispatch(actions.fatchOrders(token, userId))
    }
}

export default connect(mapsStateToPropd, mapDispatchToProps)(withErrorHandler(Orders, axios));