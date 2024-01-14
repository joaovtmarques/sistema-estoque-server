import {
  AddLoan,
  AddItem,
  DbAddLoan,
  DbAddItem,
  AddCategory,
  DbAddCategory,
  InMemoryItemRepository,
  InMemoryLoanRepository,
  InMemoryCategoryRepository,
} from "./db-add-loan-protocols"

interface SutTypes {
  sut: AddLoan
  addCategory: AddCategory
  addItem: AddItem
}

const makeSut = (): SutTypes => {
  const categoryRepository = new InMemoryCategoryRepository()
  const itemRepository = new InMemoryItemRepository()
  const loanRepository = new InMemoryLoanRepository()

  const addCategory = new DbAddCategory(categoryRepository)
  const addItem = new DbAddItem(itemRepository)
  const sut = new DbAddLoan(loanRepository, itemRepository)

  return {
    sut,
    addCategory,
    addItem,
  }
}

describe("Add loan", () => {
  test("Should return an loan on success", async () => {
    const { sut, addCategory, addItem } = makeSut()

    const category = await addCategory.add("any_category")

    const item = await addItem.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      categoryId: category.id,
      amount: 2,
    })

    const loan = await sut.add({
      item,
      amount: 1,
      date: new Date(),
      lender: "any_lender",
      receiver: "any_receiver",
      observation: "any_observation",
    })

    expect(loan).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        itemId: expect.any(String),
        amount: 1,
        date: expect.any(Date),
        lender: "any_lender",
        receiver: "any_receiver",
        observation: "any_observation",
      }),
    )
  })
})
