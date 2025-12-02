import React, {useEffect, useState} from 'react';
import {Link,useParams, useHistory} from 'react-router-dom';
import * as postActions from '../../../redux/posts/post.actions';
import * as postReducer from '../../../redux/posts/post.reducer';
import {useDispatch ,useSelector} from "react-redux";
import Spinner from "../../../layout/util/Spinner";
import * as userReducer from '../../../redux/users/user.reducer';

interface URLParams{
    postId : string;
}
interface IProps {}
interface IPostState{
    postKey : postReducer.PostState;
}
interface IUserState{
    userKey : userReducer.UserState
}

let PostDetails:React.FC<IProps> = ({}) => {
    let [comment , setComment] = useState({
        text : ''
    });
    let updateInput = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment({
            text : event.target.value
        });
    };

    let dispatch = useDispatch();
    let history = useHistory();

    let {postId} = useParams<URLParams>();

    // get post data from Redux store
    let postState:postReducer.PostState = useSelector((state:IPostState) => {
        return state.postKey;
    });

    // get user info from Redux Store
    let userState:userReducer.UserState = useSelector((state :IUserState) => {
        return state.userKey;
    });

    let {loading , selectedPost} = postState;
    let {user} = userState;

    useEffect(() => {
        dispatch(postActions.getPost(postId));
    }, [postId]);

    let submitCreateComment = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(postActions.createComment(postId, comment));
        setComment({
            text: ''
        })
    };

    let clickDeleteComment = (commentId:string) => {
        dispatch(postActions.deleteComment(postId,commentId));
    };

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="mt-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/posts/list'} className="btn btn-teal btn-sm">
                                           <i className="fa fa-arrow-alt-circle-left"/> Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {
                            Object.keys(selectedPost).length > 0 &&
                                <section className="">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card">
                                                    <div className="card-body bg-light-grey">
                                                        <div className="row">
                                                            <div className="col-md-2 text-center">
                                                                <img src={selectedPost.avatar} alt={''} className="img-thumbnail img-fluid"/>
                                                                <p className="h4 text-teal font-weight-bold">{selectedPost.name}</p>
                                                            </div>
                                                            <div className="col-md-10">
                                                                <img src={selectedPost.image} alt={''} className="img-fluid"/>
                                                                <p>{selectedPost.text}</p>
                                                                <small>{new Date(selectedPost.createdAt).toLocaleDateString()} - {new Date(selectedPost.createdAt).toLocaleTimeString()}</small>
                                                            </div>
                                                        </div>

                                                        <div className="row mt-3">
                                                            <div className="col-md-2 align-self-center"/>
                                                            {
                                                                Object.keys(user).length > 0 &&
                                                                <div className="col-md-1">
                                                                     <img src={user.avatar} alt={''} className="img-fluid"/>
                                                                </div>
                                                            }
                                                            <div className="col-md-6 align-self-baseline">
                                                                <form onSubmit={submitCreateComment}>
                                                                    <div className="mb-2">
                                                                        <textarea
                                                                            required={true}
                                                                            value={comment.text}
                                                                            onChange={updateInput}
                                                                            rows={3} className="form-control" placeholder="Your Comments Here"/>
                                                                    </div>
                                                                    <div className="mb-2">
                                                                        <input type="submit" className="btn btn-teal btn-sm" value="Comment"/>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-md-3"/>
                                                        </div>

                                                        {
                                                            selectedPost.comments.length > 0 &&
                                                            selectedPost.comments.map(comment => {
                                                                return (
                                                                    <div className="row" key={comment._id}>
                                                                        <div className="col-md-2"/>
                                                                        <div className="col-md-10">
                                                                            <div className="card mt-2">
                                                                                <div className="card-body">
                                                                                    <div className="row">
                                                                                        <div className="col-md-3 text-center">
                                                                                            <img src={comment.avatar} alt={''} width="50" height="50"/><br/>
                                                                                            <small className="text-teal">{comment.name}</small>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                           <p>{comment.text}</p>
                                                                                            {
                                                                                                Object.keys(user).length > 0 && comment.user.toString() === user._id.toString() &&
                                                                                                    <button className="btn btn-danger btn-sm" onClick={clickDeleteComment.bind(this,comment._id)}>
                                                                                                        <i className="fa fa-times-circle"/>
                                                                                                    </button>
                                                                                            }
                                                                                        </div>
                                                                                        <div className="col-md-3"/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                        }
                    </React.Fragment>
            }
            <div style={{marginBottom : '150px'}}/>
        </React.Fragment>
    )
};
export default PostDetails;