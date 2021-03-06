import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {createProfile, getCurrentProfile} from '../actions/profileActions'
import { withRouter } from 'react-router-dom'
import isEmpty from '../validation/is-empty'
class CreateProfile extends Component {
    constructor(props){
        super();
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
        if(nextProps.profile.profile){

            const profile = nextProps.profile.profile
            console.log(profile)
            // Bring skills arrat back to CSV

            const skillsCSV = profile.skills.join(',');

            // If profile field doesent exist,  make empty string

            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social: {};
            profile.twitter = !isEmpty(profile.twitter) ? profile.twitter: '';
            profile.facebook = !isEmpty(profile.facebook) ? profile.facebook: '';
            profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin: '';
            profile.youtube = !isEmpty(profile.youtube) ? profile.youtube: '';
            profile.instagram = !isEmpty(profile.instagram) ? profile.instagram: '';


            // Set component fields state
            this.setState({
            handle:profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
            githubusername: profile.githubusername,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.instagram
        })
        }

        
    }
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }
    render(){
        const {errors, displaySocialInputs} = this.state
        
        let socialInputs

        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup 
                    placeholder="Twitter Profile"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    />
                    <InputGroup 
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    />
                    <InputGroup 
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    />
                    <InputGroup 
                    placeholder="Youtube Channel  URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    />
                    <InputGroup 
                    placeholder="Instagram Pages  URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    />
                </div>
            )
        }
        
        // Select options for status

        const options =[
            {
                label: '*Select Professional Status',
                value: 0,
            },
            {
                label: 'Devoloper',
                value: 'Devoloper',
            },
            {
                label: 'Junior Developer',
                value: 'Junior Developer',
            },
            {
                label: 'Senior Developer',
                value: 'Senior Developer',
            },
            {
                label: 'Manager',
                value: 'Manager',
            },
            {
                label: 'Student or Leraning',
                value: 'Student or Leraning',
            },
            {
                label: 'Instructor or Teacher',
                value: 'Instructor or Teacher',
            },
            {
                label: 'Other',
                value: 'Other',
            },
        ]
    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit your Profile</h1>
                        
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile. Your full name, nick name, company name"
                            />
                            <SelectListGroup 
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errors.status}
                                info='Giv us an idea of where you are at career'
                            />
                            <TextFieldGroup 
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Could be your own company or work for"
                            />
                            <TextFieldGroup 
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your own website or company one"
                            />
                            <TextFieldGroup 
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="City or city & state suggested"
                            />
                            <TextFieldGroup 
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma seperated value(Html,Css,Javascript,PHP)"
                            />
                             <TextFieldGroup 
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest repost and a gitHub link, please includ Username ."
                            />
                              <TextAreaFieldGroup 
                                placeholder="Short bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button 
                                type="button"
                                onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))
                                }}
                                className="btn btn-light">
                                    Add Socila Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
}
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
   
})



export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile))