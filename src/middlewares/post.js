const postService = require('../services/post');

const getAndAppendPost = async (req, res, next) => {
  const { post_id } = req.params;

  const post = await postService.getPostById(post_id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  req.post = post;
  next();
};

module.exports = {
  getAndAppendPost
}
