import request from "supertest"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"
import app from "@/main/config/app"

describe("Add Loan route", () => {
  beforeEach(async () => {
    await db.category.deleteMany()
    await db.item.deleteMany()
    await db.loan.deleteMany()
  })

  test("Should return an loan on success", async () => {
    const category = await request(app)
      .post("/api/categories")
      .send({ name: "any_category" })

    const item = await request(app).post("/api/items").send({
      name: "valid_name",
      categoryId: category.body.id,
      amount: 1,
      model: "valid_model",
      serialNumber: "valid_serial_number",
    })

    const { body } = await request(app)
      .post("/api/loans")
      .send({
        item: item.body,
        amount: 1,
        date: new Date(),
        lender: "any_lender",
        receiver: "any_receiver",
        observation: "any_observation",
      })
      .expect(201)

    expect(body).toEqual({
      id: expect.any(String),
      itemId: item.body.id,
      amount: 1,
      date: expect.any(Date),
      lender: "any_lender",
      receiver: "any_receiver",
      observation: "any_observation",
    })
  })
})
