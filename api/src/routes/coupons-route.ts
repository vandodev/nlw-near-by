import { Router } from "express"

import { CouponsController } from "@/controllers/coupons-controller"

const couponsRoutes = Router()
const couponsController = new CouponsController()

couponsRoutes.patch("/:market_id", couponsController.update)

export { couponsRoutes }
