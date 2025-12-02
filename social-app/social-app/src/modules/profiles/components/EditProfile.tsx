import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as profileReducer from '../../../redux/profiles/profile.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/util/Spinner";

interface URLParams{
    profileId : string;
}
interface IProps {}
interface IProfileState{
    profileKey : profileReducer.ProfileState
}

let EditProfile:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [state , setState] = useState({
        company : '',
        website : '',
        location : '',
        designation : '',
        skills : '',
        bio : '',
        githubUsername : '',
        youtube : '',
        facebook : '',
        twitter : '',
        instagram : '',
        linkedin : ''
    });


    let {profileId}  = useParams<URLParams>();

    // get the profile info from Redux Store
    let profileState:profileReducer.ProfileState = useSelector((state : IProfileState) => {
        return state.profileKey;
    });

    let {loading , profile} = profileState;


    useEffect(() => {
        dispatch(profileActions.getMyProfile());
        setState({
            ...state,
            company: profile && profile.company ? profile.company : '',
            website: profile && profile.website ? profile.website : '',
            location: profile && profile.location ? profile.location : '',
            designation: profile && profile.designation ? profile.designation : '',
            skills:  profile && profile.skills ? profile.skills.toString() : '',
            bio: profile && profile.bio ? profile.bio : '',
            githubUsername: profile && profile.githubUsername ? profile.githubUsername : '',
            youtube: profile && profile.social ? profile.social.youtube : '',
            twitter:  profile && profile.social ? profile.social.twitter : '',
            facebook:  profile && profile.social ? profile.social.facebook : '',
            linkedin:  profile && profile.social ? profile.social.linkedin : '',
            instagram:  profile && profile.social ? profile.social.instagram : '',
        })
    }, [profileId]);

    let updateInput = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    let submitUpdateProfile = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(profileActions.updateProfile(state,history));
    };

    return (
        <React.Fragment>
           {/* <pre>{JSON.stringify(state)}</pre>*/}
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="mt-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h3 text-teal">
                                            <i className="fa fa-user-edit"/> Edit Profile
                                        </p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut consequatur deserunt dolore dolorum, eius error et eum ipsum nostrum omnis optio praesentium rem repellendus sit suscipit tenetur vitae, voluptates.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <form onSubmit={submitUpdateProfile}>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'company'}
                                                    value={state.company}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Company"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'website'}
                                                    value={state.website}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Website"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'location'}
                                                    value={state.location}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Location"/>
                                            </div>
                                            <div className="mb-2">
                                                <select
                                                    required={true}
                                                    name={'designation'}
                                                    value={state.designation}
                                                    onChange={updateInput}
                                                    className="form-control">
                                                    <option value="">Select Designation</option>
                                                    <option value="Junior Developer">Junior Developer</option>
                                                    <option value="Senior Developer">Senior Developer</option>
                                                    <option value="Tech Lead">Tech Lead</option>
                                                    <option value="Junior Manager">Junior Manager</option>
                                                    <option value="Senior Manager">Senior Manager</option>
                                                    <option value="Director">Director</option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'skills'}
                                                    value={state.skills}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Skills"/>
                                            </div>
                                            <div className="mb-2">
                                    <textarea
                                        required={true}
                                        name={'bio'}
                                        value={state.bio}
                                        onChange={updateInput}
                                        rows={3} className="form-control" placeholder="Bio"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'githubUsername'}
                                                    value={state.githubUsername}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Github Username"/>
                                            </div>
                                            <hr/>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'youtube'}
                                                    value={state.youtube}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="YouTube"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'facebook'}
                                                    value={state.facebook}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Facebook"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'twitter'}
                                                    value={state.twitter}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Twitter"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'linkedin'}
                                                    value={state.linkedin}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Linkedin"/>
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    required={true}
                                                    name={'instagram'}
                                                    value={state.instagram}
                                                    onChange={updateInput}
                                                    type='text' className="form-control" placeholder="Instagram"/>
                                            </div>
                                            <div className="mb-2">
                                                <input type='submit' className="btn btn-light-grey btn-sm text-teal" value="Update"/>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default EditProfile;