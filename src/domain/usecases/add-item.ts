import { ItemModel } from "../models/item"

export interface AddItemModel {
  name: string
  model?: string
  serialNumber?: string
  categoryId: string
  amount: number
}

export interface AddItem {
  add(item: AddItemModel): Promise<ItemModel>
}
