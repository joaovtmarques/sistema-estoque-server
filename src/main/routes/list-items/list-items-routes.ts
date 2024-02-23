import { Router } from "express"
import { makeListItems } from "@/main/factories/list-items"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"

export default (router: Router): void => {
  router.get("/items", adaptRoute(makeListItems()))
}
