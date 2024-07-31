import { ItemModel } from "../models/item"

export interface DeleteItem {
  delete(item: ItemModel): Promise<void>
}
