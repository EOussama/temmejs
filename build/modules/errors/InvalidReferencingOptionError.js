"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidReferencingOptionError extends TemmyError_1.default {
    constructor(message) {
        super("");
        this.name = "InvalidReferencingOptionError";
        this.message = "A referencing option is not valid";
        this.message = message.length > 0 ? message : this.message;
    }
}
exports.default = InvalidReferencingOptionError;
//# sourceMappingURL=InvalidReferencingOptionError.js.map