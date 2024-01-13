import { ItemModel } from "@/domain/models/item"
import { ItemRepository } from "@/data/protocols/item-repository"
import { AddItem, AddItemModel } from "@/domain/usecases/add-item"

export class DbAddItem implements AddItem {
  constructor(private readonly itemRepository: ItemRepository) {}

  async add(itemData: AddItemModel): Promise<ItemModel> {
    const item = await this.itemRepository.add(itemData)

    return item
  }
}
