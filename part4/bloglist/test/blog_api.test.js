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

test('a blog can be deleted', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
});

test('a blog\'s likes can be updated', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedBlogData = {
    likes: blogToUpdate.likes + 1,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBe(blogToUpdate.likes + 1);

  const blogsAtEnd = await Blog.find({});
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id);
  expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
});


afterAll(() => {
  mongoose.connection.close();
});
