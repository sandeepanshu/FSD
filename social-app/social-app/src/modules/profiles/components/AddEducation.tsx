import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import * as profileActions from '../../../redux/profiles/profile.actions';

interface IProps {}

let AddEducation:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [education , setEducation] = useState({
        school : '',
        degree : '',
        fieldOfStudy : '',
        from : '',
        to : '',
        current : false,
        description : ''
    });

    let updateInput = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEducation({
            ...education,
            [event.target.name] : event.target.value
        })
    };

    let updateCheck = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEducation({
            ...education,
            [event.target.name] : event.target.checked
        })
    };

    let submitAddEducation = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(profileActions.addEducation(education, history));
    };

    return (
        <React.Fragment>
          {/*  <pre>{JSON.stringify(education)}</pre>*/}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-user-clock"/>
                                {' '} Add Education
                            </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque dignissimos distinctio dolor error expedita id incidunt, iusto laborum, molestiae mollitia optio placeat quod recusandae soluta unde, vel! Deserunt, quisquam!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitAddEducation}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">School</span>
                                    </div>
                                    <input
                                        required
                                        name="school"
                                        value={education.school}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="School"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">Degree</span>
                                    </div>
                                    <input
                                        required
                                        name="degree"
                                        value={education.degree}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Degree"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">FieldOfStudy</span>
                                    </div>
                                    <input
                                        required
                                        name="fieldOfStudy"
                                        value={education.fieldOfStudy}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="FieldOfStudy"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">From Date</span>
                                    </div>
                                    <input
                                        required
                                        name="from"
                                        value={education.from}
                                        onChange={updateInput}
                                        type="date" className="form-control"/>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        name="current"
                                        onChange={updateCheck}
                                        className="form-check-input" type="checkbox" id="defaultCheck1"/>
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Current
                                    </label>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">To Date</span>
                                    </div>
                                    <input
                                        required
                                        name="to"
                                        value={education.to}
                                        onChange={updateInput}
                                        type="date" className="form-control"
                                        disabled={education.current}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">Description</span>
                                    </div>
                                    <textarea
                                        required
                                        name="description"
                                        value={education.description}
                                        onChange={updateInput}
                                        rows={3} className="form-control" placeholder="Description"/>
                                </div>
                                <div>
                                    <input type="submit" value="add education" className="btn btn-teal btn-sm"/>
                                    <Link to="/profiles/dashboard" className="btn bg-light-grey btn-sm">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default AddEducation;