const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buidSchema } = require('graphql')

const schema = buildSchema(`
  type User {
    id: String
    name: String
  }
  type Query {
    user(id: String): User
  }
`)

const fakeDB = {
  'a': { id: 'a', name: 'Alice'},
  'b': { id: 'b', name: 'Bartolomeo'}
}
const root = {
  user: ({id}) => (fakeDB[id])
}
const app = express()
app.use(`/graphql`, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
const port = 12000
app.listen(port, () => console.log(`Listening: http://localhost:${port}/graphql`))
