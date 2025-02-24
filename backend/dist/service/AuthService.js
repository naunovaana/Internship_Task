"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.hash(password, 10);
        });
    }
    static comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, hashedPassword);
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ where: { email } });
            if (!user)
                throw new Error("User not found");
            const isValidPassword = yield this.comparePassword(password, user.password);
            if (!isValidPassword)
                throw new Error("Invalid credentials");
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "YOUR_SECRET_KEY", { expiresIn: "1h" });
            return { message: "Login successful", token };
        });
    }
}
exports.AuthService = AuthService;
