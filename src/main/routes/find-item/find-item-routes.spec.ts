import request from "supertest"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"
import app from "@/main/config/app"

describe("Find Item route", () => {
  beforeEach(async () => {
    await db.category.deleteMany()
    await db.item.deleteMany()
  })

  test("Should return an item if a valid id is provided", async () => {
    const category = await request(app)
      .post("/api/categories")
      .send({ name: "valid_category" })

    const createdItem = await request(app).post("/api/items").send({
      name: "valid_name",
      categoryId: category.body.id,
      amount: 1,
      model: "valid_model",
      serialNumber: "valid_serial_number",
    })

    const { body } = await request(app)
      .get(`/api/items/${createdItem.body.id}`)
      .expect(200)

    expect(body).toBeTruthy()
    expect(body).toEqual({
      id: expect.any(String),
      name: "valid_name",
      categoryId: category.body.id,
      category: {
        id: expect.any(String),
        name: "valid_category",
      },
      model: "valid_model",
      serialNumber: "valid_serial_number",
      amount: 1,
    })
  })
})
