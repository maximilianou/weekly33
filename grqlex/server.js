const express  = require('express')
const { graphqlHTTP } = require('express-graphql') 
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query{
    hello: String
  }
`)

const root = {
  hello: () => (`Hello Graph`),
}

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.listen(12000, () => console.log(`Running a GraphQL API server at http://localhost:12000/graphql`))



