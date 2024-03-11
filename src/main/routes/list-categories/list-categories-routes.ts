import { Router } from "express"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"
import { makeListCategoriesController } from "@/main/factories/list-categories"

export default (router: Router): void => {
  router.get("/categories", adaptRoute(makeListCategoriesController()))
}
