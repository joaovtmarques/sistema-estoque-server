import { DbAddLoan } from "@/data/usecases/add-loan/db-add-loan"
import { DbAddLoanDoc } from "@/data/usecases/add-loan-doc/db-add-loan-doc"
import { PrismaItemRepository } from "@/infra/db/prisma/item-repository/item"
import { PrismaLoanRepository } from "@/infra/db/prisma/loan-repository/loan"
import { AddLoanController } from "@/presentation/controllers/add-loan/add-loan"

export const makeAddLoanController = (): AddLoanController => {
  const loanRepository = new PrismaLoanRepository()
  const itemRepository = new PrismaItemRepository()
  const dbAddLoan = new DbAddLoan(loanRepository, itemRepository)
  const dbAddLoanDoc = new DbAddLoanDoc()

  return new AddLoanController(dbAddLoan, dbAddLoanDoc)
}
