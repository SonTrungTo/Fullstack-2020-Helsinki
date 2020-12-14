import React, { useState, useEffect } from 'react';
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogContent from './components/BlogContent';


const App = () => {
  const [user, setUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('auth');
    if (loggedInUserJSON) {
      const userData = JSON.parse(loggedInUserJSON);
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

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
      <LoginForm setUser={ setUser }
      displaySuccessMessage={ displaySuccessMessage }
      displayErrorMessage={ displayErrorMessage } /> :
      <BlogContent user={ user } setUser={ setUser }
      displaySuccessMessage={ displaySuccessMessage }
      displayErrorMessage={ displayErrorMessage } /> }
    </React.Fragment>
  );
};

export default App