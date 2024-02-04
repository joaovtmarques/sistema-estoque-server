import {
  AddItem,
  DbAddItem,
  AddLoanDoc,
  AddCategory,
  DbAddLoanDoc,
  DbAddCategory,
  InMemoryItemRepository,
  InMemoryCategoryRepository,
} from "./db-add-loan-doc-protocols"

interface SutTypes {
  sut: AddLoanDoc
  addCategory: AddCategory
  addItem: AddItem
}

const makeSutTypes = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()
  const itemRepository = new InMemoryItemRepository()

  const addCategory = new DbAddCategory(categoryRepository)
  const addItem = new DbAddItem(itemRepository)
  const sut = new DbAddLoanDoc()

  return {
    sut,
    addCategory,
    addItem,
  }
}

describe("Add Loan Doc", () => {
  test("Should create loan doc on success", async () => {
    const { sut, addCategory, addItem } = makeSutTypes()

    const category = await addCategory.add("valid_category")
    const item = await addItem.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 2,
    })

    const doc = sut.add({
      item,
      amount: 1,
      date: new Date(),
      lender: "any_lender",
      receiver: "any_receiver",
      observation: "any_observation",
    })

    expect(doc).toBeUndefined()
  })
})
