import { CategoryModel } from "@/domain/models/category"
import { AddCategory } from "@/domain/usecases/add-category"
import { CategoryRepository } from "../../protocols/category-repository"

export class DbAddCategory implements AddCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async add(name: string): Promise<CategoryModel> {
    return await this.categoryRepository.add(name)
  }
}
