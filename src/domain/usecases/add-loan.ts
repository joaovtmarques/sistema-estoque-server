import { ItemModel } from "../models/item"
import { LoanModel } from "../models/loan"

export interface AddLoanModel {
  item: ItemModel
  amount: number
  date: string
  lender: string
  receiver: string
  observation: string
  itemId?: string
}

export interface AddLoan {
  add(loan: AddLoanModel): Promise<LoanModel>
}
