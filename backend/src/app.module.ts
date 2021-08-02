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
import { PlantController } from "./plant/plant.controller";
import { PlantService } from "./plant/plant.service";
import { HashService } from "./services/hash.service";
import { JwtService } from "./services/jwt.service";
import { PrismaService } from "./services/prisma.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

@Module({
    imports: [],
    controllers: [
        AppController,
        UserController,
        AuthController,
        PlantController,
    ],
    providers: [
        AppService,
        UserService,
        PlantService,
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
        consumer
            .apply(AuthenticateMiddleware)
            .exclude(
                {
                    method: RequestMethod.GET,
                    path: "api/v1/plants",
                },
                {
                    method: RequestMethod.GET,
                    path: "api/v1/plants/:plantId",
                },
            )
            .forRoutes(PlantController);
    }
}
