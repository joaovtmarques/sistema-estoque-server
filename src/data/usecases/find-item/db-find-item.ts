import { ItemModel } from "@/domain/models/item"
import { FindItem } from "@/domain/usecases/find-item"
import { ItemRepository } from "../add-item/db-add-item-protocols"

export class DbFindItem implements FindItem {
  constructor(private readonly itemRepository: ItemRepository) {}

  async find(id: string): Promise<ItemModel | null> {
    return await this.itemRepository.find(id)
  }
}
