import { DbFindItem } from "@/data/usecases/find-item/db-find-item"
import { DbDeleteItem } from "@/data/usecases/delete-item/db-delete-item"
import { PrismaItemRepository } from "@/infra/db/prisma/item-repository/item"
import { DeleteItemController } from "@/presentation/controllers/delete-item/delete-item"

export const makeDeleteItemController = (): DeleteItemController => {
  const itemRepository = new PrismaItemRepository()
  const dbFindItem = new DbFindItem(itemRepository)
  const dbDeleteItem = new DbDeleteItem(itemRepository)

  return new DeleteItemController(dbFindItem, dbDeleteItem)
}
