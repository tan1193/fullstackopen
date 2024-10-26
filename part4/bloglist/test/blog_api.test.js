const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); 
const Blog = require('../models/blog'); // Import your blog model
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const initialBlogs = [
    { title: 'First blog', author: 'Author One', url: 'http://example.com/1', likes: 4 },
    { title: 'Second blog', author: 'Author Two', url: 'http://example.com/2', likes: 2 },
  ];
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as JSON and the correct number', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(2);
});

afterAll(() => {
  mongoose.connection.close();
});
