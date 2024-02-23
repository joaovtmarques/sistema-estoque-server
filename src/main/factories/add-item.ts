import { DbAddItem } from "@/data/usecases/add-item/db-add-item"
import { PrismaItemRepository } from "@/infra/db/prisma/item-repository/item"
import { AddItemController } from "@/presentation/controllers/add-item/add-item"

export const makeAddItemController = (): AddItemController => {
  const itemRepository = new PrismaItemRepository()
  const dbAddItemRepository = new DbAddItem(itemRepository)

  return new AddItemController(dbAddItemRepository)
}
