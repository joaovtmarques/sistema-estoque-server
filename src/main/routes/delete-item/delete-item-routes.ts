import { Router } from "express"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"
import { makeDeleteItemController } from "@/main/factories/delete-item"

export default (router: Router): void => {
  router.delete("/items/:id", adaptRoute(makeDeleteItemController()))
}
