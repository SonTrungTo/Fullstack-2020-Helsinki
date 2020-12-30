import React, { useState } from 'react'
import Select from 'react-select';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import { EDIT_AUTHOR } from '../queries';

const Authors = ({ setError, show }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [year, setYear] = useState('');
  const result = useQuery(ALL_AUTHORS);
  const [ setBirthYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      setError(error.graphQLErrors[0].message);
    }
  });
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  const options = authors.map(author => ({
    value: author.name, label: author.name
  }));

  const handleSubmit = event => {
    event.preventDefault();
    if (!selectedOption) {
      setError('Choose an author');
      return;
    }
    setBirthYear({ variables: selectedOption.value, birthYear: Number(year) });

    setYear('');
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4>Set birthyear</h4>
      <form onSubmit={ handleSubmit }>
        <div>
          name <Select
          defaultValue={ selectedOption }
          onChange={ setSelectedOption }
          options={options} />
        </div>
        <div>
          born <input
          value={ year }
          type='number'
          onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
