import { Router } from "express"

import { MarketsController } from "@/controllers/markets-controller"

const marketsRoutes = Router()
const marketsController = new MarketsController()

marketsRoutes.get("/category/:category_id", marketsController.index)
marketsRoutes.get("/:id", marketsController.show)

export { marketsRoutes }
