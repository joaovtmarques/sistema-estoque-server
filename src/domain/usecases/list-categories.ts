import { CategoryModel } from "../models/category"

export interface ListCategories {
  list(): Promise<CategoryModel[]>
}
