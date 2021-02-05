import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loginUser } from '../../actions/authActions'
import classnames from 'classnames';
import TextFieldGroup from '../../common/TextFieldGroup'
class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWollReciveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const userData ={
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }
    render(){
        const {errors} = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log in</h1>
                            <p className="lead text-center">Sing in to  your DevConnector</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                placeholder="Email adress"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                                name='email'
                                />
                                <TextFieldGroup 
                                placeholder="password"
                                type="password"
                                name='password'
                                onChange={this.onChange}
                                error={errors.pass}
                                />
                                
                               
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
   
}

const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors
})
export default  connect(mapStateToProps, { loginUser })(Login);