import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { REFRESH_TOKEN_NAME } from "src/constants";
import { AuthService } from "./auth.service";

type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
};

@Controller("api/v1/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    async register(
        @Res() res: Response,
        @Body() userCredentials: RegisterCredentials,
    ) {
        const { accessToken, user, refreshToken } =
            await this.authService.register(userCredentials);
        res.cookie(REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
        });
        res.json({
            user,
            accessToken,
        });
    }
}
