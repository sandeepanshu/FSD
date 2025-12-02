import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { RootState } from "../../../redux/store";

// Saga trigger actions
import {
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
} from "../../../redux/posts/post.types";

import Spinner from "../../../layout/util/Spinner";

const PostList: React.FC = () => {
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    text: "",
    image: "",
  });

  // -----------------------------
  // Load all posts on mount
  // -----------------------------
  useEffect(() => {
    dispatch({ type: GET_ALL_POSTS });
  }, [dispatch]);

  // -----------------------------
  // Redux State
  // -----------------------------
  const { user } = useSelector((state: RootState) => state.user);
  const { loading, posts } = useSelector((state: RootState) => state.post);

  // -----------------------------
  // Handlers
  // -----------------------------
  const updateInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const submitCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: CREATE_POST,
      payload: post,
    });

    setPost({ text: "", image: "" });
  };

  const clickLikePost = (postId: string) => {
    dispatch({
      type: LIKE_POST,
      payload: { postId },
    });
  };

  const clickUnLikePost = (postId: string) => {
    dispatch({
      type: DISLIKE_POST,
      payload: { postId },
    });
  };

  const clickDeletePost = (postId: string) => {
    dispatch({
      type: DELETE_POST,
      payload: { postId },
    });
  };

  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <>
      <section className="mt-3">
        <div className="container">
          <p className="h3 text-teal">Welcome to React Social Community</p>
          <p>
            Share posts, engage, and interact with developers around the world.
          </p>
        </div>
      </section>

      {/* -------- Create Post ---------- */}
      <section>
        <div className="container">
          <div className="card">
            <div className="card-body bg-light-grey">
              <div className="row align-items-center">
                {user && (
                  <div className="col-md-3">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="img-fluid img-thumbnail"
                    />
                  </div>
                )}

                <div className="col-md-8">
                  <form onSubmit={submitCreatePost}>
                    <textarea
                      required
                      name="text"
                      value={post.text}
                      onChange={updateInput}
                      rows={3}
                      className="form-control mb-2"
                      placeholder="Your Post Content..."
                    />

                    <input
                      required
                      name="image"
                      value={post.image}
                      onChange={updateInput}
                      type="text"
                      className="form-control mb-2"
                      placeholder="Image URL"
                    />

                    <button className="btn btn-teal btn-sm" type="submit">
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- Posts List ---------- */}
      {loading ? (
        <Spinner />
      ) : (
        <section className="mt-3">
          <div className="container">
            <p className="h3 text-teal">All Posts</p>
            <hr />

            {posts.map((post) => (
              <div className="card mt-3" key={post._id}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2 text-center">
                      <img
                        src={post.avatar}
                        alt="avatar"
                        className="img-thumbnail img-fluid"
                      />
                      <p className="h5 text-teal font-weight-bold">
                        {post.name}
                      </p>
                    </div>

                    <div className="col-md-10">
                      <img
                        src={post.image}
                        alt="post-img"
                        className="img-fluid"
                      />
                      <p>{post.text}</p>
                      <small>
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
                        {post.createdAt && new Date(post.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="row mt-3">
                    <div className="col-md-2"></div>
                    <div className="col-md-10">
                      {typeof post._id === "string" && post._id && (
                        <button
                          className="btn rgba-green-light btn-sm"
                          onClick={() => clickLikePost(post._id!)}
                        >
                          <i className="fa fa-thumbs-up" /> {post.likes.length}
                        </button>
                      )}

                      {typeof post._id === "string" && (
                        <button
                          className="btn rgba-red-light btn-sm ml-2"
                          onClick={() => clickUnLikePost(post._id as string)}
                        >
                          <i className="fa fa-thumbs-down" />
                        </button>
                      )}

                      <Link
                        to={`/posts/${post._id}`}
                        className="btn rgba-blue-light btn-sm ml-2"
                      >
                        <i className="fab fa-facebook-messenger" /> Discussions{" "}
                        {post.comments.length}
                      </Link>

                      {user?._id === post.user.toString() && typeof post._id === "string" && post._id && (
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => clickDeletePost(post._id as string)}
                        >
                          <i className="fa fa-times-circle" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default PostList;
