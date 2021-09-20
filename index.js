const express = require('express');
const schema = require('./schema');
import { graphqlHTTP } from 'express-graphql';
const app = express();

app.get("/", (req, res) => {
    res.send("Up and running with graphql");
});



app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(8082, () => console.log("Running at 8082"));

