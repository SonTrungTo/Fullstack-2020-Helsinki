import React, { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries';
import { useQuery } from '@apollo/client';

const Books = (props) => {
  const [ genre, setGenre ] = useState('all genres');
  const result = useQuery(ALL_BOOKS);
  const genresResult = useQuery(ALL_GENRES);
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const allGenres = genresResult.data.allGenres;
  const sortedBooks = genre === 'all genres' ? books :
    books.filter(book => book.genres.includes(genre));

  const handleSort = genre => {
    setGenre(genre);
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {sortedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        { allGenres.map(genre =>
          <button key={ genre }
          onClick={ () => handleSort(genre) }>{ genre }</button>) 
        }
        <button
        onClick={ () => handleSort('all genres') }>all genres</button>
      </div>
    </div>
  )
}

export default Books