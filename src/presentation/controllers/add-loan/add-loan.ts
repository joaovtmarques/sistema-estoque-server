import {
  created,
  AddLoan,
  Controller,
  badRequest,
  serverError,
  HttpRequest,
  HttpResponse,
  MissingParamError,
} from "./add-loan-protocols"

export class AddLoanController implements Controller {
  constructor(private readonly addLoan: AddLoan) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["item", "amount", "date", "lender", "receiver"]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const loan = await this.addLoan.add(httpRequest.body)

      return created(loan)
    } catch (err) {
      return serverError()
    }
  }
}
