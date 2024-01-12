import {
  AddCategory,
  DbAddCategory,
  CategoryRepository,
  InMemoryCategoryRepository,
} from "./db-add-category-protocols"

interface SutTypes {
  sut: AddCategory
  categoryRepository: CategoryRepository
}

const makeSut = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()
  const sut = new DbAddCategory(categoryRepository)

  return {
    sut,
    categoryRepository,
  }
}

describe("Add category", () => {
  test("Should return an category on success", async () => {
    const { sut } = makeSut()
    const name = "valid_category"

    const category = await sut.add(name)

    expect(category).toEqual({
      id: expect.any(String),
      name: "valid_category",
    })
  })
})
