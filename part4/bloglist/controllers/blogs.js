// controllers/blogs.js
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});



blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = await User.findOne(); // Find any user (for now)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});


blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== decodedToken.id) {
    return res.status(403).json({ error: 'permission denied' });
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = blogsRouter;
