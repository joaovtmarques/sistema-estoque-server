import { db } from "../helpers/prisma-helper"
import { CategoryModel } from "@/domain/models/category"
import { CategoryRepository } from "@/data/protocols/category-repository"

export class PrismaCategoryRepository implements CategoryRepository {
  async add(name: string): Promise<CategoryModel> {
    return await db.category.create({
      data: {
        name,
      },
    })
  }

  async list(): Promise<CategoryModel[]> {
    return await db.category.findMany()
  }
}
