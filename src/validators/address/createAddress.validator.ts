import { z } from "zod";

export const createAddressSchema = z.object({
      street: z
            .string().min(1, { message: "Street is required" })
            .trim()
            .min(3, { message: "Valid Street is required" }),


      city: z
         .   string()
            .min(1, { message: "City is required" })
            .trim()
            .min(3, { message: "Valid City is required" }),
            
      state: z
          .  string()
            .min(1, { message: "State is required" })
            .trim()
            .min(3, { message: "Valid State is required" }),

      country: z
            .string()
            .min(1, { message: "Country is required" })
            .trim()
            .min(3, { message: "Valid Country is required" }),
});

export type CreateAddressDto = z.infer<typeof createAddressSchema>;