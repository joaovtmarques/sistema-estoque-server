import { db } from "../helpers/prisma-helper"
import { PrismaLoanRepository } from "./loan"
import { LoanRepository } from "@/data/protocols/loan-repository"

describe("Prisma Loan Repository", () => {
  afterEach(async () => {
    await db.category.deleteMany()
    await db.item.deleteMany()
    await db.loan.deleteMany()
  })

  const makeSut = (): LoanRepository => {
    return new PrismaLoanRepository()
  }

  test("Should returns an loan on success", async () => {
    const sut = makeSut()

    const category = await db.category.create({
      data: {
        name: "valid_name",
      },
    })

    const item = await db.item.create({
      data: {
        name: "valid_name",
        model: "valid_model",
        serialNumber: "valid_serial_number",
        amount: 3,
        categoryId: category.id,
      },
    })

    const loan = await sut.add({
      item,
      amount: 2,
      date: new Date(),
      lender: "any_lender",
      receiver: "any_receiver",
      observation: "any_observation",
    })

    expect(loan).toBeTruthy()
    expect(loan.id).toBeTruthy()
    expect(loan.amount).toBe(2)
    expect(loan.lender).toBe("any_lender")
    expect(loan.receiver).toBe("any_receiver")
    expect(loan.observation).toBe("any_observation")
    expect(loan.itemId).toBe(item.id)
  })
})
