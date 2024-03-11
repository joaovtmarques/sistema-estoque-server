import {
  AddItem,
  ItemModel,
  AddItemModel,
  AddItemController,
  MissingParamError,
} from "./add-item-protocols"

interface SutTypes {
  sut: AddItemController
  addItemStub: AddItem
}

const makeAddItem = (): AddItem => {
  class AddItemStub implements AddItem {
    add(item: AddItemModel): Promise<ItemModel> {
      const createdItem: ItemModel = {
        id: "valid_id",
        name: item.name,
        categoryId: item.categoryId,
        amount: item.amount,
        model: item.model,
        serialNumber: item.serialNumber,
      }

      return new Promise((resolve) => resolve(createdItem))
    }
  }

  return new AddItemStub()
}

const makeSut = (): SutTypes => {
  const addItemStub = makeAddItem()
  const sut = new AddItemController(addItemStub)

  return {
    sut,
    addItemStub,
  }
}

describe("AddItem controller", () => {
  test("Should return 400 if no valid data is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: "",
        categoryId: "valid_category_id",
        amount: 1,
      },
    }

    const item = await sut.handle(httpRequest)

    expect(item.statusCode).toBe(400)
    expect(item.body).toEqual(new MissingParamError("name"))
  })

  test("Should return 201 if valid data is provided", async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: "valid_name",
        categoryId: "valid_category_id",
        amount: 1,
        model: "valid_model",
        serialNumber: "valid_serial_number",
      },
    }

    const item = await sut.handle(httpRequest)

    expect(item.statusCode).toBe(201)
    expect(item.body).toEqual({
      id: expect.any(String),
      name: "valid_name",
      categoryId: "valid_category_id",
      amount: 1,
      model: "valid_model",
      serialNumber: "valid_serial_number",
    })
  })
})
