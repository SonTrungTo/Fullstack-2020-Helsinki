import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBlog, initializeBlogs,
    likeBlog, deleteBlog } from './reducers/blogsReducer';
import { initializeUser, login, logout } from './reducers/authReducer';
import { initializeUsers } from './reducers/usersReducer';
import Users from './components/Users';
import User from './components/User';
import { Link, Route, Switch,
    useRouteMatch } from 'react-router-dom';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import BlogView from './components/BlogView';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import _ from 'lodash';


const App = () => {
    const userData = useSelector(state => state.userData);
    const users = useSelector(state => state.users);
    const message = useSelector(state => state.notification.message);
    const isSuccess = useSelector(state => state.notification.isSuccess);
    const blogs = useSelector(state => _.orderBy(state.blogs, 'likes', 'desc'));
    const dispatch = useDispatch();

    const createBlogFormRef = useRef();
    const match = useRouteMatch('/users/:id');
    const matchBlog = useRouteMatch('/blogs/:id');
    const user = match ?
        users.find(user => user.id === match.params.id)
        : null;
    const blog = matchBlog ?
        blogs.find(blog => blog.id === matchBlog.params.id)
        : null;

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
            { userData &&
            <div id='navBar'>
                <Link to='/blogs' id='link'>Blogs</Link>
                <Link to='/users' id='link'>Users</Link>
                {userData.name} logged in
                <button onClick={ handleLogout }
                    style={{ marginLeft: '20px' }}>
                        logout
                </button>
            </div>
            }
            <h2>blog app</h2>
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
                        user={userData} removeBlog={removeBlog} />
                )}
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <Notification message={ message } isSuccess={ isSuccess } />
            { userData === null ?
                <LoginForm loginUser={ loginUser } /> :
                <div>
                    { blogHeader() }
                    <Switch>
                        <Route path='/users/:id'>
                            <User user={ user } />
                        </Route>
                        <Route path='/blogs/:id'>
                            <BlogView blog={ blog }
                                addLikes={addLikes}
                                removeBlog={removeBlog}
                                user={userData} />
                        </Route>
                        <Route path='/blogs'>
                            <Blogs blogs={ blogs }
                                createNewBlog={ createNewBlog }
                                createBlogFormRef={ createBlogFormRef } />
                        </Route>
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