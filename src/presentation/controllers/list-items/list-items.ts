import {
  ok,
  ListItems,
  Controller,
  serverError,
  HttpResponse,
} from "./list-items-protocols"

export class ListItemsController implements Controller {
  constructor(private readonly listItems: ListItems) {}

  async handle(): Promise<HttpResponse> {
    try {
      const items = await this.listItems.list()

      return ok(items)
    } catch (err) {
      return serverError()
    }
  }
}
