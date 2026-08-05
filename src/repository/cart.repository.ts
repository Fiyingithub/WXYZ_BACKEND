import prisma from "../lib/prisma.ts";
import { Prisma } from "../../generated/prisma/client.ts";


export const cartRepository = {
      create: async (data: Prisma.CartCreateInput) => {
            return prisma.cart.create({
                  data
            });
      }
      
};