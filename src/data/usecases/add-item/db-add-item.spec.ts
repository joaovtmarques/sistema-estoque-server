import {
  AddItem,
  DbAddItem,
  AddCategory,
  DbAddCategory,
  ItemRepository,
  InMemoryItemRepository,
  InMemoryCategoryRepository,
} from "./db-add-item-protocols"

interface SutTypes {
  sut: AddItem
  addCategory: AddCategory
  itemRepository: ItemRepository
}

const makeSut = (): SutTypes => {
  const itemRepository = new InMemoryItemRepository()
  const categoryRepository = new InMemoryCategoryRepository()
  const addCategory = new DbAddCategory(categoryRepository)

  const sut = new DbAddItem(itemRepository)

  return {
    sut,
    addCategory,
    itemRepository,
  }
}

describe("Add item", () => {
  test("Should return an item on success", async () => {
    const { sut, addCategory } = makeSut()

    const category = await addCategory.add("any_category")

    const item = await sut.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 1,
    })

    expect(item).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "valid_name",
        model: "valid_model",
        serialNumber: "valid_serial_number",
        categoryId: category.id,
        amount: 1,
      }),
    )
  })
})
