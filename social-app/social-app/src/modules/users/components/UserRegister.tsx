import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as userActions from '../../../redux/users/user.actions';
import {useDispatch} from "react-redux";

interface IProps {}

let UserRegister:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [user , setUser] = useState({
        name : '',
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        nameError : '',
        emailError : '',
        passwordError : ''
    });

    let validateUserName = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user , name : event.target.value});
        let regExp = /^[a-zA-Z0-9-_]{4,10}$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , nameError: 'Enter a proper Username'})
            : setUserError({...userError , nameError: ''});
    };

    let validateEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user , email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , emailError: 'Enter a proper Email'})
            : setUserError({...userError , emailError: ''});
    };

    let validatePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user , password : event.target.value});
        let regExp = /^[A-Za-z0-9]\w{7,14}$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , passwordError: 'Enter a proper Password'})
            : setUserError({...userError , passwordError: ''});
    };

    let submitRegister = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       dispatch(userActions.registerUser(user, history));
    };

    return (
        <React.Fragment>
          {/*  <pre>{JSON.stringify(user)}</pre>
            <pre>{JSON.stringify(userError)}</pre>*/}
           <section className="mt-3">
               <div className="container">
                   <div className="row animated slideInLeft">
                       <div className="col">
                           <p className="h3 text-teal font-weight-bold">
                              <i className="fa fa-user-shield"/> Registration</p>
                           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores doloremque dolores iste itaque neque odit porro, quis repellat suscipit vel. Deserunt dolor inventore nemo reprehenderit tempora vel voluptas? Eum, perspiciatis!</p>
                       </div>
                   </div>
                   <div className="row animated zoomIn">
                       <div className="col-md-6">
                           <form onSubmit={submitRegister}>
                               <div className="mb-2">
                                   <input
                                       required
                                       name={'name'}
                                       value={user.name}
                                       onChange={validateUserName}
                                       type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="Name"/>
                                   {
                                       userError.nameError.length > 0 ? <small className="text-danger">{userError.nameError}</small> : null
                                   }
                               </div>
                               <div className="mb-2">
                                   <input
                                       required
                                       name={'email'}
                                       value={user.email}
                                       onChange={validateEmail}
                                       type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email"/>
                                   {
                                       userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : null
                                   }
                               </div>
                               <div className="mb-2">
                                   <input
                                       required
                                       name={'password'}
                                       value={user.password}
                                       onChange={validatePassword}
                                       type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password"/>
                                   {
                                       userError.passwordError.length > 0 ? <small className="text-danger">{userError.passwordError}</small> : null
                                   }
                               </div>
                               <div className="mb-2">
                                   <input type="submit" className="btn btn-teal btn-sm" value="Register"/>
                               </div>
                           </form>
                           <small>Already have an Account ?
                               <Link to={'/users/login'} className="text-teal"> Login</Link>
                           </small>
                       </div>
                   </div>
               </div>
           </section>
        </React.Fragment>
    )
};
export default UserRegister;