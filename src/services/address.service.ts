import type { CreateAddressDto, UpdateAddressDto } from "../dto/address/address.dto.ts";
import { addressRepository } from "../repository/address.repository.ts";




export const addressService = {
      createAddress: async (data: CreateAddressDto) => {
            return await addressRepository.create(data);
      },

      getUserAddress: async (userId: string) => {
            return await addressRepository.findByUserId(userId);
      },

      getAddressById: async ( userId: string,  addressId: string) => {
            const address = await addressRepository.findById(addressId);

            if (!address) {
                  throw new Error("Address not found.");
            }

            if (address.userId !== userId) {
                  throw new Error("Unauthorized.");
            }

            return address;
      },

      updateAddress: async (userId: string, addressId: string, data: UpdateAddressDto) => {
            const address = await addressRepository.findById(addressId);

            if (!address) {
                  throw new Error("Address not found.");
            }

            if (address.userId !== userId) {
                  throw new Error("Unauthorized.");
            }

            return await addressRepository.update(addressId, data);
      },

      deleteAddress: async (userId: string, id: string) => {
            const address = await addressRepository.findById(id);

            if (!address) {
                  throw new Error("Address not found.");
            }

            if (address.userId !== userId) {
                  throw new Error("Unauthorized.");
            }

            return await addressRepository.delete(id);
      },
}