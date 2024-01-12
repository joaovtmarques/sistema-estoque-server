import { CategoryModel } from "./category"

export interface ItemModel {
  id: string
  name: string
  model?: string
  serialNumber?: string
  type: CategoryModel
  amount: number
}
