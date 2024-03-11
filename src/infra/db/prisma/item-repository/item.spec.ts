import { db } from "../helpers/prisma-helper"
import { PrismaItemRepository } from "./item"
import { ItemRepository } from "@/data/protocols/item-repository"

describe("Prisma Item Repository", () => {
  beforeEach(async () => {
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

    await db.category.deleteMany()
    await db.item.deleteMany()

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
    expect(items).toEqual(expect.any(Array))
    expect(items[0]).toEqual({
      id: item.id,
      name: item.name,
      model: item.model,
      serialNumber: item.serialNumber,
      amount: item.amount,
      categoryId: category.id,
      category: {
        id: category.id,
        name: category.name,
      },
    })
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

  test("Should return an updated item on success", async () => {
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

    const updatedItem = await sut.update({
      id: createdItem.id,
      name: "updated_name",
      model: "valid_model",
      serialNumber: "valid_serial_number",
      amount: 1,
      categoryId: category.id,
    })

    expect(updatedItem).toBeTruthy()
    expect(updatedItem.id).toBeTruthy()
    expect(updatedItem.name).toBe("updated_name")
    expect(updatedItem.model).toBe("valid_model")
    expect(updatedItem.serialNumber).toBe("valid_serial_number")
    expect(updatedItem.amount).toBe(1)
    expect(updatedItem.categoryId).toBe(category.id)
    expect(updatedItem.category).toBeTruthy()
  })
})
