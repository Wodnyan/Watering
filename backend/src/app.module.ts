import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthenticateMiddleware } from "./middlewares/authenticate.middleware";
import { HashService } from "./services/hash.service";
import { JwtService } from "./services/jwt.service";
import { PrismaService } from "./services/prisma.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

@Module({
    imports: [],
    controllers: [AppController, UserController, AuthController],
    providers: [
        AppService,
        UserService,
        PrismaService,
        HashService,
        AuthService,
        JwtService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticateMiddleware).forRoutes({
            path: "api/v1/auth/me",
            method: RequestMethod.GET,
        });
    }
}
