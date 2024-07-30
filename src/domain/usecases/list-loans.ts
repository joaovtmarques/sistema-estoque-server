import { LoanModel } from "../models/loan"

export interface ListLoans {
  list(): Promise<LoanModel[]>
}
