import { isValidCardNumber } from "../utils/card.utils.js";
export class CardService {
    static validate(cardNumber) {
        return isValidCardNumber(cardNumber);
    }
}
//# sourceMappingURL=card.service.js.map