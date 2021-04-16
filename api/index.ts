import Knex from 'knex'
import {Model} from 'objection'

import {app} from './app'

const port = 12000
const knex = Knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'books_database',
    port: 5432,
    password: 'default',
    user: 'default'
  }
})

Model.knex(knex)

app.listen(port, () => console.log(` *:${port} - listening on port ${port}`))

