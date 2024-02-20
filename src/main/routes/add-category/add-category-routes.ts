import { Router } from "express"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"
import { makeAddCategoryController } from "@/main/factories/add-category"

export default (router: Router): void => {
  router.post("/categories", adaptRoute(makeAddCategoryController()))
}
