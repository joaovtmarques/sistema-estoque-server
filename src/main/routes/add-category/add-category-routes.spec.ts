import request from "supertest"
import app from "@/main/config/app"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"

describe("AddCategory route", () => {
  beforeEach(async () => {
    await db.category.deleteMany()
  })

  test("Should return an category on success", async () => {
    const category = await request(app)
      .post("/api/categories")
      .send({
        name: "any_category",
      })
      .expect(201)

    expect(category.body).toBeTruthy()
    expect(category.body.id).toBeTruthy()
    expect(category.body.name).toEqual("any_category")
  })
})
