const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Now we connect the backend to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
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
    login(
      username: String!
      password: String!
    ): Token
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
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
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('User most login to add new book');
      }

      const availableBook = await Book.findOne({ title: { $in: [args.title] } });
      if (availableBook) {
        throw new UserInputError('Book title must be unique', {
          invalidArgs: args.title
        });
      }

      if (!args.title || !args.published || !args.title
        || args.genres.length === 0) {
        return null;
      }

      const author = await Author.findOne({ name: args.author });
      const newAuthor = author ? author : new Author({ name: args.author });
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
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('User must login to edit author');
      }

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
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'ADA') {
        throw new UserInputError('Invalid username/password');
      }

      const userData = {
        username: user.name,
        id: user._id.toString()
      };

      return { value: jwt.sign( userData, JWT_SECRET ) };
    },
    createUser: async (root, args) => {
      const newUser = new User({ ...args });
      return newUser.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        });
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);
      const decodedUser = jwt.verify( token , JWT_SECRET);
      if (!decodedUser || !decodedUser.id) {
        throw new AuthenticationError('User must login with approriate credentials');
      }
      const currentUser = await User.findById(decodedUser.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
