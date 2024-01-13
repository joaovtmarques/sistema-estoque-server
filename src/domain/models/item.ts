import { CategoryModel } from "./category"

export interface ItemModel {
  id: string
  name: string
  model?: string
  serialNumber?: string
  category?: CategoryModel
  categoryId: string
  amount: number
}
