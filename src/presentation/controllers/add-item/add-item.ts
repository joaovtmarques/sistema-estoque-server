import {
  AddItem,
  created,
  Controller,
  badRequest,
  serverError,
  HttpRequest,
  HttpResponse,
  MissingParamError,
} from "./add-item-protocols"

export class AddItemController implements Controller {
  constructor(private readonly addItem: AddItem) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["name", "categoryId", "amount"]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const item = await this.addItem.add(httpRequest.body)

      return created(item)
    } catch (err) {
      return serverError()
    }
  }
}
