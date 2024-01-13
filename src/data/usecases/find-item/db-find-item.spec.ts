import {
  AddItem,
  FindItem,
  DbAddItem,
  DbFindItem,
  AddCategory,
  DbAddCategory,
  InMemoryItemRepository,
  InMemoryCategoryRepository,
} from "./db-find-item-protocols"

interface SutTypes {
  sut: FindItem
  addCategory: AddCategory
  addItem: AddItem
}

const makeSut = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()
  const itemRepository = new InMemoryItemRepository()
  const addCategory = new DbAddCategory(categoryRepository)
  const addItem = new DbAddItem(itemRepository)
  const sut = new DbFindItem(itemRepository)

  return {
    sut,
    addCategory,
    addItem,
  }
}

describe("Find item", () => {
  test("Should return an item if a valid id is provided", async () => {
    const { sut, addCategory, addItem } = makeSut()

    const category = await addCategory.add("any_category")
    const createdItem = await addItem.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 1,
    })

    const item = await sut.find(createdItem.id)

    expect(item).toEqual(expect.objectContaining(createdItem))
  })
})
