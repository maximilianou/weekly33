const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(`
  input MessageInput{
    content: String
    author: String 
  }
  type Message {
    id: ID!
    content: String
    author: String
  }
  type Query{
    getMessage(id: ID!): Message
  }
  type Mutation{
    createMessage( input: MessageInput ): Message
    updateMessage( id: ID!, input: MessageInput ): Message
  }
`)
class Message{
  constructor(id, {content, author}){
    this.id = id
    this.content = content
    this.author = content
  }
}
const fakeDB = {}
const root = {
  getMessage: ({id}) => {
    if(!fakeDB[id]){
      throw new Error(`No message for id:${id}`)
    }
    return new Message(id, fadeDB[id])
  },
  createMessage: ({input}) => {
    const id = require('crypto').randomBytes(10).toString('hex')
    fakeDB[id] = input
    console.log(`created message id: ${id}`)
    return new Message(id, input)
  },
  updateMessage: ({id, input}) => {
    if(!fakeDB[id]){
      throw new Error(`No message for id:${id}`)
    }
    fakeDB[id] = input
    return new Message(id, input)
  }
}
const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
const port = 12000
app.listen(port, () => console.log(`Listening http://localhost:${port}/graphql`))
