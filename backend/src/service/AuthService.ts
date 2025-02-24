import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  User  from "../models/User";

export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("User not found");

        const isValidPassword = await this.comparePassword(password, user.password);
        if (!isValidPassword) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user.id, email: user.email }, "YOUR_SECRET_KEY", { expiresIn: "1h" });
        return { message: "Login successful", token };
    }
}
