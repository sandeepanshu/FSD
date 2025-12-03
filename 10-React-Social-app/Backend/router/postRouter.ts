// router/postRouter.ts
import express from "express";
import verifyToken from "../middlewares/TokenVerifier.ts";
import UserTable from "../models/UserTable.ts";
import PostTable from "../models/PostTable.ts";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import type { IUser } from "../models/IUser.ts";
import type { IPost } from "../models/IPost.ts";

const postRouter: express.Router = express.Router();

/*
  CREATE POST
  POST /api/posts/
  PRIVATE
*/
postRouter.post(
  "/",
  [
    body("image").not().isEmpty().withMessage("Image Url is Required"),
    body("text").not().isEmpty().withMessage("Text is Required"),
  ],
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { image, text } = request.body;
      const requestedUser: any = (request as any).user;
      if (!requestedUser?.id) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Authentication required" }] });
      }

      const user: IUser | null = await UserTable.findById(requestedUser.id);
      if (!user) {
        return response
          .status(404)
          .json({ errors: [{ msg: "User not found" }] });
      }

      const newPost = {
        user: requestedUser.id,
        text,
        image,
        name: user.name,
        avatar: user.avatar,
      };

      let post = new PostTable(newPost);
      post = await post.save();

      return response.status(201).json({
        msg: "Post is Created Successfully",
        post,
      });
    } catch (error: any) {
      return response.status(500).json({
        errors: [{ msg: error?.message ?? String(error) }],
      });
    }
  }
);

/*
  GET ALL POSTS
  GET /api/posts/
  PRIVATE
*/
postRouter.get(
  "/",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      const posts: IPost[] = await PostTable.find().sort({ createdAt: -1 });
      if (!posts || posts.length === 0) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Posts Found" }] });
      }
      return response.status(200).json({ posts });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

/*
  GET POST BY ID
  GET /api/posts/:postId
  PRIVATE
*/
postRouter.get(
  "/:postId",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      const { postId } = request.params;
      if (!mongoose.isValidObjectId(postId)) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid postId" }] });
      }

      const post: IPost | null = await PostTable.findById(postId);
      if (!post) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Posts Found for the Post ID" }] });
      }
      return response.status(200).json({ post });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

/*
  DELETE POST
  DELETE /api/posts/:postId
  PRIVATE
*/
postRouter.delete(
  "/:postId",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      const { postId } = request.params;
      if (!mongoose.isValidObjectId(postId)) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid postId" }] });
      }

      const post: IPost | null = await PostTable.findById(postId);
      if (!post) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Posts Found for the Post ID" }] });
      }

      const requestedUser: any = (request as any).user;
      if (!requestedUser?.id) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Authentication required" }] });
      }

      // Authorization: only post owner can delete
      if (post.user.toString() !== requestedUser.id.toString()) {
        return response
          .status(403)
          .json({
            errors: [{ msg: "User not authorized to delete this post" }],
          });
      }

      await PostTable.findByIdAndDelete(postId);
      return response
        .status(200)
        .json({ msg: "Post Deleted Successfully", post });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

/*
  LIKE POST
  PUT /api/posts/like/:postId
  PRIVATE
*/
postRouter.put(
  "/like/:postId",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      const { postId } = request.params;
      if (!mongoose.isValidObjectId(postId)) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid postId" }] });
      }

      const requestedUser: any = (request as any).user;
      if (!requestedUser?.id) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Authentication required" }] });
      }

      const post: IPost | null = await PostTable.findById(postId);
      if (!post) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Posts Found for the Post ID" }] });
      }

      const alreadyLiked = post.likes.some(
        (like) => like.user.toString() === requestedUser.id.toString()
      );
      if (alreadyLiked) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Post has already been liked" }] });
      }

      post.likes.unshift({ user: requestedUser.id });
      await post.save();
      return response.status(200).json({ post });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

/*
  UNLIKE POST
  PUT /api/posts/unlike/:postId
  PRIVATE
*/
postRouter.put(
  "/unlike/:postId",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      const { postId } = request.params;
      if (!mongoose.isValidObjectId(postId)) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid postId" }] });
      }

      const requestedUser: any = (request as any).user;
      if (!requestedUser?.id) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Authentication required" }] });
      }

      const post: IPost | null = await PostTable.findById(postId);
      if (!post) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Posts Found for the Post ID" }] });
      }

      const likedIndex = post.likes.findIndex(
        (like) => like.user.toString() === requestedUser.id.toString()
      );
      if (likedIndex === -1) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Post has not been liked" }] });
      }

      post.likes.splice(likedIndex, 1);
      await post.save();
      return response.status(200).json({ post });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

/*
  ADD COMMENT
  POST /api/posts/comment/:postId
  PRIVATE
*/
postRouter.post(
  "/comment/:postId",
  [body("text").not().isEmpty().withMessage("Text is Required")],
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { text } = request.body;
      const { postId } = request.params;
      if (!mongoose.isValidObjectId(postId)) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid postId" }] });
      }

      const requestedUser: any = (request as any).user;
      if (!requestedUser?.id) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Authentication required" }] });
      }

      const user: IUser | null = await UserTable.findById(requestedUser.id);
      if (!user) {
        return response
          .status(404)
          .json({ errors: [{ msg: "User not found" }] });
      }

      const post: IPost | null = await PostTable.findById(postId);
      if (!post) {
        return response
          .status(404)
          .json({ errors: [{ msg: "No Posts Found for the Post ID" }] });
      }

      const newComment = {
        user: requestedUser.id,
        text,
        name: user.name,
        avatar: user.avatar,
        date: new Date().toLocaleDateString(),
      };

      post.comments.unshift(newComment);
      const saved = await post.save();
      return response
        .status(201)
        .json({ msg: "Comment is Created Successfully", post: saved });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

/*
  DELETE COMMENT
  DELETE /api/posts/comment/:postId/:commentId
  PRIVATE
*/
postRouter.delete(
  "/comment/:postId/:commentId",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    try {
      const { postId, commentId } = request.params;
      if (
        !mongoose.isValidObjectId(postId) ||
        !mongoose.isValidObjectId(commentId)
      ) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid postId or commentId" }] });
      }

      const requestedUser: any = (request as any).user;
      if (!requestedUser?.id) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Authentication required" }] });
      }

      const post: IPost | null = await PostTable.findById(postId);
      if (!post) {
        return response
          .status(404)
          .json({ errors: [{ msg: "Post not found" }] });
      }

      const comment = post.comments.find(
        (c) => c._id && c._id.toString() === commentId.toString()
      );
      if (!comment) {
        return response
          .status(404)
          .json({ errors: [{ msg: "Comment not exists" }] });
      }

      // Only comment owner can delete their comment
      if (comment.user.toString() !== requestedUser.id.toString()) {
        return response
          .status(403)
          .json({ errors: [{ msg: "User is not authorized" }] });
      }

      const removeIndex = post.comments.findIndex(
        (c) => c._id && c._id.toString() === commentId
      );
      if (removeIndex !== -1) {
        post.comments.splice(removeIndex, 1);
        const saved = await post.save();
        return response
          .status(200)
          .json({ msg: "Comment is Deleted", post: saved });
      }

      // If index not found for some reason
      return response
        .status(404)
        .json({ errors: [{ msg: "Comment not exists" }] });
    } catch (error: any) {
      return response
        .status(500)
        .json({ errors: [{ msg: error?.message ?? String(error) }] });
    }
  }
);

export default postRouter;
