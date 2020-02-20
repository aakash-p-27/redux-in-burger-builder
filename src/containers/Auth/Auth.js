import React, { Component } from 'react';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();   
        }
    }
    

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    // form submit
    formSubmitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    
    switchAuthModehandler = () =>{
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render(){
        const formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElements.map(formElement =>(
                <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))
        if(this.props.loading){
            form = <Spinner />;
        }
        let errorMessage = null;
        if(this.props.error){
        errorMessage = (
            <p>
                {this.props.error.message}
            </p>
        )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className={classes.AuthContainer}>
                {authRedirect}
                <div className="authHeader">
                    <h1>Authentication</h1>
                </div>
                {errorMessage}
                <form onSubmit={this.formSubmitHandler}>
                    {form}
                    <div className={classes.bthOuter}>
                    <Button btnType="Success">Submit</Button>
                    </div>
                    <Button 
                    clicked={this.switchAuthModehandler}
                    btnType="Danger"
                    type = 'button' 
                    >Switch To {this.state.isSignup ? 'SignIn' : 'SignUp'}</Button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerIngredients.building,
        authRedirectPath: state.auth.authRedireactPath
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);