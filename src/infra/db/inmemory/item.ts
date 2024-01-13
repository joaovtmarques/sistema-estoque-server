import { ItemModel } from "@/domain/models/item"
import { AddItemModel } from "@/domain/usecases/add-item"
import { ItemRepository } from "@/data/protocols/item-repository"

export class InMemoryItemRepository implements ItemRepository {
  public items: ItemModel[] = []

  add(itemData: AddItemModel): Promise<ItemModel> {
    const item = {
      id: crypto.randomUUID(),
      name: itemData.name,
      model: itemData.model,
      serialNumber: itemData.serialNumber,
      categoryId: itemData.categoryId,
      amount: itemData.amount,
    }

    this.items.push(item)

    return new Promise((resolve) => resolve(item))
  }
}
