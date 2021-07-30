import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class PlantService {
    constructor(private prisma: PrismaService) {}

    async plant(where: Prisma.PlantWhereUniqueInput) {
        return this.prisma.plant.findUnique({
            where,
        });
    }

    async plants(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PlantWhereUniqueInput;
        where?: Prisma.PlantWhereInput;
        orderBy?: Prisma.PlantOrderByInput;
    }) {
        return this.prisma.plant.findMany(params);
    }

    async createPlant(data: Prisma.PlantCreateInput) {
        return this.prisma.plant.create({
            data,
        });
    }

    async deletePlant(where: Prisma.PlantWhereUniqueInput) {
        return this.prisma.plant.delete({
            where,
        });
    }

    async updatePlant(params: {
        where: Prisma.PlantWhereUniqueInput;
        data: Prisma.PlantUpdateInput;
    }) {
        return this.prisma.plant.update(params);
    }
}
