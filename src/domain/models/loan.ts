import { ItemModel } from "./item"

export interface LoanModel {
  id: string
  item: ItemModel
  amount: number
  date: Date
  lender: string
  receiver: string
  observation: string
}
