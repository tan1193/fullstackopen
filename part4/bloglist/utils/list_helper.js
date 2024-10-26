// utils/list_helper.js
const _ = require('lodash');
const dummy = (blogs) => {
    return 1;
  };
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  };
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
  
    return blogs.reduce((prev, current) => {
      return prev.likes > current.likes ? prev : current;
    });
  };
  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
  
    const countByAuthor = _.countBy(blogs, 'author');
    const authorWithMostBlogs = _.maxBy(Object.keys(countByAuthor), (author) => countByAuthor[author]);
  
    return {
      author: authorWithMostBlogs,
      blogs: countByAuthor[authorWithMostBlogs],
    };
  };

  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
  
    const grouped = _.groupBy(blogs, 'author');
    const authorLikes = _.map(grouped, (blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes'),
    }));
  
    return _.maxBy(authorLikes, 'likes');
  };
  
  module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
  

  