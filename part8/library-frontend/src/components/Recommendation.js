import React, { useEffect } from 'react';
import { ME, ALL_BOOKS } from '../queries';
import { useQuery, useLazyQuery } from '@apollo/client';

const Recommendation = ({ show }) => {
    const resultMe = useQuery(ME);
    const [ setFavoriteGenre, resultBooks] = useLazyQuery(ALL_BOOKS);
    useEffect(() => {
        if (resultMe.data) {
            setFavoriteGenre({ variables: { genre: resultMe.data.me.favoriteGenre } });
        }
    }, [resultMe.data]); // eslint-disable-line

    if (!show || !resultBooks.data || !resultMe.data) {
        return null;
    }

    const { favoriteGenre } = resultMe.data.me;
    const sortedBooks = resultBooks.data.allBooks;

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