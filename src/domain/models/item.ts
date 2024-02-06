import { CategoryModel } from "./category"

export interface ItemModel {
  id: string
  name: string
  model?: string | undefined | null
  serialNumber?: string | undefined | null
  categoryId: string
  amount: number
  category?: null | undefined | CategoryModel
}
