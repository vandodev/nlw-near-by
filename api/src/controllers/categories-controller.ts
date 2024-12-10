import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class CategoriesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      })

      return response.json(categories)
    } catch (error) {
      next(error)
    }
  }
}

export { CategoriesController }
