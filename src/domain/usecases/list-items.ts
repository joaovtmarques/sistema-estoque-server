import { ItemModel } from "../models/item"

export interface ListItems {
  list(): Promise<ItemModel[]>
}
