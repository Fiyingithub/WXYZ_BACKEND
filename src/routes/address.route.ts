import express from "express";
import { protectedAction } from '../middlewares/protected.middleware.ts'
import { addressController } from "../controllers/address.controller.ts";
import { createAddressSchema } from "../validators/address/createAddress.validator.ts";
import { validateSchema } from "../middlewares/validateSchema.ts";

const router = express.Router();


router.use(protectedAction)

router.post("/", validateSchema(createAddressSchema), addressController.create);

router.get("/", addressController.getAddress);

router.get("/:adressId", addressController.getAddressById);

router.patch("/:addressId", addressController.updateAddress);

router.delete("/:addressId", addressController.deleteAddress);

const AddressRoute = router;
export default AddressRoute