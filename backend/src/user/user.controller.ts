import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":userId")
    async findOne(@Param("userId") userId: number) {
        const user = await this.userService.user({
            id: Number(userId),
        });
        return {
            user,
        };
    }

    @Post()
    async create(
        @Body() userData: { username: string; email: string; password: string },
    ) {
        return this.userService.createUser(userData);
    }
}
