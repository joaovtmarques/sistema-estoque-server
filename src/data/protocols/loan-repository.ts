import { LoanModel } from "@/domain/models/loan"
import { AddLoanModel } from "@/domain/usecases/add-loan"

export interface LoanRepository {
  add(loan: AddLoanModel): Promise<LoanModel>
}
