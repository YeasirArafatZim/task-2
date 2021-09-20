import { nanoid } from "nanoid";

class Author {
    constructor(author_id, {
        author_name, country
    }) {
        this.author_id = author_id
        this.author_name = author_name
        this.country = country
    }
}

class Book {
    constructor(book_id, {
        book_title, price
    }) {
        this.book_id = book_id
        this.book_title = book_title
        this.price = price
    }
}

class PublishedBook {
    constructor(publication_id, {
        author_id, book_id, publication_date
    }) {
        this.publication_id = publication_id
        this.author_id = author_id
        this.book_id = book_id
        this.publication_date = publication_date
    }
}


const bookholder = {}
const authors = {}
const publishedBooks = {}
const resolvers = {
    displayBooks: (book_id) => {
        return new Book(book_id, bookholder[book_id])
    },
    createAuthor: ({ input }) => {
        let id = nanoid()
        authors[id] = input
        return new Author(id, input)
    },
    createBook: ({ input }) => {
        let id = nanoid()
        bookholder[id] = input
        return new Book(id, input)
    },
    createPublishedBook: ({ input }) => {
        let id = nanoid()
        publishedBooks[id] = input
        return new PublishedBook(id, input)
    }
}

export default resolvers;
