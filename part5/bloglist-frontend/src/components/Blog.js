import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? 'hide' : 'show';

  return (
  <div id='blogContent'>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>{buttonLabel}</button>
    <div style={showWhenVisible}>
      {blog.url}
      <br />
      likes {blog.likes} <button>like</button>
      <br />
      {blog.user ? blog.user.name : ''}
    </div>
  </div>
  );
};

export default Blog
