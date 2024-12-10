import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class MarketsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        category_id: z.string().uuid(),
      })

      const { category_id } = paramsSchema.parse(request.params)

      const markets = await prisma.market.findMany({
        where: { categoryId: category_id },
        orderBy: { name: "asc" },
      })

      return response.json(markets)
    } catch (error) {
      next(error)
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = paramsSchema.parse(request.params)

      const markets = await prisma.market.findUnique({
        where: { id },
        include: {
          rules: true,
        },
      })

      return response.json(markets)
    } catch (error) {
      next(error)
    }
  }
}

export { MarketsController }
