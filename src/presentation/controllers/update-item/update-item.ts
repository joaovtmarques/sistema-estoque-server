import {
  ok,
  UpdateItem,
  Controller,
  badRequest,
  serverError,
  HttpRequest,
  HttpResponse,
  MissingParamError,
} from "./update-item-protocols"

export class UpdateItemController implements Controller {
  constructor(private readonly updateItem: UpdateItem) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ["id", "name", "categoryId", "amount"]

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const updatedItem = await this.updateItem.update(httpRequest.body)

      return ok(updatedItem)
    } catch (err) {
      return serverError()
    }
  }
}
