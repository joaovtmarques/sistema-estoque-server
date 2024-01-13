import {
  AddItem,
  DbAddItem,
  UpdateItem,
  AddCategory,
  DbUpdateItem,
  DbAddCategory,
  InMemoryItemRepository,
  InMemoryCategoryRepository,
} from "./db-update-item-protocols"

interface SutTypes {
  sut: UpdateItem
  addCategory: AddCategory
  addItem: AddItem
}

const makeSut = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()
  const itemRepository = new InMemoryItemRepository()
  const addCategory = new DbAddCategory(categoryRepository)
  const addItem = new DbAddItem(itemRepository)
  const sut = new DbUpdateItem(itemRepository)

  return {
    sut,
    addCategory,
    addItem,
  }
}

describe("Update item", () => {
  test("Should return an updated item on success", async () => {
    const { sut, addCategory, addItem } = makeSut()

    const category = await addCategory.add("any_category")
    const item = await addItem.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 1,
    })

    const updatedItem = await sut.update({
      id: item.id,
      name: "updated_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 2,
    })

    expect(updatedItem).toEqual(
      expect.objectContaining({
        id: item.id,
        name: "updated_name",
        model: "valid_model",
        serialNumber: "valid_serial_number",
        categoryId: category.id,
        amount: 2,
      }),
    )
  })
})
