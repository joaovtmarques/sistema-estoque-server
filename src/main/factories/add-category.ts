import { DbAddCategory } from "@/data/usecases/add-category/db-add-category"
import { PrismaCategoryRepository } from "@/infra/db/prisma/category-repository/category"
import { AddCategoryController } from "@/presentation/controllers/add-category/add-category"

export const makeAddCategoryController = (): AddCategoryController => {
  const categoryRepository = new PrismaCategoryRepository()
  const dbAddCategory = new DbAddCategory(categoryRepository)

  return new AddCategoryController(dbAddCategory)
}
