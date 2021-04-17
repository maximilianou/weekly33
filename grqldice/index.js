const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`)

const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy':'Today is enough'
  },
  random: () => Math.random(),
  rollThreeDice: () => {
    return [1,2,3].map( _ => 1 + Math.floor(Math.random() * 6))
  }
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
const port = 12000
app.listen(port, () => console.log(`Running GraphQL in http://localhost:${port}/graphql`))

