import { ItemModel } from "../models/item"
import { LoanModel } from "../models/loan"

export interface AddLoanModel {
  item: ItemModel
  amount: number
  date: Date
  lender: string
  receiver: string
  observation: string
}

export interface AddLoan {
  add(loan: AddLoanModel): Promise<LoanModel>
}
