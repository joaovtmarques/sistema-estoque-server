import {
  ItemModel,
  UpdateItem,
  MissingParamError,
  UpdateItemController,
} from "./update-item-protocols"

interface SutTypes {
  sut: UpdateItemController
  updateItemStub: UpdateItem
}

const makeUpdateItem = (): UpdateItem => {
  class UpdateItemStub implements UpdateItem {
    update(item: ItemModel): Promise<ItemModel> {
      return new Promise((resolve) => resolve(item))
    }
  }

  return new UpdateItemStub()
}

const makeSut = (): SutTypes => {
  const updateItemStub = makeUpdateItem()
  const sut = new UpdateItemController(updateItemStub)

  return {
    sut,
    updateItemStub,
  }
}

describe("UpdateItem Controller", () => {
  test("Should return 400 if invalid data is provided", async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: "valid_id",
        name: "valid_name",
        amount: 2,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("categoryId"))
  })

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: "valid_id",
        name: "valid_name",
        categoryId: "valid_category_id",
        amount: 2,
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      categoryId: "valid_category_id",
      amount: 2,
    })
  })
})
