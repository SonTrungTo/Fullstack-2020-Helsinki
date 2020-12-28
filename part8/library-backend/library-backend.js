const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
require('dotenv').config();

// Now we connect the backend to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

console.log('conneting to Mongo DB via', MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(error => {
    console.log('There is a problem with connection to MongoDB:', error.message);
  });

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    booksCount: () => Book.collection.countDocuments(),
    authorsCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const allBooks = await Book.find({})
        .populate('author', 'name born');
      const booksByAuthor = allBooks.filter(book => book.author.name === args.author);
      const booksByGenre = allBooks.filter(book => book.genres.includes(args.genre));
      const booksByAuthorAndGenre = booksByAuthor.filter(book => book.genres.includes(args.genre));
      if (!args.author && !args.genre) {
        return allBooks;
      } else if (args.author && !args.genre) {
        return booksByAuthor;
      } else if (!args.author && args.genre) {
        return booksByGenre;
      } else {
        return booksByAuthorAndGenre;
      }
    },
    allAuthors: () => Author.find({})
  },

  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find({})
        .populate('author', 'name born');
      const bookNumber = allBooks.filter(book => book.author.name === root.name).length;
      return bookNumber;
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const books = await Book.findOne({ title: { $in: [args.title] } });
      if (books) {
        throw new UserInputError('Book title must be unique', {
          invalidArgs: args.title
        });
      }

      if (!args.title || !args.published || !args.title
        || args.genres.length === 0) {
        return null;
      }

      const newAuthor = new Author({ name: args.author });
      const newBook =  new Book({ ...args, author: newAuthor });
      try {
        await newBook.save();
        await newAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return newBook;
    },
    editAuthor: async (root, args) => {
      const targetAuthor = await Author.findOne({ name: { $in: [args.name] } });
      if (!targetAuthor) {
        return null;
      }

      targetAuthor.born = args.setBornTo;
      try {
        await targetAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
      return targetAuthor;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
