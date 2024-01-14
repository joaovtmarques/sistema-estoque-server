import { LoanModel } from "@/domain/models/loan"
import { AddLoanModel } from "@/domain/usecases/add-loan"
import { LoanRepository } from "@/data/protocols/loan-repository"

export class InMemoryLoanRepository implements LoanRepository {
  public loans: LoanModel[] = []

  add(loanData: AddLoanModel): Promise<LoanModel> {
    const { item } = loanData
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { item: _, ...data } = loanData

    const loan = {
      id: crypto.randomUUID(),
      ...data,
      itemId: item.id,
    }

    this.loans.push(loan)

    return new Promise((resolve) => resolve(loan))
  }
}
