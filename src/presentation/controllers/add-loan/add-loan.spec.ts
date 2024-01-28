import {
  AddLoan,
  LoanModel,
  AddLoanModel,
  MissingParamError,
  AddLoanController,
} from "./add-loan-protocols"

interface SutTypes {
  sut: AddLoanController
  addLoanStub: AddLoan
}

const makeAddLoan = (): AddLoan => {
  class AddLoanStub implements AddLoan {
    add(loanData: AddLoanModel): Promise<LoanModel> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { item: _, ...loan } = loanData

      const createdLoan: LoanModel = {
        id: "valid_loan_id",
        itemId: loanData.item.id,
        ...loan,
      }

      return new Promise((resolve) => resolve(createdLoan))
    }
  }

  return new AddLoanStub()
}

const makeSut = (): SutTypes => {
  const addLoanStub = makeAddLoan()
  const sut = new AddLoanController(addLoanStub)

  return {
    sut,
    addLoanStub,
  }
}

describe("AddLoan Controller", () => {
  test("Should return 400 if invalid data is provided", async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        amount: 1,
        date: new Date(),
        lender: "any_lender",
        receiver: "any_receiver",
        observation: "any_observation",
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("item"))
  })
})