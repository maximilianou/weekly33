const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)

const root = {
  rollDice: ({numDice, numSides=6}) => {
    const output = []
    for(let i = 0; i < numDice; i++) {
      output.push(1+ Math.floor(Math.random() * (numSides)))
    }
    return output;
  }
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
const port = 12000
app.listen(port, () => console.log(`*:${12000}. Listening http://localhost:${port}/graphql`))
