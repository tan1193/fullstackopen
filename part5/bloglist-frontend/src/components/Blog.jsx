import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div style={{ border: 'solid', borderWidth: 1, marginBottom: 5, padding: 10 }}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleExpanded}>{expanded ? 'Hide' : 'View'}</button>
      </div>
      {expanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={() => updateLikes(blog)}>Like</button>
          </p>
          <p>Added by {blog.user?.name || 'Unknown'}</p>
          {blog.user?.username === user.username && (
            <button onClick={() => deleteBlog(blog)}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
