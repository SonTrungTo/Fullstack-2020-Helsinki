import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
    }
  }, []);

  const blogsContent = () => (
    <div>
      <h2>blogs</h2>
      { user &&
      <p>
        {user.name} logged in <button onClick={ handleLogout }>logout</button>
      </p>
      }
      <p>
        <h2>create new</h2>
        <form onSubmit={ handleAdd }>
          <div>
            title:
            <input
            type='text'
            name='title'
            value={title}
            onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            author:
            <input
            type='text'
            name='author'
            value={author}
            onChange={({target}) => setAuthor(target.value)} />
          </div>
          <div>
            url:
            <input
            type='text'
            name='url'
            value={url}
            onChange={({target}) => setUrl(target.value)} />
          </div>
          <button type='submit'>create</button>
        </form>
    </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type='text'
          name='username'
          value={username}
          onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
          type='password'
          name='password'
          value={password}
          onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem('auth', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage(`Wrong username/password`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('auth');
    setUser(null);
  };

  const handleAdd = async event => {
    event.preventDefault();

    try {
      const blog = await blogService.create({
        title, author, url
      });
      setBlogs(blogs.concat(blog));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      { errorMessage && <p>{errorMessage}</p> }
      { user === null ? loginForm() : blogsContent() }
    </React.Fragment>
  );
};

export default App