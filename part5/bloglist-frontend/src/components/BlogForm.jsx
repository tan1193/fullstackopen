import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title: <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        Author: <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        URL: <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
