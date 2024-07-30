import { LoanModel } from "@/domain/models/loan"
import { ListLoans } from "@/domain/usecases/list-loans"
import { LoanRepository } from "@/data/protocols/loan-repository"

export class DbListLoans implements ListLoans {
  constructor(private readonly loanRepository: LoanRepository) {}

  async list(): Promise<LoanModel[]> {
    return await this.loanRepository.list()
  }
}
