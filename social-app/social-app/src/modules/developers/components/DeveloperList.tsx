import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import * as developerActions from '../../../redux/developers/develper.actions';
import * as developerReducer from '../../../redux/developers/developer.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/util/Spinner";

interface IProps {}
interface IState{
    developerKey : developerReducer.DeveloperState
}

let DeveloperList:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();

    // fetch developer Info from REDUX Store
    let developerState:developerReducer.DeveloperState = useSelector((state : IState) => {
        return state.developerKey;
    });

    let {loading , developers , error} = developerState;

    useEffect(() => {
        dispatch(developerActions.getAllDevelopers());
    }, []);

    return (
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row animated slideInLeft">
                        <div className="col">
                            <p className="h3 text-teal font-weight-bold">
                                <i className="fa fa-users"/> Developers</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores doloremque dolores iste itaque neque odit porro, quis repellat suscipit vel. Deserunt dolor inventore nemo reprehenderit tempora vel voluptas? Eum, perspiciatis!</p>
                        </div>
                    </div>
                    {
                        loading ? <Spinner/> :
                            <React.Fragment>
                                    {
                                        developers.length > 0 &&
                                            developers.map(developer => {
                                                return(
                                                    <div className="row mt-3" key={developer._id}>
                                                        <div className="col" >
                                                            <div className="card">
                                                                <div className="card-body bg-light-grey">
                                                                    <div className="row align-items-center">
                                                                        <div className="col-md-4">
                                                                            <img src={developer.user.avatar} alt="" className='img-fluid img-thumbnail'/>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <p className="h3">{developer.user.name}</p>
                                                                            <small>{developer.designation}</small><br/>
                                                                            <small>{developer.company}</small><br/>
                                                                            <small>{developer.location}</small><br/>
                                                                            <Link to={`/developers/${developer._id}`} className="btn btn-teal btn-sm">Profile</Link>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            {
                                                                                developer.skills.map(skill => {
                                                                                    return (
                                                                                        <span key={skill}>
                                                                                        <small className="badge badge-success p-2 m-1">
                                                                                           <i className="fa fa-check-circle"/> {skill}</small><br/>
                                                                                    </span>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }

                            </React.Fragment>
                    }
                </div>
            </section>
        </React.Fragment>
    )
};
export default DeveloperList;