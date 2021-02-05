import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
    

    render() {
        const { profile } = this.props;
        // Get first name
        const fristName = profile.user.name.trim().split(' ')[0];
        //Skill List

        const skills = profile.skills.map((skill, index) =>(
            <div key={index} className="p-3">
                <i className="fa fa-check"/>
                {skill}
            </div>
        ))
        return (
            <div className="row">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">{fristName}</h3>
                    <p>{isEmpty(profile.bio) ? (<span>{fristName} dose not have bio</span>) : (<span>{profile.bio}</span>)}</p>
                    <hr />
                    <h3 className="text-center text-info">Skill set</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                           {skills}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




export default ProfileAbout
