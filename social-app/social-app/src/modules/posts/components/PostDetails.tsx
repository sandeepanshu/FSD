import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../redux/store";

import {
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../../../redux/posts/post.types";

import Spinner from "../../../layout/util/Spinner";

const PostDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { postId } = useParams<{ postId: string }>();

  const [comment, setComment] = useState({ text: "" });

  // ---------------------------
  // Redux State
  // ---------------------------
  const { loading, selectedPost } = useSelector(
    (state: RootState) => state.post
  );
  const { user } = useSelector((state: RootState) => state.user);

  // ---------------------------
  // Load post on mount
  // ---------------------------
  useEffect(() => {
    if (postId) {
      dispatch({ type: GET_POST, payload: { postId } });
    }
  }, [postId, dispatch]);

  // ---------------------------
  // Handlers
  // ---------------------------
  const updateInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ text: event.target.value });
  };

  const submitCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!postId) return;

    dispatch({
      type: CREATE_COMMENT,
      payload: { postId, comment: comment.text },
    });

    setComment({ text: "" });
  };

  const clickDeleteComment = (commentId: string) => {
    if (!postId) return;

    dispatch({
      type: DELETE_COMMENT,
      payload: { postId, commentId },
    });
  };

  if (loading || !selectedPost) return <Spinner />;

  return (
    <>
      {/* Back Button */}
      <section className="mt-3">
        <div className="container">
          <Link to="/posts/list" className="btn btn-teal btn-sm">
            <i className="fa fa-arrow-alt-circle-left" /> Back
          </Link>
        </div>
      </section>

      {/* Post Details Section */}
      <section>
        <div className="container">
          <div className="card mt-3">
            <div className="card-body bg-light-grey">
              <div className="row">
                <div className="col-md-2 text-center">
                  <img
                    src={selectedPost.avatar}
                    className="img-thumbnail img-fluid"
                    alt="avatar"
                  />
                  <p className="h4 text-teal font-weight-bold">
                    {selectedPost.name}
                  </p>
                </div>

                <div className="col-md-10">
                  <img
                    src={selectedPost.image}
                    alt="post"
                    className="img-fluid"
                  />
                  <p>{selectedPost.text}</p>
                  <small>
                    {new Date(selectedPost.createdAt ?? "").toLocaleDateString()} -{" "}
                    {new Date(selectedPost.createdAt ?? "").toLocaleTimeString()}
                  </small>
                </div>
              </div>

              {/* Comment Box */}
              <div className="row mt-4">
                <div className="col-md-2 align-self-center"></div>

                {user && (
                  <div className="col-md-1">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="img-fluid img-thumbnail"
                    />
                  </div>
                )}

                <div className="col-md-6">
                  <form onSubmit={submitCreateComment}>
                    <textarea
                      required
                      value={comment.text}
                      onChange={updateInput}
                      rows={3}
                      className="form-control mb-2"
                      placeholder="Write a comment..."
                    />

                    <button className="btn btn-teal btn-sm" type="submit">
                      Comment
                    </button>
                  </form>
                </div>
              </div>

              {/* Comments List */}
              {selectedPost.comments.length > 0 &&
                selectedPost.comments.map((c) => (
                  <div className="row mt-3" key={c._id}>
                    <div className="col-md-2"></div>

                    <div className="col-md-10">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3 text-center">
                              <img
                                src={c.avatar}
                                alt="comment-avatar"
                                width="50"
                                height="50"
                              />
                              <br />
                              <small className="text-teal">{c.name}</small>
                            </div>

                            <div className="col-md-6">
                              <p>{c.text}</p>

                              {user && c.user === user._id && c._id && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => clickDeleteComment(c._id!)}
                                >
                                  <i className="fa fa-times-circle" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginBottom: "150px" }}></div>
    </>
  );
};

export default PostDetails;
