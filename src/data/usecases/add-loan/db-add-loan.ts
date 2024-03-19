import { LoanModel } from "@/domain/models/loan"
import { LoanRepository } from "@/data/protocols/loan-repository"
import { ItemRepository } from "../add-item/db-add-item-protocols"
import { AddLoan, AddLoanModel } from "@/domain/usecases/add-loan"

export class DbAddLoan implements AddLoan {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async add(loanData: AddLoanModel): Promise<LoanModel> {
    const loan = await this.loanRepository.add(loanData)

    const item = await this.itemRepository.find(loanData.itemId!)

    const amount = item!.amount - loanData.amount

    await this.itemRepository.updateAmount(loanData.itemId!, amount)

    return loan
  }
}
