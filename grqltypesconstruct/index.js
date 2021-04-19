const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql') 

const fakeDB = {
  'a': { id: 'a', name: 'Alice'},
  'b': { id: 'b', name: 'Bartolome'}
}

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
})
const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, {id}) => ( fakeDB[id] ) 
    }
  }
})
const schema = new graphql.GraphQLSchema({ query: queryType });
console.log(JSON.stringify(schema));
const app = express();
app.use(`/graphql`, graphqlHTTP({
  schema: schema,
  graphiql: true
}))
const port = 12000
app.listen(port, () => console.log(`Listen: http://localhost:12000/graphql`))

