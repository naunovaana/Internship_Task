import {
    JsonController,
    Post,
    Body,
} from "routing-controllers";
import  User  from "../models/User";
import {AuthService}  from "../service/AuthService";

@JsonController("/users")
export class UserController {
    @Post("/register")
    async register(@Body() userData: { name: string; email: string; password: string }) {
        // Hash password before saving
        userData.password = await AuthService.hashPassword(userData.password);
        return await User.create(userData);
    }

    @Post("/login")
    async login(@Body() loginData: { email: string; password: string }) {
        return await AuthService.login(loginData.email, loginData.password);
    }
}
