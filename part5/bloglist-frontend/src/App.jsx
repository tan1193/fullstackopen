import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const notify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3003/api/login', credentials);
      setUser(response.data);
      notify(`Welcome ${response.data.name}`);
    } catch (error) {
      notify('Wrong username or password', 'error');
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  };
  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
    <h2>Blogs</h2>
    {sortedBlogs.map((blog) => (
      <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
    ))}
  </div>
  );
};

export default App;
