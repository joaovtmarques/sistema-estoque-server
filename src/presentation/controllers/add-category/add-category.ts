import {
  created,
  badRequest,
  Controller,
  serverError,
  AddCategory,
  HttpRequest,
  HttpResponse,
  MissingParamError,
} from "./add-category-protocols"

export class AddCategoryController implements Controller {
  constructor(private readonly addCategory: AddCategory) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["name"]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name } = httpRequest.body

      const category = await this.addCategory.add(name)

      return created(category)
    } catch (err) {
      return serverError()
    }
  }
}
