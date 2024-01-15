import {
  ok,
  Controller,
  serverError,
  HttpResponse,
  ListCategories,
} from "./list-categories-protocols"

export class ListCategoriesController implements Controller {
  constructor(private readonly listCategories: ListCategories) {}

  async handle(): Promise<HttpResponse> {
    try {
      const categories = await this.listCategories.list()

      return ok(categories)
    } catch (err) {
      return serverError()
    }
  }
}
