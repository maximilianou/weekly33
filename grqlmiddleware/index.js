const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(`
  type Query{
    ip: String
  }
`)
const loggingMiddleware = (req, res, next) => {
  console.log(`ip:${req.ip}`); 
  next()
}
const root =  {
  ip: (args, request) => ( request.ip )
}
const app = express()
app.use(loggingMiddleware)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
const port = 12000
app.listen( port, () => console.log(`Listening http://localhost:12000/graphql`))
