import {
  ItemModel,
  ListItems,
  ListItemsController,
} from "./list-items-protocols"

interface SutTypes {
  sut: ListItemsController
  listItemsStub: ListItems
}

const makeListItems = (): ListItems => {
  class ListItemsStub implements ListItems {
    list(): Promise<ItemModel[]> {
      const items: ItemModel[] = [
        {
          id: "valid_id_1",
          name: "valid_name",
          categoryId: "valid_category_id",
          amount: 1,
        },
        {
          id: "valid_id_1",
          name: "valid_name",
          categoryId: "valid_category_id",
          amount: 1,
        },
      ]

      return new Promise((resolve) => resolve(items))
    }
  }

  return new ListItemsStub()
}

const makeSut = (): SutTypes => {
  const listItemsStub = makeListItems()
  const sut = new ListItemsController(listItemsStub)

  return {
    sut,
    listItemsStub,
  }
}

describe("ListItems controller", () => {
  test("Should returns 200 with all items", async () => {
    const { sut } = makeSut()
    const items = await sut.handle()

    expect(items.statusCode).toBe(200)
    expect(items.body).toEqual(expect.any(Array))
    expect(items.body).toEqual([
      {
        id: "valid_id_1",
        name: "valid_name",
        categoryId: "valid_category_id",
        amount: 1,
      },
      {
        id: "valid_id_1",
        name: "valid_name",
        categoryId: "valid_category_id",
        amount: 1,
      },
    ])
  })
})
