import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title,
            published,
            author {
                name
                born
            },
            genres
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $published: Int!,
$author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            author {
                name
                born
            }
            genres
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $birthYear: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $birthYear
        ) {
            name
            born
            bookCount
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`;

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`;

export const ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`;