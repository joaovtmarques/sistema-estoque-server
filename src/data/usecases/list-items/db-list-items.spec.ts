import {
  AddItem,
  ListItems,
  DbAddItem,
  AddCategory,
  DbListItems,
  DbAddCategory,
  InMemoryItemRepository,
  InMemoryCategoryRepository,
} from "./db-list-items-protocols"

interface SutTypes {
  sut: ListItems
  addCategory: AddCategory
  addItem: AddItem
}

const makeSut = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()
  const itemRepository = new InMemoryItemRepository()
  const addCategory = new DbAddCategory(categoryRepository)
  const addItem = new DbAddItem(itemRepository)
  const sut = new DbListItems(itemRepository)

  return {
    sut,
    addCategory,
    addItem,
  }
}

describe("List items", () => {
  test("Should list all items", async () => {
    const { sut, addCategory, addItem } = makeSut()

    const category = await addCategory.add("any_category")
    const item = await addItem.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 1,
    })
    const items = await sut.list()

    expect(items).toEqual(expect.arrayContaining([item]))
  })
})
