import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import classnames from 'classnames';
import { connect} from 'react-redux';
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'
class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReciveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser ={
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history)
      
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    render(){

        const { errors } = this.state;

     

        return (
           <div className="register">
               
               
                   <div className="row">
                       <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sing Up</h1>
                        <p className="lead text-center">Create your DevConnector accont</p>
                        <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                                placeholder="Name"
                                type="text"
                                name='name'
                                onChange={this.onChange}
                                error={errors.name}
                                />

                        <TextFieldGroup 
                                placeholder="email"
                                type="email"
                                name='email'
                                onChange={this.onChange}
                                error={errors.email}
                                info="this site use gravatar email app for photo"
                                />   
                        <TextFieldGroup 
                                placeholder="Password"
                                type="password"
                                name='password'
                                onChange={this.onChange}
                                error={errors.password}
                                />       
                           
                           <TextFieldGroup 
                                placeholder="Confirm Password"
                                type="password"
                                name='password2'
                                onChange={this.onChange}
                                error={errors.password2}
                                />   
                          
                            
                            
                            <input type="submit" className="btn btn-info btn-block mt-4" value="submit"/>
                            
                        </form>
                       </div>
                   </div>
               </div>
           
        )
    }
   
}


const mapStateProps = (state) =>({
    auth: state.auth,
    errors: state.errors
})
export default  connect(mapStateProps, { registerUser })(withRouter(Register));