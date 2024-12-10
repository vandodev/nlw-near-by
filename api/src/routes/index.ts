import { Router } from "express"

import { couponsRoutes } from "./coupons-route"
import { marketsRoutes } from "./markets-route"
import { categoriesRoutes } from "./categories-route"

const routes = Router()
routes.use("/categories", categoriesRoutes)
routes.use("/markets", marketsRoutes)
routes.use("/coupons", couponsRoutes)

export { routes }
