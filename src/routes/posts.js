const express = require('express');

const verifyToken = require('../middlewares/verifyToken');
const { getAndAppendPost } = require('../middlewares/post');
const {
  validateBody,
  Joi,
  validateObjectId,
} = require('../middlewares/validation');
const controller = require('../controllers/post');

const router = express.Router();

/*
  @route     POST /api/posts
  @desc      Get all posts
  @access    protected
*/
router.get('/', verifyToken, controller.getAllPosts);

/*
  @route     POST api/posts
  @desc      Add post
  @access    protected
*/
router.post(
  '/',
  validateBody({
    text: Joi.string().required(),
  }),
  verifyToken,
  controller.addPost
);

/*
  @route     GET api/posts/:post_id
  @desc      Get post
  @access    protected
*/
router.get('/:post_id', validateObjectId('post_id'), controller.getPost);

/*
  @route     DELETE api/posts/:id
  @desc      Delete user post
  @access    protected
*/
router.delete('/:post_id', verifyToken, controller.deletePost);

/*
  @route     POST api/posts/:post_id/likes
  @desc      Like a post
  @access    protected
*/
router.post(
  '/:post_id/likes',
  verifyToken,
  validateObjectId('post_id'),
  getAndAppendPost,
  controller.likePost
);

/*
  @route     DELETE api/posts/:post_id/likes
  @desc      Delete a post
  @access    protected
*/
router.delete(
  '/:post_id/likes',
  verifyToken,
  validateObjectId('post_id'),
  getAndAppendPost,
  controller.unlikePost
);

/*
  @route     POST api/posts/:post_id/comments
  @desc      Add user comment
  @access    protected
*/
router.post('/:post_id/comments',
  verifyToken,
  validateBody({
    text: Joi.string().required()
  }),
  getAndAppendPost,
  controller.addComment
);

/*
  @route     DELETE api/posts/:post_id/comments/:comment_id
  @desc      Delete user comment
  @access    protected
*/
router.delete('/:post_id/comments/:comment_id',
  verifyToken,
  validateObjectId('post_id'),
  validateObjectId('comment_id'),
  getAndAppendPost,
  controller.deleteComment
);

module.exports = router;
