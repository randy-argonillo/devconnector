const postService = require('../services/post');
const userService = require('../services/user');

async function addPost(req, res) {
  try {
    const { userId, body } = req;
    const { text } = body;

    const user = await userService.getUserById(userId);
    const post = await postService.create(text, user);

    return res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function deletePost(req, res) {
  try {
    const {
      params: { post_id },
      userId,
    } = req;

    const isOwnByUser = await postService.isUserPost(userId, post_id);
    if (!isOwnByUser) {
      return res
        .status(403)
        .json({ error: 'You are not allowed to delete other posts.' });
    }

    await postService.deleteById(post_id);
    return res.json({ msg: 'deleted' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function getPost(req, res) {
  try {
    const { post_id } = req.params;
    const post = await postService.getPostById(post_id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    console.log(error);

    if (error instanceof postService.CastError) {
      return res.status(400).json({ error: 'You pass an invalid id' });
    }

    res.json({ error: 'Server Error' });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.satus(500).json({ error: 'Server Error' });
  }
}

async function likePost(req, res) {
  try {
    const { post, userId } = req;
    const user = await userService.getUserById(userId);
    const updatedPost = await postService.likePost(post, user);

    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server Error' });
  }
}

async function unlikePost(req, res) {
  try {
    const { post, userId } = req;
    const updatedPost = await postService.unlikePost(post, userId);

    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server Error' });
  }
}

async function addComment(req, res) {
  try {
    const {
      post,
      userId,
      body: { text },
    } = req;

    const user = await userService.getUserById(userId);
    const updatedPost = await postService.addComment(text, post, user);
    return res.json(updatedPost);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Server Error' });
  }
}

async function deleteComment(req, res) {
  try {
    const {
      post,
      params: { comment_id },
      userId,
    } = req;

    const comment = postService.getCommentById(comment_id, post);
    if (!comment) {
      return res.status(404).json({ error: 'Comment does not exist' });
    }

    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'Not allowed to delete other comments' });
    }

    const updatePost = await postService.deleteComment(comment, post);
    return res.json(updatePost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  addPost,
  deletePost,
  getPost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  getAllPosts
};
