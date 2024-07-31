import { ItemModel } from "@/domain/models/item"
import { DeleteItem } from "@/domain/usecases/delete-item"
import { ItemRepository } from "../add-item/db-add-item-protocols"

export class DbDeleteItem implements DeleteItem {
  constructor(private readonly itemRepository: ItemRepository) {}

  async delete(item: ItemModel): Promise<void> {
    await this.itemRepository.delete(item.id)
  }
}
