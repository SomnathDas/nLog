import Post from "../models/Post.model.js";
import User from "../models/User.model.js";
import { postDataValidation } from "../validation/postDataValidation.js";
import paginate from "express-paginate";
import sanitize from "mongo-sanitize";

const createPosts = (req, res) => {
  const cleanTitle = sanitize(req.body.title);
  const cleanContent = sanitize(req.body.content);
  const cleanUsername = sanitize(req.body.username);
  const cleanTags = sanitize(req.body.tags);

  // Validating Post Data
  const { error } = postDataValidation(req.body);
  if (error) {
    res.end({ error: true, data: error });
  }

  const post = new Post({
    title: cleanTitle,
    content: cleanContent,
    username: cleanUsername,
    tags: cleanTags,
    likes: 0,
  });

  try {
    const savedPost = post.save();
    res.json({ error: false, post_id: post._id });
  } catch (err) {
    res.status(400).json({ error: true, data: err });
  }
};

const getPosts = async (req, res) => {
  const cleanQueryLimit = sanitize(req.query.limit);
  const cleanSkip = sanitize(req.skip);

  const [posts, itemCount] = await Promise.all([
    Post.find({})
      .limit(cleanQueryLimit)
      .skip(cleanSkip)
      .lean()
      .sort({ createdAt: -1 }),
    Post.count({}),
  ]);

  const pageCount = Math.ceil(itemCount / cleanQueryLimit);

  if (!posts) {
    res.status(404).json({ error: true, data: [] });
  }
  res.json({
    error: false,
    data: posts,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
  });
};

const getPostsById = async (req, res) => {
  const cleanId = sanitize(req.params.id);

  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const posts = await Post.find({ _id: cleanId });
    res.json({ error: false, data: posts });
  } else {
    res.status(404).json({ error: true, data: [] });
  }
};

const getPostsBySearch = async (req, res) => {
  const searchText = req.query.t;
  const cleanSearchText = sanitize(searchText.trim());
  const posts = await Post.find({
    title: { $regex: cleanSearchText, $options: "i" },
  }).sort({ createdAt: -1 });
  if (posts) {
    res.json({ error: false, data: posts });
  } else {
    res.status(404).json({ error: true, data: [] });
  }
};

const getPopularPosts = async (req, res) => {
  const cleanQueryLimit = sanitize(req.query.limit);
  const cleanSkip = sanitize(req.skip);

  const [posts, itemCount] = await Promise.all([
    Post.find({})
      .limit(cleanQueryLimit)
      .skip(cleanSkip)
      .lean()
      .sort({ likes: -1, createdAt: -1 }),
    Post.count({}),
  ]);

  const pageCount = Math.ceil(itemCount / cleanQueryLimit);

  if (!posts) {
    res.status(404).json({ error: true, data: [] });
  }
  res.json({
    error: false,
    data: posts,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
  });
};

const updateLikes = async (req, res) => {
  const cleanUserId = sanitize(req.body.user_id);
  const cleanPostId = sanitize(req.body.post_id);
  const post = await Post.findById({ _id: cleanPostId });
  const user = await User.findById({ _id: cleanUserId });
  if (post.likes.includes(cleanUserId)) {
    return res.json({
      error: true,
      message: "Post is already liked by this user",
    });
  }
  // Pushing user_id into the likes array
  post.likes.push(cleanUserId);
  const savedPost = post.save();
  return res.json({
    error: false,
    message: "Post has been liked by this user",
  });
};

export {
  createPosts,
  getPosts,
  getPostsById,
  getPostsBySearch,
  updateLikes,
  getPopularPosts,
};
