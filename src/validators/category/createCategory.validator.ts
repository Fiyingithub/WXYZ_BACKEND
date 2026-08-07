import { z } from "zod";

export const createCategorySchema = z.object({
      name: z
            .string().min(1, { message: "Name field is required" })
            .trim()
            .min(3, { message: "Valid name is required" }),


});


