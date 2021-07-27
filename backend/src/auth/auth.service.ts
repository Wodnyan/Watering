import { Injectable } from "@nestjs/common";
import { HashService } from "src/services/hash.service";
import { JwtService } from "src/services/jwt.service";
import { PrismaService } from "src/services/prisma.service";
import * as dotenv from "dotenv";

dotenv.config();

type LoginData = {
    email: string;
    password: string;
};

type RegisterData = {
    username: string;
    email: string;
    password: string;
};

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private hashService: HashService,
        private jwtService: JwtService,
    ) {}

    async login(data: LoginData) {
        const { password, email } = data;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        const correctPassword = await this.hashService.compare(
            password,
            user.password,
        );
        if (!correctPassword) {
            throw new Error("Incorrect Password");
        } else {
            // Create jwt
        }
    }

    async register(data: RegisterData) {
        const { password } = data;
        const hashedPassword = await this.hashService.hash(password);

        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                username: true,
            },
        });

        const accessToken = await this.jwtService.sign(
            {
                id: user.id,
            },
            process.env.ACCESS_TOKEN_SECRET,
        );
        const refreshToken = await this.jwtService.sign(
            {
                id: user.id,
            },
            process.env.REFRESH_TOKEN_SECRET,
        );

        return {
            accessToken,
            refreshToken,
            user,
        };
    }
}
