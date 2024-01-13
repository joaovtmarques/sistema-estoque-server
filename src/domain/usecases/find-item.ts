import { ItemModel } from "../models/item"

export interface FindItem {
  find(id: string): Promise<ItemModel | null>
}
