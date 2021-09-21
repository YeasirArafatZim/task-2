import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
const _ = require('lodash');


// dummy data
var books = [
    { book_id: "1", book_title: 'Book 1', price: 199 },
    { book_id: "2", book_title: 'Book 2', price: 250 },
    { book_id: "3", book_title: 'Book 3', price: 300 },
    { book_id: "4", book_title: 'Book 4', price: 390 }
]

var authors = [
    { author_id: "1", author_name: 'Rahim', country: 'Bangladesh' },
    { author_id: "2", author_name: 'J. K Rowling', country: 'Bangladesh' },
    { author_id: "3", author_name: 'Rahul', country: 'Bangladesh' },
    { author_id: "4", author_name: 'Shorkar', country: 'India' }
]

var publishedBooks = [
    { publication_id: "1", author_id: "2", book_id: "1", publication_date: "18-2-2002" },
    { publication_id: "2", author_id: "2", book_id: "2", publication_date: "13-5-2012" },
    { publication_id: "3", author_id: "1", book_id: "3", publication_date: "1-12-1997" },
    { publication_id: "4", author_id: "4", book_id: "4", publication_date: "1-11-1997" }
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        book_id: { type: GraphQLID },
        book_title: { type: GraphQLString },
        price: { type: GraphQLInt }

    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        author_id: { type: GraphQLID },
        author_name: { type: GraphQLString },
        country: { type: GraphQLString },

    })
});

const PublishedBookType = new GraphQLObjectType({
    name: 'PublishedBook',
    fields: () => ({
        publication_id: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { author_id: parent.author_id });
            }
        },
        book: {
            type: BookType,
            resolve(parent, args) {
                return _.find(books, { book_id: parent.book_id });
            }
        },
        publication_date: { type: GraphQLString }

    })
});

const CountType = new GraphQLObjectType({
    name: 'Count',
    fields: () => ({
        numberOfBooks: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { book_id: { type: GraphQLID } },
            resolve(parent, args) {
                // Code to get data from db
                return _.find(books, { book_id: args.book_id });
            }
        },
        author: {
            type: AuthorType,
            args: { author_id: { type: GraphQLID } },
            resolve(parent, args) {
                // Code to get data from db
                return _.find(authors, { author_id: args.author_id });
            }
        },
        publishedBook: {
            type: PublishedBookType,
            args: { publication_id: { type: GraphQLID } },
            resolve(parent, args) {
                // Code to get data from db
                return _.find(publishedBooks, { publication_id: args.publication_id });
            }
        },
        authors: {
            type: new GraphQLList(BookType),
            args: { country: { type: GraphQLString } },
            resolve(parent, args) {
                return _.filter(authors, { country: args.country });
            }
        },
        authorBooks: {
            type: new GraphQLList(BookType),
            args: { author_id: { type: GraphQLID } },
            resolve(parent, args) {
                var pBooks = _.filter(publishedBooks, { author_id: args.author_id });
                //console.log(pBooks[1].book_id);
                let aBooks = [];
                for (let i = 0; i < pBooks.length; i++) {
                    aBooks.push(_.find(books, { book_id: pBooks[i].book_id }));
                }
                return aBooks;
            }
        },
        countryWiseBooks: {
            type: new GraphQLList(BookType),
            args: { country: { type: GraphQLString } },
            resolve(parent, args) {
                let auth = _.filter(authors, { country: args.country });


                let pBooks = [];
                for (let i = 0; i < auth.length; i++) {
                    pBooks.push(..._.filter(publishedBooks, { author_id: auth[i].author_id }));
                }

                console.log(pBooks);

                let bks = [];
                for (let i = 0; i < pBooks.length; i++) {
                    bks.push(_.find(books, { book_id: pBooks[i].book_id }));
                }

                return bks;
            }
        },
        authorBooksCount: {
            type: CountType,
            args: { author_name: { type: GraphQLString } },
            resolve(parent, args) {
                let athr = _.find(authors, { author_name: args.author_name });
                console.log(athr);
                if (athr != undefined) {
                    var p = _.filter(publishedBooks, { author_id: athr.author_id });
                    return { numberOfBooks: parseInt(p.length) }
                }

                return { numberOfBooks: 0 };
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});


