import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Recommendation from './components/Recommendation';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  let time;

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      setToken(token);
    }
  }, []);

  const notify = note => {
    clearTimeout(time);
    setMessage(note);
    time = setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateCacheWith = addedItem => {
    const includedIn = (set, object) =>
      set.map(item => item.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedItem)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: dataInStore.allBooks.concat(addedItem)
        }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${ addedBook.title } by ${ addedBook.author.name } has been added!`);
      updateCacheWith(addedBook);
    }
  });

  const logout = () => {
    localStorage.clear();
    setToken(null);
    client.resetStore();
    setPage('authors');
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? 
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={ logout }>logout</button>
          </span>
        : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Notification message={ message } />

      <Authors
        show={page === 'authors'}
        setError={ notify }
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={ notify }
        updateCacheWith={ updateCacheWith }
      />

      <LoginForm
        show={page === 'login'}
        setError={ notify }
        setToken={ setToken }
        setPage={ setPage } />
      
      { token && <Recommendation
        show={ page === 'recommend' }
      />
      }

    </div>
  )
}

export default App