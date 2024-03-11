import { db } from "../helpers/prisma-helper"
import { PrismaCategoryRepository } from "./category"
import { CategoryRepository } from "@/data/protocols/category-repository"

describe("Category Prisma Repository", () => {
  beforeEach(async () => {
    await db.category.deleteMany()
  })

  const makeSut = (): CategoryRepository => {
    return new PrismaCategoryRepository()
  }

  test("Should return an category on success", async () => {
    const sut = makeSut()

    const category = await sut.add("valid_category")

    expect(category).toBeTruthy()
    expect(category.id).toBeTruthy()
    expect(category.name).toBe("valid_category")
  })

  test("Should return all categories", async () => {
    const sut = makeSut()

    await db.category.deleteMany()

    await sut.add("valid_category")

    const category = await sut.list()

    expect(category).toEqual([
      {
        id: expect.any(String),
        name: "valid_category",
      },
    ])
  })
})
