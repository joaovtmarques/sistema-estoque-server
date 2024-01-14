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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { amount: _, ...itemData } = loanData.item

    await this.itemRepository.update({
      amount: loanData.item.amount - loanData.amount,
      ...itemData,
    })

    return loan
  }
}
