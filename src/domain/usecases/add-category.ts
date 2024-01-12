import { CategoryModel } from "../models/category"

export interface AddCategory {
  add(name: string): Promise<CategoryModel>
}
