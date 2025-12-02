import React, {useEffect, useState} from 'react';
import * as userReducer from '../../../redux/users/user.reducer';
import {useDispatch,useSelector} from "react-redux";
import * as postActions from '../../../redux/posts/post.actions';
import * as postReducer from '../../../redux/posts/post.reducer';
import Spinner from "../../../layout/util/Spinner";
import {Link} from "react-router-dom";

interface IProps {}
interface IUserState{
    userKey : userReducer.UserState
}
interface IPostState{
    postKey : postReducer.PostState
}

let PostList:React.FC<IProps> = ({}) => {
    let dispatch = useDispatch();

    let [post , setPost] = useState({
        text : '',
        image : ''
    });

    useEffect(() => {
        dispatch(postActions.getAllPosts());
    }, []);

    let updateInput = (event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPost({
            ...post,
            [event.target.name] : event.target.value
        });
    };


    let userState:userReducer.UserState = useSelector((state : IUserState) => {
        return state.userKey;
    });

    let postState:postReducer.PostState = useSelector((state : IPostState) => {
        return state.postKey;
    });

    let {user} = userState;
    let {loading , posts} = postState;

    let submitCreatePost = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(postActions.createPost(post));
        setPost({
            text : '',
            image: ''
        });
    };

    let clickLikePost = (postId:string) => {
        dispatch(postActions.likePost(postId));
    };

    let clickUnLikePost = (postId:string) => {
        dispatch(postActions.disLikePost(postId));
    };

    let clickDeletePost = (postId:string) => {
        dispatch(postActions.deletePost(postId));
    };

    return (
        <React.Fragment>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">Welcome to React Social Community</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae esse facere fugiat laudantium maxime minus modi, molestiae nobis perferendis quae quasi ratione reiciendis repellat sed sit soluta totam voluptates.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body bg-light-grey">
                                    <div className="row no-gutters align-items-center">
                                        {
                                            Object.keys(user).length > 0 &&
                                            <div className="col-md-3">
                                                <img src={user.avatar} alt='' className="img-fluid img-thumbnail"/>
                                            </div>
                                        }
                                        <div className="col-md-8">
                                            <form onSubmit={submitCreatePost}>
                                                <div className="mb-2">
                                                    <textarea
                                                        autoFocus={true}
                                                        required={true}
                                                        name='text'
                                                        value={post.text}
                                                        onChange={updateInput}
                                                        rows={3} className="form-control" placeholder='Your Post Content here'/>
                                                </div>
                                                <div className="mb-2">
                                                    <input
                                                        required={true}
                                                        name='image'
                                                        value={post.image}
                                                        onChange={updateInput}
                                                        type="text" className="form-control" placeholder={'Image URL'}/>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="submit" className="btn btn-teal btn-sm" value="post"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="mt-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h3 text-teal">
                                            All Posts
                                        </p>
                                        <hr/>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                {
                                    posts.length > 0 &&
                                    posts.map(post => {
                                        return (
                                            <div className="row" key={post._id}>
                                                <div className="col">
                                                    <div className="card mt-2">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-2 text-center">
                                                                    <img src={post.avatar} alt={''} className="img-thumbnail img-fluid"/>
                                                                    <p className="h4 text-teal font-weight-bold">{post.name}</p>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <img src={post.image} alt={''} className="img-fluid"/>
                                                                    <p>{post.text}</p>
                                                                    <small>{new Date(post.createdAt).toLocaleDateString()} - {new Date(post.createdAt).toLocaleTimeString()}</small>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-2"/>
                                                                <div className="col-md-10">
                                                                    <button className="btn rgba-green-light btn-sm" onClick={clickLikePost.bind(this,post._id)}>
                                                                        <i className="fa fa-thumbs-up"/> {post.likes.length}
                                                                    </button>
                                                                    <button className="btn rgba-red-light btn-sm" onClick={clickUnLikePost.bind(this,post._id)}>
                                                                        <i className="fa fa-thumbs-down"/>
                                                                    </button>
                                                                    <Link to={`/posts/${post._id}`} className="btn rgba-blue-light btn-sm">
                                                                        <i className="fab fa-facebook-messenger"/> Discussions {post.comments.length}
                                                                    </Link>
                                                                    {
                                                                        user._id === post.user.toString() &&
                                                                        <button className="btn btn-danger btn-sm" onClick={clickDeletePost.bind(this,post._id)}>
                                                                            <i className="fa fa-times-circle"/>
                                                                        </button>
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
                            </div>
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default PostList;