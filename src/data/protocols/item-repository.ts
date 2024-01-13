import { ItemModel } from "@/domain/models/item"
import { AddItemModel } from "@/domain/usecases/add-item"

export interface ItemRepository {
  add(item: AddItemModel): Promise<ItemModel>

  list(): Promise<ItemModel[]>
}
