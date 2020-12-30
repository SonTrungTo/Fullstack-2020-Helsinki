import React from 'react';
import { ME, ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';

const Recommendation = ({ show }) => {
    const resultMe = useQuery(ME);
    const resultBooks = useQuery(ALL_BOOKS);
    if (!show) {
        return null;
    }
    if (resultMe.loading) {
        return <div>loading...</div>;
    }
    const { favoriteGenre } = resultMe.data.me;
    const books = resultBooks.data.allBooks;
    const sortedBooks = books.filter(book => book.genres.includes(favoriteGenre));

    return (
        <div>
            <h2>Recommendation</h2>
            <p>
                book in your favorite genre <span style={{ fontWeight: 'bold' }}>{ favoriteGenre }</span>
            </p>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    { sortedBooks.map(book =>
                    <tr key={ book.title }>
                        <td>{ book.title }</td>
                        <td>{ book.author.name } </td>
                        <td>{ book.published }</td>
                    </tr>
                    ) }
                </tbody>
            </table>
        </div>
    );
};

export default Recommendation;