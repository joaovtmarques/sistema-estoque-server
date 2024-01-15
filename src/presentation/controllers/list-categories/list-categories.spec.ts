import {
  CategoryModel,
  ListCategories,
  ListCategoriesController,
} from "./list-categories-protocols"

interface SutTypes {
  sut: ListCategoriesController
  listCategoriesStub: ListCategories
}

const makeListCategories = (): ListCategories => {
  class ListCategoriesStub implements ListCategories {
    async list(): Promise<CategoryModel[]> {
      const categories: CategoryModel[] = [
        {
          id: "valid_id_1",
          name: "valid_category_1",
        },
        {
          id: "valid_id_2",
          name: "valid_category_2",
        },
      ]

      return new Promise((resolve) => resolve(categories))
    }
  }

  return new ListCategoriesStub()
}

const makeSut = (): SutTypes => {
  const listCategoriesStub = makeListCategories()
  const sut = new ListCategoriesController(listCategoriesStub)

  return {
    sut,
    listCategoriesStub,
  }
}

describe("ListCategories controller", () => {
  test("Should return 200 if it correctly lists the categories", async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        id: "valid_id_1",
        name: "valid_category_1",
      },
      {
        id: "valid_id_2",
        name: "valid_category_2",
      },
    ])
  })
})
