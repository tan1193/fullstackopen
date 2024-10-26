require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs');


app.get('/api/blogs', blogsRouter, async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});


const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, {
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});