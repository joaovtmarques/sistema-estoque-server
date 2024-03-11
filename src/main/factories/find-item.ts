import { DbFindItem } from "@/data/usecases/find-item/db-find-item"
import { PrismaItemRepository } from "@/infra/db/prisma/item-repository/item"
import { FindItemController } from "@/presentation/controllers/find-item/find-item"

export const makeFindItemController = (): FindItemController => {
  const itemRepository = new PrismaItemRepository()
  const dbFindItem = new DbFindItem(itemRepository)

  return new FindItemController(dbFindItem)
}
