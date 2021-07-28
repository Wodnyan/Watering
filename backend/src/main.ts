import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./services/prisma.service";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
    const port = process.env.PORT || 5050;
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser(process.env.REFRESH_COOKIE_SECRET));

    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);
    await app.listen(port);
}
bootstrap();
