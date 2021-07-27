import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./services/prisma.service";

async function bootstrap() {
    const port = process.env.PORT || 5050;
    const app = await NestFactory.create(AppModule);
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);
    await app.listen(port);
}
bootstrap();
