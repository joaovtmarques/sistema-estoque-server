import { db } from "../helpers/prisma-helper"
import { LoanModel } from "@/domain/models/loan"
import { AddLoanModel } from "@/domain/usecases/add-loan"
import { LoanRepository } from "@/data/protocols/loan-repository"

export class PrismaLoanRepository implements LoanRepository {
  async add(data: AddLoanModel): Promise<Omit<LoanModel, "devolutionDate">> {
    return await db.loan.create({
      data: {
        itemId: data.item.id,
        amount: data.amount,
        date: data.date,
        lender: data.lender,
        receiver: data.receiver,
        observation: data.observation,
      },
      include: {
        item: true,
      },
    })
  }
}
