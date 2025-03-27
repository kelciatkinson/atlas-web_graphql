const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


mongoose.connect(
  `mongodb+srv://intranet_user:_T3w82JUQpKmcDh@cluster0.ompea.mongodb.net/graphql_api?retryWrites=true&w=majority&appName=Cluster0`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once(`open`, () =>
  console.log(`connected to database`)
);

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
