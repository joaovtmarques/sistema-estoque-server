import { ListLoans } from "@/domain/usecases/list-loans"
import {
  Controller,
  HttpResponse,
  ok,
  serverError,
} from "./list-loans-protocols"

export class ListLoansController implements Controller {
  constructor(private readonly listLoans: ListLoans) {}

  async handle(): Promise<HttpResponse> {
    try {
      const loans = await this.listLoans.list()

      return ok(loans)
    } catch (err) {
      return serverError()
    }
  }
}
