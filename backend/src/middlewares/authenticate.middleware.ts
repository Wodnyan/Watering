import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "src/services/jwt.service";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = (await this.jwtService.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
            )) as {
                id: number;
            };
            req.userId = id;
            next();
        } catch (error) {
            next(error);
        }
    }
}
