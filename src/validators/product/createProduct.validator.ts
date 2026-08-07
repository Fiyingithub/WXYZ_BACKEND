import { z } from "zod";

export const createProductSchema = z.object({
      name: z
            .string().min(1, { message: "Name field is required" })
            .trim()
            .min(3, { message: "Valid name is required" }),


      price: z.coerce
            .number()
            .positive({ message: "Price must be greater than 0" }),

      quantity: z.coerce
            .number()
            .int({ message: "Quantity must be a whole number" })
            .nonnegative({ message: "Quantity cannot be negative" }),

      
});

