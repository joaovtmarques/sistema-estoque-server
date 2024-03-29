import { FindItem, FindItemController, ItemModel } from "./find-item-protocols"

interface SutTypes {
  sut: FindItemController
  findItemStub: FindItem
}

const makeFindItem = (): FindItem => {
  class FindItemStub implements FindItem {
    find(id: string): Promise<ItemModel | null> {
      const item = {
        id: "valid_id",
        name: "valid_name",
        categoryId: "valid_category_id",
        amount: 1,
      }

      if (id !== item.id) {
        return new Promise((resolve) => resolve(null))
      }
      return new Promise((resolve) => resolve(item))
    }
  }

  return new FindItemStub()
}

const makeSut = (): SutTypes => {
  const findItemStub = makeFindItem()
  const sut = new FindItemController(findItemStub)

  return {
    sut,
    findItemStub,
  }
}

describe("FindItem controller", () => {
  test("Should return 404 if provided id is not valid", async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: "any_id",
      },
    }

    const item = await sut.handle(httpRequest)

    expect(item.statusCode).toBe(404)
    expect(item.body).toEqual(new Error("Item not found"))
  })

  test("Should return 200 if provided id is valid", async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        id: "valid_id",
      },
    }

    const item = await sut.handle(httpRequest)

    expect(item.statusCode).toBe(200)
    expect(item.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      categoryId: "valid_category_id",
      amount: 1,
    })
  })
})
