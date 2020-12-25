import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBlog, initializeBlogs,
    likeBlog, deleteBlog } from './reducers/blogsReducer';
import { initializeUser, login, logout } from './reducers/authReducer';
import { initializeUsers } from './reducers/usersReducer';
import Users from './components/Users';
import { Link, Route, Switch } from 'react-router-dom';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import _ from 'lodash';


const App = () => {
    const user = useSelector(state => state.userData);
    const users = useSelector(state => state.users);
    const message = useSelector(state => state.notification.message);
    const isSuccess = useSelector(state => state.notification.isSuccess);
    const blogs = useSelector(state => _.orderBy(state.blogs, 'likes', 'desc'));
    const dispatch = useDispatch();

    const createBlogFormRef = useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(initializeUser());
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(initializeUsers());
    // eslint-disable-next-line
    }, []);

    const loginUser = ({ username, password }) => {
        dispatch(login({ username, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const createNewBlog = newObject => {
        createBlogFormRef.current.toggleVisibility();
        dispatch(createBlog(newObject));
    };

    const addLikes = (id, originalLikes) => {
        dispatch(likeBlog(id, { likes: originalLikes + 1 }));
    };

    const removeBlog = (id, blog) => {
        dispatch(deleteBlog(id, blog));
    };

    const blogHeader = () => (
        <div>
            <h2>blogs</h2>
            { user &&
            <div>
                {user.name} logged in <button onClick={ handleLogout }>logout</button>
                <div>
                    <Link to='/users'>Users</Link>
                </div>
            </div>
            }
        </div>
    );

    const blogContent = () => (
        <div>
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
                <div>
                    { blogHeader() }
                    <Switch>
                        <Route path='/users'>
                            <Users users={ users } />
                        </Route>
                        <Route path='/'>
                            { blogContent() }
                        </Route>
                    </Switch>
                </div>
            }
        </React.Fragment>
    );
};

export default App;