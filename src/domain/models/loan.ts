import { ItemModel } from "./item"

export interface LoanModel {
  id: string
  itemId: string
  amount: number
  date: string
  lender: string
  receiver: string
  observation: string
  devolutionDate?: string
  item?: ItemModel | undefined | null | any
}
