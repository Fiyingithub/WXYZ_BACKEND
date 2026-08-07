import type { CreateAddressDto, UpdateAddressDto } from "../dto/address/address.dto.ts";
import prisma from "../lib/prisma.ts";



export const addressRepository = {
      create: async (data: CreateAddressDto) => {
            return prisma.address.create({
                  data,
            });
      },

      findByUserId: async (userId: string) => {
            return prisma.address.findMany({
                  where: {
                        userId,
                  },
                  orderBy: {
                        id: "desc",
                  }
            });
      },

      findById: async (id: string) => {
            return prisma.address.findUnique({
                  where: {
                        id,
                  },
            });
      },

      update: async (id: string, data: UpdateAddressDto) => {
            return prisma.address.update({
                  where: {
                        id,
                  },
                  data,
            });
      },

      delete: async (id: string) => {
            return prisma.address.delete({
                  where: {
                        id,
                  },
            });
      },
};