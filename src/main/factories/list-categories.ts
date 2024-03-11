import { DbListCategories } from "@/data/usecases/list-categories/db-list-categories"
import { PrismaCategoryRepository } from "@/infra/db/prisma/category-repository/category"
import { ListCategoriesController } from "@/presentation/controllers/list-categories/list-categories"

export const makeListCategoriesController = (): ListCategoriesController => {
  const categoryRepository = new PrismaCategoryRepository()
  const dbListCategories = new DbListCategories(categoryRepository)

  return new ListCategoriesController(dbListCategories)
}
