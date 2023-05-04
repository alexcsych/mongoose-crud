const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, Post } = require('../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);
    if (!createdUser) {
      return next(createHttpError(400, 'Bad Request'));
    }
    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const foundUser = await User.find();
    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }
    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const { body } = req;
  const { userId } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }
    res.status(200).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.createUserPost = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const newPost = { ...body, userId: new mongoose.Types.ObjectId(userId) };
    const createdPost = await Post.create(newPost);

    if (!createdPost) {
      return next(createHttpError(400, 'Bad Request'));
    }
    const preparedPost = _.omit(createdPost.toObject(), ['updatedAt']);
    res.status(201).send({ data: preparedPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundPosts = await User.aggregate()
      .match({ _id: new mongoose.Types.ObjectId(userId) })
      .lookup({
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'userPosts',
      })
      .project({ userPosts: 1, _id: 0 });

    if (!foundPosts.length) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};
