import { ItemModel } from "@/domain/models/item"
import { UpdateItem } from "@/domain/usecases/update-item"
import { ItemRepository } from "../add-item/db-add-item-protocols"

export class DbUpdateItem implements UpdateItem {
  constructor(private readonly itemRepository: ItemRepository) {}

  async update(item: ItemModel): Promise<ItemModel> {
    const updatedItem = await this.itemRepository.update(item)

    return updatedItem!
  }
}
