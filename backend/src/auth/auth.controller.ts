import {
    Body,
    Controller,
    Get,
    MiddlewareConsumer,
    NestModule,
    Post,
    Req,
    Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { REFRESH_TOKEN_NAME } from "src/constants";
import { AuthenticateMiddleware } from "src/middlewares/authenticate.middleware";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

type LoginCredentials = {
    email: string;
    password: string;
};

type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
};

@Controller("api/v1/auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Get("me")
    async me(@Req() req: Request) {
        const { userId } = req;
        const user = await this.userService.user({
            id: userId,
        });
        delete user.password;

        return {
            user,
        };
    }

    @Post("login")
    async login(
        @Res() res: Response,
        @Body() userCredentials: LoginCredentials,
    ) {
        const { accessToken, refreshToken, user } =
            await this.authService.login(userCredentials);
        res.cookie(REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
        });
        res.json({
            accessToken,
            user,
        });
    }

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
