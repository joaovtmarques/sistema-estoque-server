import request from "supertest"
import app from "@/main/config/app"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"

describe("List items route", () => {
  beforeEach(async () => {
    await db.category.deleteMany({})
    await db.item.deleteMany({})
  })

  test("Should list all items on success", async () => {
    const category = await request(app)
      .post("/api/categories")
      .send({ name: "valid_category" })

    await request(app).post("/api/items").send({
      name: "valid_name",
      categoryId: category.body.id,
      amount: 1,
      model: "valid_model",
      serialNumber: "valid_serial_number",
    })

    const { body } = await request(app).get("/api/items").expect(200)

    expect(body).toBeTruthy()
    expect(body).toEqual([
      {
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
      },
    ])
  })
})
