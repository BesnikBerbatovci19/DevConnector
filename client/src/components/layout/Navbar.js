import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile()
        this.props.logoutUser();
    }
    render() {
        const { isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
            
                 <li className="navbar-nav mr-auto">
                    <a href="#" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img className="rounded-circle"  src={user.avatar} alt={user.name} title="you most have a gravatar to your email to display an image" style={{width: '25px',marginRight: '5px'}}/>
                        Log out
                    </a>
                 </li>
            </ul>

        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                
                <li className="navbar-nav mr-auto">
                    <Link className="nav-link" to="/register">Register</Link>
                 </li>
                 <li className="navbar-nav mr-auto">
                    <Link className="nav-link" to="/login">Login</Link>
                 </li>
            </ul>

        )
        return (
            
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">DevConnector</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                            <li className="navbar-nav mr-auto">
                                     <Link className="nav-link" to="/feed">Post feed</Link>
                                </li>
                                <li className="navbar-nav mr-auto">
                                     <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="navbar-nav mr-auto">
                                   
                                    <Link className="nav-link" to="/profiles">Devolopers</Link>
                                </li>
                            </ul>
                            {isAuthenticated ? authLinks : guestLinks }
                           
                        </div>

                    </div>
                </nav>
            
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
