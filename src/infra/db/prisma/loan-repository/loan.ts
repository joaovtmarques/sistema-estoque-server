import { db } from "../helpers/prisma-helper"
import { LoanModel } from "@/domain/models/loan"
import { AddLoanModel } from "@/domain/usecases/add-loan"
import { LoanRepository } from "@/data/protocols/loan-repository"

export class PrismaLoanRepository implements LoanRepository {
  async add(data: AddLoanModel): Promise<LoanModel> {
    return await db.loan.create({
      data: {
        itemId: data.itemId,
        amount: data.amount,
        date: data.date.toString(),
        lender: data.lender,
        receiver: data.receiver,
        observation: data.observation,
        devolutionDate: data.date.toString(),
      },
      include: {
        item: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async list(): Promise<LoanModel[]> {
    return await db.loan.findMany({
      include: {
        item: true,
      },
    })
  }
}
