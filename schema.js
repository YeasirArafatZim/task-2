import { buildSchema } from 'graphql';
const schema = buildSchema(`
    type Author{
        author_id: ID
        author_name: String
        country: String
    }

    type Book{
        book_id: ID
        book_title: String
        price: Int
    }

    type PublishedBook{
        publication_id: ID
        author_id: [Author]
        book_id: [Book]
        publication_date: String
    }

    input AuthorInput{
        author_id: ID
        author_name: String!
        country: String!
    }

    input BookInput{
        book_id: ID
        book_title: String!
        price: Int!
    }

    input PublishedBookInput{
        publication_id: ID
        author_id: [AuthorInput]!
        book_id: [BookInput]!
        publication_date: String!
    }


    type Mutation{
        createAuthor(input: AuthorInput): Author
        createBook(input: BookInput): Book
        createPublishedBook(input: PublishedBookInput): PublishedBook
    }



    type Query{
        displayBooks( book_id: ID): Book
    }

`);


export default schema;