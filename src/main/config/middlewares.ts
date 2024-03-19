import helmet from "helmet"
import { Express } from "express"
import { bodyParser, contentType, cors } from "../middlewares"

export default (app: Express): void => {
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "'self'",
            "http://localhost:5173",
            "http://10.12.172.213:5173",
          ],
        },
      },
    }),
  )
}
