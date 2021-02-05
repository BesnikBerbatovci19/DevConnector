import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { getCurrentProfile, deleteAccont } from '../../actions/profileActions'
import { Link } from 'react-router-dom'
import Spinner from '../../common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteClick(e){
        this.props.deleteAccont()
    }
    render(){
        const { user } = this.props.auth;
        const { profile, loading} = this.props.profile
       
        let dashboardContent;

        if(profile === null || loading ){
            dashboardContent = <Spinner />
        }else{
            // Check if logged in user has profile data

            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                    <p className="lead text-muted">Welecine <Link to={`/profile/${profile.handle}`}>{ user.name }</Link></p>
                     <ProfileActions />
                     <Experience exprience={profile.experience} />
                     <Education education={profile.education}/>
                     <div sytle={{marginBottom: '60px'}}></div>
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete accont</button>
                     </div>
                    )
            }
            else{
                  // User is logged in but has no profile
                  
                  dashboardContent = (
                      <div>
                          <p className="lead text-muted">Welecine { user.name }</p>
                          <p>You not have a profime, please add some info</p>
                          <Link to="/create-profile" className="btn btn-lg btn-info">
                              Create Profile
                          </Link>
                      </div>
                  )
            }
        }
        return(
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}

const mapStateToProps =  state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccont})(Dashboard);