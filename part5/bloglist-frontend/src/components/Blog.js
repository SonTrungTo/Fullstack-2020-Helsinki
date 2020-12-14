import React, { useState } from 'react'

const Blog = ({ blog, addLikes }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = (id, originalLikes) => event => {
    addLikes(id, originalLikes);
  };

  const buttonLabel = visible ? 'hide' : 'show';

  return (
  <div id='blogContent'>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>{buttonLabel}</button>
    <div style={showWhenVisible}>
      {blog.url}
      <br />
      likes {blog.likes}
      <button onClick={handleLikes(blog.id, blog.likes)}>like</button>
      <br />
      {blog.user ? blog.user.name : ''}
    </div>
  </div>
  );
};

export default Blog
