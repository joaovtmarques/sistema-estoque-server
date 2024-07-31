import {
  FindItem,
  serverError,
  Controller,
  HttpRequest,
  HttpResponse,
  MissingParamError,
  badRequest,
  notFound,
  ok,
  DeleteItem,
} from "./delete-item-protocols"

export class DeleteItemController implements Controller {
  constructor(
    private readonly findItem: FindItem,
    private readonly deleteItem: DeleteItem,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredField = ["id"]

    for (const field of requiredField) {
      if (!httpRequest.params[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const item = await this.findItem.find(httpRequest.params.id)

    if (!item) {
      return notFound(new Error("Item not found"))
    }

    try {
      await this.deleteItem.delete(item)

      return ok("Item deletado com sucesso")
    } catch (err) {
      return serverError()
    }
  }
}
