import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import crypto from "node:crypto"
import { z } from "zod"

class CouponsController {
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        market_id: z.string().uuid(),
      })

      const { market_id } = paramsSchema.parse(request.params)

      const market = await prisma.market.findUnique({
        where: { id: market_id },
      })

      if (!market) {
        throw new AppError("Estabelecimento não encontrado!", 404)
      }

      if (market.cupons <= 0) {
        throw new AppError("Não há cupom disponível no momento!")
      }

      await prisma.market.update({
        data: { cupons: { decrement: 1 } },
        where: { id: market_id },
      })

      const coupon = crypto
        .createHash("sha256")
        .update(market.id)
        .digest("hex")
        .substring(0, 8)
        .toUpperCase()

      return response.json({ coupon })
    } catch (error) {
      next(error)
    }
  }
}

export { CouponsController }
