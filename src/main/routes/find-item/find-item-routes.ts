import { Router } from "express"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"
import { makeFindItemController } from "@/main/factories/find-item"

export default (router: Router): void => {
  router.get("/items/:id", adaptRoute(makeFindItemController()))
}
