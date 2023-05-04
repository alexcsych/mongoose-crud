const createHttpError = require('http-errors');
const { Post } = require('../models');

module.exports.createPost = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPost = await Post.create(body);
    if (!createdPost) {
      return next(createHttpError(400, 'Bad Request'));
    }
    res.status(201).send({ data: createdPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getPosts = async (req, res, next) => {
  try {
    const foundPost = await Post.find();
    res.status(200).send({ data: foundPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getPostById = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      return next(createHttpError(404, 'Post Not Found'));
    }
    res.status(200).send({ data: foundPost });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePostById = async (req, res, next) => {
  const { body } = req;
  const { postId } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return next(createHttpError(404, 'Post Not Found'));
    }
    res.status(200).send({ data: updatedPost });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePostById = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return next(createHttpError(404, 'Post Not Found'));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
