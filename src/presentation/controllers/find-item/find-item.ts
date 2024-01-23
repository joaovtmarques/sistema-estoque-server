import {
  ok,
  FindItem,
  notFound,
  Controller,
  badRequest,
  serverError,
  HttpRequest,
  HttpResponse,
  MissingParamError,
} from "./find-item-protocols"

export class FindItemController implements Controller {
  constructor(private readonly findItem: FindItem) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ["id"]

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const item = await this.findItem.find(httpRequest.body)

      if (!item) {
        return notFound(new Error("Item not found"))
      }

      return ok(item)
    } catch (err) {
      return serverError()
    }
  }
}
