export interface LoanModel {
  id: string
  itemId: string
  amount: number
  date: Date
  lender: string
  receiver: string
  observation: string
  devolutionDate?: Date
}
