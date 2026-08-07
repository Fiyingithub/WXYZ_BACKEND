import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateSchema = (schema: ZodSchema) =>(req: Request, res: Response, next: NextFunction) => {

      const result = schema.safeParse(req.body);

      if (!result.success) {

            return res.status(400).json({
                  status: false,
                  errors: result.error.flatten().fieldErrors,
            });

      }

      req.body = result.data;

      next();
};