import {
  AddCategory,
  CategoryModel,
  MissingParamError,
  AddCategoryController,
} from "./add-category-protocols"

interface SutTypes {
  sut: AddCategoryController
  addCategoryStub: AddCategory
}

const makeAddCategory = (): AddCategory => {
  class AddCategoryStub implements AddCategory {
    async add(name: string): Promise<CategoryModel> {
      const fakeCategory = {
        id: "valid_id",
        name,
      }

      return new Promise((resolve) => resolve(fakeCategory))
    }
  }

  return new AddCategoryStub()
}

const makeSut = (): SutTypes => {
  const addCategoryStub = makeAddCategory()
  const sut = new AddCategoryController(addCategoryStub)

  return {
    sut,
    addCategoryStub,
  }
}

describe("AddCategory controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: "",
      },
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("name"))
  })
})
