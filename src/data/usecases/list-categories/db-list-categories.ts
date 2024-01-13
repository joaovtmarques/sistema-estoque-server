import { CategoryModel } from "@/domain/models/category"
import { ListCategories } from "@/domain/usecases/list-categories"
import { CategoryRepository } from "../add-category/db-add-category-protocols"

export class DbListCategories implements ListCategories {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async list(): Promise<CategoryModel[]> {
    return await this.categoryRepository.list()
  }
}
