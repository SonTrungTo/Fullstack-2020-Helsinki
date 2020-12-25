import React from 'react';
import { useHistory } from 'react-router-dom';

const BlogView = ({ blog, addLikes, removeBlog, user }) => {
    const history = useHistory();

    const handleLikes = (id, originalLikes) => event => {
        addLikes(id, originalLikes);
    };

    const handleRemove = (id, blog) => event => {
        const isRemoved = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if (isRemoved) {
            removeBlog(id, blog);
            history.push('/blogs');
        }
    };

    if (!blog) {
        return null;
    }

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <a href={ blog.url }>{ blog.url }</a>
            <div>
                { blog.likes } likes
                <button
                    onClick={ handleLikes(blog.id, blog.likes) }>
                like
                </button>
            </div>
            <div>
                added by { blog.user ? blog.user.name : '' }
            </div>
            { blog.user && user.username === blog.user.username &&
            <button style={{ backgroundColor: 'lightblue' }}
                onClick={handleRemove(blog.id, blog)}
                id='deleteButton'>
            remove
            </button> }
        </div>
    );
};

export default BlogView;