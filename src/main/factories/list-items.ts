import { DbListItems } from "@/data/usecases/list-items/db-list-items"
import { PrismaItemRepository } from "@/infra/db/prisma/item-repository/item"
import { ListItemsController } from "@/presentation/controllers/list-items/list-items"

export const makeListItems = (): ListItemsController => {
  const itemRepository = new PrismaItemRepository()
  const dbListItems = new DbListItems(itemRepository)

  return new ListItemsController(dbListItems)
}
