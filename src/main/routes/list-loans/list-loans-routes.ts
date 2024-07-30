import { Router } from "express"
import { makeListLoans } from "@/main/factories/list-loans"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"

export default (router: Router): void => {
  router.get("/loans", adaptRoute(makeListLoans()))
}
