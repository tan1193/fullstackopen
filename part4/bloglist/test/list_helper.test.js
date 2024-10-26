// tests/list_helper.test.js
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('Blog list helper functions', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test('when list has multiple blogs, equals the total likes', () => {
    const listWithMultipleBlogs = [
      {
        _id: '1',
        title: 'First Blog',
        author: 'Author One',
        url: 'http://example.com/1',
        likes: 3,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Second Blog',
        author: 'Author Two',
        url: 'http://example.com/2',
        likes: 7,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 10);
  });
});

describe('most blogs', () => {
    test('finds the author with the most blogs', () => {
      const blogs = [
        { author: 'Author One', likes: 3 },
        { author: 'Author Two', likes: 7 },
        { author: 'Author One', likes: 5 },
      ];
  
      const result = listHelper.mostBlogs(blogs);
      assert.deepStrictEqual(result, { author: 'Author One', blogs: 2 });
    });
  });
  
  describe('most likes', () => {
    test('finds the author with the most likes', () => {
      const blogs = [
        { author: 'Author One', likes: 3 },
        { author: 'Author Two', likes: 7 },
        { author: 'Author One', likes: 5 },
      ];
  
      const result = listHelper.mostLikes(blogs);
      assert.deepStrictEqual(result, { author: 'Author One', likes: 8 });
    });
  });