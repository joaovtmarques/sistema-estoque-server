import * as crypto from "crypto"
import { CategoryModel } from "@/domain/models/category"
import { CategoryRepository } from "@/domain/data/protocols/category-repository"

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: CategoryModel[] = []

  add(name: string): Promise<CategoryModel> {
    const category: CategoryModel = {
      id: crypto.randomUUID(),
      name,
    }

    this.categories.push(category)

    return new Promise((resolve) => resolve(category))
  }
}
