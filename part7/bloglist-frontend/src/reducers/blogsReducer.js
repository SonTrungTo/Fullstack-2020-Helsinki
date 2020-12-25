import blogsService from '../services/blogs';
import { displaySuccessMessage,
    displayErrorMessage } from './notificationReducer';

const blogsReducer = (state = [], action) => {
    switch (action.type) {
    case 'CREATE_BLOG': {
        return state.concat(action.data);
    }
    case 'INIT_BLOG': {
        return action.data;
    }
    case 'LIKE_BLOG': {
        const targetBlogId = action.data;
        const targetBlog = state.find(blog => blog.id === targetBlogId);
        const updatedBlog = {
            ...targetBlog,
            likes: targetBlog.likes + 1
        };
        return state.map(blog => blog.id === targetBlogId ?
            updatedBlog : blog);
    }
    case 'DELETE_BLOG': {
        const targetBlogId = action.data;
        return state.filter(blog => blog.id !== targetBlogId);
    }
    case 'ADD_COMMENT': {
        const targetBlogId = action.data.id;
        const targetBlog = state.find(blog => blog.id === targetBlogId);
        const updatedBlog = {
            ...targetBlog,
            comments: targetBlog.comments.concat(action.data.comment)
        };
        return state.map(blog => blog.id === targetBlogId ?
            updatedBlog : blog);
    }
    default:
        return state;
    }
};

export const createBlog = (newObject) => {
    return async dispatch => {
        try {
            const blog = await blogsService.create(newObject);
            dispatch({
                type: 'CREATE_BLOG',
                data: blog
            });
            dispatch(displaySuccessMessage(`a new blog ${blog.title} by ${blog.author} added`, 5));
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };
};

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll();
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        });
    };
};

export const likeBlog = (id, newObject) => {
    return async dispatch => {
        try {
            await blogsService.like(id, newObject);
            dispatch({
                type: 'LIKE_BLOG',
                data: id
            });
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };
};

export const addComment = (id, { comment }) => {
    return async dispatch => {
        try {
            const newComment = await blogsService.addComment(id, { comment });
            dispatch({
                type: 'ADD_COMMENT',
                data: {
                    id,
                    comment: newComment
                }
            });
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };
};

export const deleteBlog = (id, blog) => {
    return async dispatch => {
        try {
            await blogsService.removeBlog(id);
            dispatch({
                type: 'DELETE_BLOG',
                data: id
            });
            dispatch(displaySuccessMessage(`${blog.title} by ${blog.author} removed!`, 5));
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };
};

export default blogsReducer;