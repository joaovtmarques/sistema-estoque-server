import request from "supertest"
import app from "@/main/config/app"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"

describe("AddCategory route", () => {
  afterEach(async () => {
    await db.category.deleteMany()
  })

  test("Should return an category on success", async () => {
    await request(app)
      .post("/api/categories")
      .send({
        name: "any_category",
      })
      .expect(201)
  })
})
