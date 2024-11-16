import axios from 'axios'
const baseUrl = '/api/blogs'

const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
res.json(blogs);

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const likeBlog = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  };
  const response = await axios.put(`/api/blogs/${blog.id}`, updatedBlog);
  return response.data;
};


const deleteBlog = async (blog) => {
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  await axios.delete(`/api/blogs/${blog.id}`, config);
};

export default { getAll, likeBlog, deleteBlog  }