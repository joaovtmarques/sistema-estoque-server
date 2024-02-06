import { db } from "../helpers/prisma-helper"
import { PrismaItemRepository } from "./item"
import { ItemRepository } from "@/data/protocols/item-repository"

describe("Prisma Item Repository", () => {
  afterEach(async () => {
    await db.category.deleteMany()
    await db.item.deleteMany()
  })

  const makeSut = (): ItemRepository => {
    return new PrismaItemRepository()
  }

  test("Should return an item on success", async () => {
    const sut = makeSut()

    const category = await db.category.create({
      data: {
        name: "valid_category",
      },
    })

    const item = await sut.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      amount: 2,
      categoryId: category.id,
    })

    expect(item).toBeTruthy()
    expect(item.id).toBeTruthy()
    expect(item.name).toBe("valid_name")
    expect(item.model).toBe("valid_model")
    expect(item.serialNumber).toBe("valid_serial_number")
    expect(item.amount).toBe(2)
    expect(item.categoryId).toBe(category.id)
    expect(item.category).toBeTruthy()
  })

  test("Should return all items", async () => {
    const sut = makeSut()

    const category = await db.category.create({
      data: {
        name: "valid_category",
      },
    })

    const item = await sut.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      amount: 2,
      categoryId: category.id,
    })

    const items = await sut.list()

    expect(items).toBeTruthy()
    expect(items).toEqual([
      {
        id: item.id,
        name: item.name,
        model: item.model,
        serialNumber: item.serialNumber,
        amount: item.amount,
        categoryId: item.categoryId,
        category: item.category,
      },
    ])
  })

  test("Should return an item by id on success", async () => {
    const sut = makeSut()

    const category = await db.category.create({
      data: {
        name: "valid_category",
      },
    })

    const createdItem = await sut.add({
      name: "valid_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      amount: 2,
      categoryId: category.id,
    })

    const item = await sut.find(createdItem.id)

    expect(item).toBeTruthy()
    expect(item!.id).toBeTruthy()
    expect(item!.name).toBe("valid_name")
    expect(item!.model).toBe("valid_model")
    expect(item!.serialNumber).toBe("valid_serial_number")
    expect(item!.amount).toBe(2)
    expect(item!.categoryId).toBe(category.id)
    expect(item!.category).toBeTruthy()
  })
})
