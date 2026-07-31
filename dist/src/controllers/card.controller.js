import { CardService } from "../services/card.service.js";
export const validateCard = (req, res) => {
    try {
        const { cardNumber } = req.body;
        if (!cardNumber || typeof cardNumber !== "string") {
            return res.status(400).json({
                error: true,
                status: 400,
                message: "cardNumber is required and must be a string",
            });
        }
        const isValid = CardService.validate(cardNumber);
        if (!isValid) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: "Card number is invalid",
            });
        }
        return res.status(200).json({
            error: false,
            status: 200,
            message: "Card number is valid",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            status: 500,
            message: "An error occurred while validating the card",
        });
    }
};
//# sourceMappingURL=card.controller.js.map