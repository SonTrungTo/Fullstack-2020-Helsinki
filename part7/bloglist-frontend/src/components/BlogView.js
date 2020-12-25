import React from 'react';
import { useHistory } from 'react-router-dom';
import { addComment } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';

const BlogView = ({ blog, addLikes, removeBlog, user }) => {
    const history = useHistory();
    const dispatch = useDispatch();

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

    const handleAddComment = event => {
        event.preventDefault();

        const comment = event.target.comment.value;
        event.target.comment.value = '';
        dispatch(addComment(blog.id, { comment }));
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
            <h4>comments</h4>
            <form onSubmit={ handleAddComment }>
                <input name='comment' type='text' />
                <button type='submit'>add comment</button>
            </form>
            <ul>
                { blog.comments.map(({ comment, _id }) =>
                    <li key={ _id.toString() }>
                        { comment }
                    </li>
                ) }
            </ul>
        </div>
    );
};

export default BlogView;