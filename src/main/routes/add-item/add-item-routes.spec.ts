import request from "supertest"
import app from "@/main/config/app"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"

describe("Add item route", () => {
  beforeEach(async () => {
    await db.category.deleteMany({})
    await db.item.deleteMany({})
  })

  test("Should return an item on success", async () => {
    const category = await request(app)
      .post("/api/categories")
      .send({ name: "valid_category" })

    const { body } = await request(app)
      .post("/api/items")
      .send({
        name: "valid_name",
        categoryId: category.body.id,
        amount: 1,
        model: "valid_model",
        serialNumber: "valid_serial_number",
      })
      .expect(201)

    expect(body).toBeTruthy()
    expect(body.id).toBeTruthy()
    expect(body.name).toEqual("valid_name")
    expect(body.model).toEqual("valid_model")
    expect(body.serialNumber).toEqual("valid_serial_number")
    expect(body.categoryId).toEqual(category.body.id)
    expect(body.amount).toEqual(1)
  })
})
