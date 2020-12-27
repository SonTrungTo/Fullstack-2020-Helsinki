import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification';

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null);
  let time;

  const notify = note => {
    clearTimeout(time);
    setMessage(note);
    time = setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
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

    </div>
  )
}

export default App