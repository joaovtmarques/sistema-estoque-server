import { Router } from "express"
import { makeAddItemController } from "@/main/factories/add-item"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"

export default (router: Router): void => {
  router.post("/items", adaptRoute(makeAddItemController()))
}
