import { AddLoanModel } from "./add-loan"

export interface AddLoanDoc {
  add: (loan: AddLoanModel) => void
}
