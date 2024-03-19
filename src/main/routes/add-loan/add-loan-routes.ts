import { Router } from "express"
import { makeAddLoanController } from "@/main/factories/add-loan"
import { adaptRoute } from "@/main/adapters/express-routes-adapter"

export default (router: Router): void => {
  router.post("/loans", adaptRoute(makeAddLoanController()))
}
