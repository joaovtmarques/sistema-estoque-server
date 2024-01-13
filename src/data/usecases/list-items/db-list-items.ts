import { ItemModel } from "@/domain/models/item"
import { ListItems } from "@/domain/usecases/list-items"
import { ItemRepository } from "../add-item/db-add-item-protocols"

export class DbListItems implements ListItems {
  constructor(private readonly itemRepository: ItemRepository) {}

  async list(): Promise<ItemModel[]> {
    return await this.itemRepository.list()
  }
}
