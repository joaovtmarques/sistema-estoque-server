import request from "supertest"
import app from "@/main/config/app"
import { db } from "@/infra/db/prisma/helpers/prisma-helper"

describe("List categories route", () => {
  beforeEach(async () => {
    await db.category.deleteMany({})
  })

  test("Should return all categories on success", async () => {
    await request(app).post("/api/categories").send({ name: "valid_category" })

    const categories = await request(app).get("/api/categories").expect(200)

    expect(categories.body).toBeTruthy()
    expect(categories.body).toEqual(expect.any(Array))
  })
})
