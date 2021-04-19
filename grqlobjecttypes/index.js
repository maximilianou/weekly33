const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type RandomDie {
    numSide: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  type Query {
    getDie(numSides: Int): RandomDie
  }
`)

class RandomDie {
  constructor(numSides){
    this.numSides = numSides
  }
  rollOnce(){
    return 1 + Math.floor(Math.random() * this.numSides)
  }
  roll({numRolls}){
    const output = []
    for(let i = 0; i < numRolls; i++){
      output.push(this.rollOnce())
    }
    return output
  }
}

const root = {
  getDie: ({numSides}) => (new RandomDie(numSides || 6))
}
const app = express()
app.use(`/graphql`, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})) 
const port = 12000
app.listen(port, () => console.log(`Listening http://localhost:${port}/graphql`))

