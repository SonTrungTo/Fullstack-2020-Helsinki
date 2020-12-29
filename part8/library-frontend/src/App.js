import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  let time;

  const notify = note => {
    clearTimeout(time);
    setMessage(note);
    time = setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? 
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={ logout }>logout</button>
          </span>
        : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Notification message={ message } />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={ notify }
      />

      <LoginForm
        show={page === 'login'}
        setError={ notify }
        setToken={ setToken }
        setPage={ setPage } />

    </div>
  )
}

export default App