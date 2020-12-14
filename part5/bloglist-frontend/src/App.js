import React, { useState, useEffect, useRef } from 'react';
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const createBlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('auth');
    if (loggedInUserJSON) {
      const userData = JSON.parse(loggedInUserJSON);
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  const loginUser = async ({username, password}) => {
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem('auth', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      displaySuccessMessage(`${user.name} logged in!`);
    } catch (error) {
      displayErrorMessage('Wrong username/password');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('auth');
    setUser(null);
    displaySuccessMessage('Logged out!');
  };

  const createNewBlog = async newObject => {
    try {
      const blog = await blogService.create(newObject);
      createBlogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(blog));
      displaySuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
    } catch (error) {
      displayErrorMessage(error.response.data.error);
    }
  };

  const addLikes = async (id, originalLikes) => {
    try {
      const updatedBlog = await blogService.like(id, {likes: originalLikes + 1});
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
    } catch (error) {
      displayErrorMessage(error.response.data.error);
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
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLikes={addLikes} />
        )}
    </div>
  );

  const displayErrorMessage = message => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const displaySuccessMessage = message => {
    setIsSuccess(true);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <React.Fragment>
      <Notification message={ message } isSuccess={ isSuccess } />
      { user === null ?
      <LoginForm loginUser={ loginUser } /> :
      blogContent() }
    </React.Fragment>
  );
};

export default App