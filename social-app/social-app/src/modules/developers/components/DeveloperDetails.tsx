import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import * as developerActions from '../../../redux/developers/develper.actions';
import * as developerReducer from '../../../redux/developers/developer.reducer';
import {useDispatch , useSelector} from "react-redux";
import Spinner from "../../../layout/util/Spinner";

interface URLParams{
    developerId : string;
}
interface IProps {}
interface IState{
    developerKey : developerReducer.DeveloperState
}

let DeveloperDetails:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    let {developerId} = useParams<URLParams>();

    // fetch developer Info from REDUX Store
    let developerState:developerReducer.DeveloperState = useSelector((state : IState) => {
        return state.developerKey;
    });

    let {loading , selectedDeveloper , error} = developerState;

    useEffect(() => {
        dispatch(developerActions.getDeveloper(developerId));
    }, [developerId]);

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(selectedDeveloper).length > 0 &&
                            <section className="mt-3">
                                <div className="container">
                                    <div className="row animated slideInLeft">
                                        <div className="col">
                                            <p className="h3 text-teal font-weight-bold">
                                                <i className="fa fa-user-tie"/> {selectedDeveloper.user.name}'s Profile</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores doloremque dolores iste itaque neque odit porro, quis repellat suscipit vel. Deserunt dolor inventore nemo reprehenderit tempora vel voluptas? Eum, perspiciatis!</p>
                                        </div>
                                    </div>
                                    <div className="container bg-teal text-white text-center p-3">
                                        <div className="row">
                                            <div className="col">
                                                <img src={selectedDeveloper.user.avatar} alt="" width="200" height="200" className="rounded-circle profile-img"/>
                                                <p className="h2">{selectedDeveloper.user.name}</p>
                                                <p className="h6">{selectedDeveloper.designation}</p>
                                                <p className="h6">{selectedDeveloper.company}</p>
                                                <p>{selectedDeveloper.location}</p>
                                                <div className="d-flex flex-row justify-content-center">
                                                    <div className="p-2">
                                                        <i className="fab fa-facebook"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-twitter"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-linkedin"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-youtube"/>
                                                    </div>
                                                    <div className="p-2">
                                                        <i className="fab fa-instagram"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center">
                                                <div className="card my-2">
                                                    <div className="card-body bg-light-grey text-teal">
                                                        <p className="h3">{selectedDeveloper.user.name}'s Biography</p>
                                                        <p>{selectedDeveloper.bio}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center">
                                                <div className="card my-2">
                                                    <div className="card-body bg-light-grey text-teal">
                                                        <p className="h3">{selectedDeveloper.user.name}'s Skills</p>
                                                        {
                                                            selectedDeveloper.skills.map(skill => {
                                                                return (
                                                                    <small className="badge badge-success p-2 m-1" key={skill}>
                                                                        <i className="fa fa-check-circle"/> {skill}</small>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {
                                                    selectedDeveloper.experience.length > 0 ?
                                                        <React.Fragment>
                                                            <div className="card">
                                                                <div className="card-body bg-light-grey">
                                                                    <p className="h3">Experience</p>
                                                                    <ul className="list-group">
                                                                        {
                                                                            selectedDeveloper.experience.map(exp => {
                                                                                return (
                                                                                    <li className="list-group-item my-2" key={exp._id}>
                                                                                        <span>Title : {exp.title}</span><br/>
                                                                                        <span>Company : {exp.company}</span><br/>
                                                                                        <span>Location : {exp.location}</span><br/>
                                                                                        <span>From : {exp.from}</span><br/>
                                                                                        <span>To : {exp.to}</span><br/>
                                                                                        <span>Description : {exp.description}</span><br/>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </React.Fragment> : null
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {
                                                    selectedDeveloper.education.length > 0 ?
                                                        <React.Fragment>
                                                            <div className="card">
                                                                <div className="card-body bg-light-grey">
                                                                    <p className="h3">Education</p>
                                                                    <ul className="list-group">
                                                                        {
                                                                            selectedDeveloper.education.map(edu => {
                                                                                return (
                                                                                    <li className="list-group-item my-2" key={edu._id}>
                                                                                        <span>School : {edu.school}</span><br/>
                                                                                        <span>Degree : {edu.degree}</span><br/>
                                                                                        <span>Field of Study : {edu.fieldOfStudy}</span><br/>
                                                                                        <span>From : {edu.from}</span><br/>
                                                                                        <span>To : {edu.to}</span><br/>
                                                                                        <span>Description : {edu.description}</span><br/>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </React.Fragment> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                        <div style={{marginBottom : '150px'}}/>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default DeveloperDetails;