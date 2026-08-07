import type { Request, Response } from "express";
import { addressService } from "../services/address.service.ts";
import logger from "../logger.ts";





export const addressController = {
      
      create: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;

                  const dto = {
                        userId,
                        ...req.body,
                  };

                  const address =
                  await addressService.createAddress(dto);

                  return res.status(201).json({
                        status: 201,
                        error: false,
                        message: "Address created successfully.",
                        data: address,
                  });
            } catch (error: any) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while creating the address.",
                  });
            }
      },

      getAddress: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;

                  if (!userId) {
                        return res.status(401).json({
                        status: false,
                        message: "Unauthorized",
                        });
                  }

                  const address = await addressService.getUserAddress(userId);
                  return res.status(200).json({
                        status: true,
                        message: "Address fetched successfully.",
                        data: address,
                  });
            } catch (error: any) {
                  logger.info(error);
                  return res.status(500).json({
                        status: false,
                        message: "An error occurred while fetching the address.",
                  });
            }
      },

      getAddressById: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  const { addressId } = req.params as { addressId: string };

                  if (!userId) {
                        return res.status(401).json({
                        status: 401,
                        error: true,
                        message: "Unauthorized",
                        });
                  }

                  if (!addressId) {
                        return res.status(400).json({
                        status: 400,
                        error: true,
                        message: "Address ID is required.",
                        });
                  }

                  const address = await addressService.getAddressById(
                        userId,
                        addressId
                  );
                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Address fetched successfully.",
                        data: address,
                  });
            } catch (error: any) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while fetching the address.",
                  });
            }
      },

      updateAddress: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  const { addressId } = req.params as { addressId: string };

                  if (!userId) {
                        return res.status(401).json({
                        status: 401,
                        error: true,
                        message: "Unauthorized",
                        });
                  }

                  if (!addressId) {
                        return res.status(400).json({
                        status: 400,
                        error: true,
                        message: "Address ID is required.",
                        });
                  }

                  const dto = {
                        userId,
                        addressId,
                        ...req.body,
                  };

                  const address = await addressService.updateAddress(
                        userId,
                        addressId,
                        dto
                  );
                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Address updated successfully.",
                        data: address,
                  });
            } catch (error: any) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while updating the address.",
                  });
            }
      },

      deleteAddress: async (req: Request, res: Response) => {
            try {
                  const userId = req.user?.id;
                  const { addressId } = req.params as { addressId: string };

                  if (!userId) {
                        return res.status(401).json({
                              status: 401,
                              error: true,
                              message: "Unauthorized",
                        });
                  }

                  if (!addressId) {
                        return res.status(400).json({
                              status: 400,
                              error: true,
                              message: "Address ID is required.",
                        });
                  }

                  const address = await addressService.deleteAddress(
                        userId,
                        addressId
                  );
                  return res.status(200).json({
                        status: 200,
                        error: false,
                        message: "Address deleted successfully.",
                        data: address,
                  });
            } catch (error: any) {
                  logger.info(error);
                  return res.status(500).json({
                        status: 500,
                        error: true,
                        message: "An error occurred while deleting the address.",
                  });
            }
      },
            
      
};

