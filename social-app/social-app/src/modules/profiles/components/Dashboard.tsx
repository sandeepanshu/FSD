import React, {useEffect} from 'react';
import * as userReducer from '../../../redux/users/user.reducer';
import {useSelector, useDispatch} from "react-redux";
import Spinner from "../../../layout/util/Spinner";
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as profileReducer from '../../../redux/profiles/profile.reducer';
import {Link} from "react-router-dom";

interface IProps {}
interface IState{
    userKey : userReducer.UserState
}
interface IProfileState{
    profileKey : profileReducer.ProfileState
}
let Dashboard:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();

    let userState:userReducer.UserState = useSelector((state : IState) => {
        return state.userKey;
    });

    let profileState:profileReducer.ProfileState = useSelector((state : IProfileState) => {
        return state.profileKey;
    });

    useEffect(() => {
        dispatch(profileActions.getMyProfile());
    }, []);


    let {loading , user} = userState;
    let {profile} = profileState;

    let clickDeleteExperience = (expId:string | undefined) => {
        if(expId){
            dispatch(profileActions.deleteExperience(expId));
        }
    };

    let clickDeleteEducation = (eduId:string| undefined) => {
        if(eduId){
            dispatch(profileActions.deleteEducation(eduId));
        }
    };

    // @ts-ignore
    return (
        <React.Fragment>
            {
                loading ? <Spinner/> :
                    <section className="mt-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h3 text-teal">
                                        <i className="fa fa-sitemap"/> Dashboard</p>
                                    {
                                        Object.keys(user).length > 0 &&
                                            <p className='text-teal'>Welcome {user.name}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="container ">
                            <div className="row">
                                <div className="col">
                                    {
                                        Object.keys(profile).length > 0 ?
                                            <React.Fragment>
                                                <Link to={`/profiles/edit/${profile._id}`} className="btn btn-light-grey text-teal btn-sm"
                                                     ><i className="fa fa-user-edit"/>   Edit Profile</Link>
                                                <Link to={'/profiles/education'} className="btn btn-light-grey text-teal btn-sm">
                                                    <i className="fa fa-graduation-cap"/>  Add Education</Link>
                                                <Link to={'/profiles/experience'} className="btn btn-light-grey text-teal btn-sm">
                                                    <i className="fa fa-user-clock"/>  Add Experience</Link>
                                            </React.Fragment> :
                                            <React.Fragment>
                                                <Link to={'/profiles/create'} className="btn btn-light-grey text-teal btn-sm">
                                                    <i className="fa fa-user-tie"/>  Create Profile</Link>
                                            </React.Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Experience Details */}
                        {
                            Object.keys(profile).length > 0 &&
                            <section>
                                {
                                    profile && profile?.experience.length > 0 &&
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <p className="h3 text-teal">Experience Details</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <table className="table table-hover text-center table-striped">
                                                    <thead className="bg-teal text-white">
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Company</th>
                                                        <th>Location</th>
                                                        <th>From</th>
                                                        <th>To</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        profile.experience.map(exp => {
                                                            return (
                                                                <tr key={exp._id}>
                                                                    <td>{exp.title}</td>
                                                                    <td>{exp.company}</td>
                                                                    <td>{exp.location}</td>
                                                                    <td>{exp.from}</td>
                                                                    <td>{exp.to}</td>
                                                                    <td>
                                                                        <button onClick={clickDeleteExperience.bind(this,exp._id)} className="btn btn-danger btn-sm">Delete</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </section>

                        }
                        {
                            Object.keys(profile).length > 0 &&
                            <section>
                            {
                                profile.education.length > 0 &&
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <p className="h3 text-teal">Education Details</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <table className="table table-hover text-center table-striped">
                                                <thead className="bg-teal text-white">
                                                <tr>
                                                    <th>School</th>
                                                    <th>Degree</th>
                                                    <th>Field Of Study</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    profile.education.map(edu => {
                                                        return (
                                                            <tr key={edu._id}>
                                                                <td>{edu.school}</td>
                                                                <td>{edu.degree}</td>
                                                                <td>{edu.fieldOfStudy}</td>
                                                                <td>{edu.from}</td>
                                                                <td>{edu.to}</td>
                                                                <td>
                                                                    <button onClick={clickDeleteEducation.bind(this,edu._id)}  className="btn btn-danger btn-sm">Delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            }
                            </section>
                        }
                    </section>
            }
        </React.Fragment>
    )
};
export default Dashboard;