import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displaySuccessMessage, displayErrorMessage } from './reducers/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import _ from 'lodash';


const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const message = useSelector(state => state.notification.message);
    const isSuccess = useSelector(state => state.notification.isSuccess);
    const dispatch = useDispatch();

    const createBlogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs => {
            const sortedBlogs = _.orderBy(blogs, 'likes', 'desc');
            setBlogs( sortedBlogs );
        });
    }, []);

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem('auth');
        if (loggedInUserJSON) {
            const userData = JSON.parse(loggedInUserJSON);
            setUser(userData);
            blogService.setToken(userData.token);
        }
    }, []);

    const loginUser = async ({ username, password }) => {
        try {
            const user = await loginService.login({
                username, password
            });
            window.localStorage.setItem('auth', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            dispatch(displaySuccessMessage(`${user.name} logged in!`, 5));
        } catch (error) {
            dispatch(displayErrorMessage('Wrong username/password', 5));
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('auth');
        setUser(null);
        dispatch(displaySuccessMessage('Logged out!', 5));
    };

    const createNewBlog = async newObject => {
        try {
            const blog = await blogService.create(newObject);
            createBlogFormRef.current.toggleVisibility();
            setBlogs(blogs.concat(blog));
            dispatch(displaySuccessMessage(`a new blog ${blog.title} by ${blog.author} added`, 5));
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };

    const addLikes = async (id, originalLikes) => {
        try {
            const updatedBlog = await blogService.like(id, { likes: originalLikes + 1 });
            const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
            setBlogs(updatedBlogs);
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };

    const removeBlog = async (id, blog) => {
        try {
            await blogService.removeBlog(id);
            setBlogs(blogs.filter(blog => blog.id !== id));
            dispatch(displaySuccessMessage(`${blog.title} by ${blog.author} removed!`, 5));
        } catch (error) {
            dispatch(displayErrorMessage(error.response.data.error, 5));
        }
    };

    const blogContent = () => (
        <div>
            <h2>blogs</h2>
            { user &&
            <p>
                {user.name} logged in <button onClick={ handleLogout }>logout</button>
            </p>
            }
            <Togglable labelButton='create new blog' ref={ createBlogFormRef }>
                <CreateBlogForm addBlog={createNewBlog} />
            </Togglable>
            <div id='blogList'>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} addLikes={addLikes}
                        user={user} removeBlog={removeBlog} />
                )}
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <Notification message={ message } isSuccess={ isSuccess } />
            { user === null ?
                <LoginForm loginUser={ loginUser } /> :
                blogContent() }
        </React.Fragment>
    );
};

export default App;