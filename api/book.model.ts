import {Model} from 'objection'

export class Book from Model {
  id!: string
  name!: string
  author!: string
  static tableName = 'book'
  static idColumn = 'id'

}
export type BookShape = ModelObject<Book>
