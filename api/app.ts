import express, {Application, Request, Response, NextFunction} from 'express'
import {Book} from './book.model'

export const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get(
  '/books/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {id} = request.params
      const book: BookShape = await Book.query().findById(id)
      if(!book){
        throw new Error('Book not found')
      }
      return response.status(200).send(book)
    }catch(error){
      return response.status(404).send({message: error.message})
    }
  },
)

