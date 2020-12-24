import React, { useState } from 'react';

const Blog = ({ blog, addLikes, user, removeBlog }) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLikes = (id, originalLikes) => event => {
        addLikes(id, originalLikes);
    };

    const handleRemove = (id, blog) => event => {
        const isRemoved = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if (isRemoved) {
            removeBlog(id, blog);
        }
    };

    const buttonLabel = visible ? 'hide' : 'show';

    return (
        <div id='blogContent' className='blogContent'>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>{buttonLabel}</button>
            <div style={showWhenVisible} className='hiddenInfo'>
                {blog.url}
                <br />
      			likes {blog.likes}
                <button onClick={handleLikes(blog.id, blog.likes)}
                id='likeButton'>like</button>
                <br />
                {blog.user ? blog.user.name : ''}
                <br />
                {blog.user && blog.user.username === user.username &&
				<button style={{ backgroundColor: 'lightblue' }}
		        onClick={handleRemove(blog.id, blog)}
                id='deleteButton'>
					remove
				</button>
                }
            </div>
        </div>
    );
};

export default Blog;
