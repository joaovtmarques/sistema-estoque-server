import { db } from "../helpers/prisma-helper"
import { ItemModel } from "@/domain/models/item"
import { AddItemModel } from "@/domain/usecases/add-item"
import { ItemRepository } from "@/data/protocols/item-repository"

export class PrismaItemRepository implements ItemRepository {
  async add(data: AddItemModel): Promise<ItemModel> {
    return await db.item.create({
      data,
      include: {
        category: true,
      },
    })
  }

  async list(): Promise<ItemModel[]> {
    return await db.item.findMany({
      include: {
        category: true,
      },
    })
  }

  async find(id: string): Promise<ItemModel | null> {
    return await db.item.findUnique({
      where: {
        id,
      },
      include: { category: true },
    })
  }

  async update(data: Omit<ItemModel, "category">): Promise<ItemModel> {
    return await db.item.update({
      where: {
        id: data.id,
      },
      data,
      include: {
        category: true,
      },
    })
  }
}
