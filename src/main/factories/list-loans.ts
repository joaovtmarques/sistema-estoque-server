import { DbListLoans } from "@/data/usecases/list-loans/db-list-loans"
import { PrismaLoanRepository } from "@/infra/db/prisma/loan-repository/loan"
import { ListLoansController } from "@/presentation/controllers/list-loans/list-loans"

export const makeListLoans = (): ListLoansController => {
  const loanRepository = new PrismaLoanRepository()
  const dbListLoans = new DbListLoans(loanRepository)

  return new ListLoansController(dbListLoans)
}
