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

  list(): Promise<ItemModel[]> {
    return new Promise((resolve) => resolve(this.items))
  }

  find(id: string): Promise<ItemModel | null> {
    let item: ItemModel | null = null

    this.items.map((obj) => {
      if (obj.id === id) item = obj
    })

    return new Promise((resolve) => resolve(item))
  }
}
