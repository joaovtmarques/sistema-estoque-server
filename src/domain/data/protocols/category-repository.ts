import { CategoryModel } from "@/domain/models/category"

export interface CategoryRepository {
  add(name: string): Promise<CategoryModel>
}
