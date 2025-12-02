import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {ProfileView} from "../models/ProfileView";
import {useHistory} from 'react-router-dom';
import * as profileActions from '../../../redux/profiles/profile.actions';
import {useDispatch} from "react-redux";

interface IProps {}

let CreateProfile:React.FC<IProps> = ({}) => {
    let history = useHistory();
    let dispatch = useDispatch();

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

    let updateInput = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    let submitCreateProfile = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(profileActions.createProfile(state,history));
    };

    return (
        <React.Fragment>
           {/* <pre>{JSON.stringify(state)}</pre>*/}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-user-tie"/> Create Profile
                            </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut consequatur deserunt dolore dolorum, eius error et eum ipsum nostrum omnis optio praesentium rem repellendus sit suscipit tenetur vitae, voluptates.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitCreateProfile}>
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
                                    <input type='submit' className="btn btn-light-grey btn-sm text-teal" value="Create"/>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default CreateProfile;