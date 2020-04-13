const mongoose = require('mongoose');

const Post = require('../models/post');

async function create(text, user) {
  try {
    const { id, name, avatar } = user;
    return Post.create({ text, user: id, name, avatar });
  } catch (error) {
    throw error;
  }
}

async function deleteById(postId) {
  try {
    return Post.deleteOne({ _id: postId });
  } catch (error) {
    throw error;
  }
}

async function getPostById(postId) {
  try {
    return Post.findById(postId);
  } catch (e) {
    throw e;
  }
}

async function getAllPosts() {
  try {
    return Post.find().sort({ date: -1 });
  } catch (error) {
    throw error;
  }
}

async function likePost(post, user) {
  try {
    const userAlreadyLikeThePost = post.likes.some((like) => {
      return like.user.toString() === user.id;
    });
    if (userAlreadyLikeThePost) {
      return post;
    }

    post.likes.push({ user: user.id, name: user.name, avatar: user.avatar });
    return post.save();
  } catch (error) {
    throw error;
  }
}

async function unlikePost(post, userId) {
  try {
    post.likes = post.likes.filter((like) => like.user.toString() !== userId);
    return post.save();
  } catch (error) {
    throw error;
  }
}

async function addComment(text, post, user) {
  try {
    post.comments.push({
      user: user.id,
      text,
      name: user.name,
      avatar: user.avatar,
    });

    return post.save();
  } catch (error) {
    throw error;
  }
}

function getCommentById(commentId, post) {
  return post.comments.find((comment) => comment.id === commentId);
}

async function deleteComment(comment, post) {
  try {
    post.comments = post.comments.filter((c) => c.id !== comment.id);
    return post.save();
  } catch (error) {
    throw error;
  }
}

async function isUserPost(userId, postId) {
  try {
    const post = await getPostById(postId);
    return post.user.toString() === userId;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  create,
  deleteById,
  getPostById,
  CastError: mongoose.Error.CastError,
  likePost,
  unlikePost,
  addComment,
  getCommentById,
  deleteComment,
  isUserPost,
  getAllPosts,
};
