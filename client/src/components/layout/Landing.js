import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
class Landing extends Component {
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="dispay-3 mb-4">Devoloper Connector</h1>
                                <p className="lead">Create a devoloper profile/profolio, share post and get help from other devolopers</p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Sing in</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Login in</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
const mapStateProps = (state) =>({
    auth: state.auth
})
export default connect(mapStateProps)(Landing);