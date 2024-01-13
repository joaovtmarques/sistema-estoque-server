import {
  AddCategory,
  DbAddCategory,
  ListCategories,
  DbListCategories,
  CategoryRepository,
  InMemoryCategoryRepository,
} from "./db-list-categories-protocols"

interface SutTypes {
  sut: ListCategories
  addCategory: AddCategory
  categoryRepository: CategoryRepository
}

const makeSut = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()

  const addCategory = new DbAddCategory(categoryRepository)

  const sut = new DbListCategories(categoryRepository)

  return { sut, addCategory, categoryRepository }
}

describe("List categories", () => {
  test("Should list all categories", async () => {
    const { sut, addCategory } = makeSut()

    await addCategory.add("valid_category")

    const categories = await sut.list()

    expect(categories).toEqual(
      expect.arrayContaining([
        { id: expect.any(String), name: "valid_category" },
      ]),
    )
  })
})
