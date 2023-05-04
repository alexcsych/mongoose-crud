const { Router } = require('express');
const { postController } = require('../controller');

const postRouter = Router();

postRouter
  .route('/')
  .get(postController.getPosts)
  .post(postController.createPost);

postRouter
  .route('/:postId')
  .get(postController.getPostById)
  .patch(postController.updatePostById)
  .delete(postController.deletePostById);

module.exports = postRouter;
