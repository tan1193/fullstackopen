require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // Assuming the Blog model is defined in models/blog.js
const usersRouter = require('./controllers/users');
app.use('/api/users', usersRouter);
const loginRouter = require('./controllers/login');
app.use('/api/login', loginRouter);
const middleware = require('./utils/middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Routes

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Add a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, author, url, likes = 0 } = req.body;

    // Validate title and URL
    if (!title || !url) {
      return res.status(400).json({ error: 'Title or URL missing' });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save blog' });
  }
});

// Middleware for handling unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
});

// Middleware for handling errors
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted ID' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
});

// Delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndRemove(blogId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Malformed ID or blog not found' });
  }
});

// Update a blog by ID
app.put('/api/blogs/:id', async (req, res) => {
  const { likes } = req.body;
  const updatedData = { likes };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Malformed ID' });
  }
});

// Export the app for testing
module.exports = app;
