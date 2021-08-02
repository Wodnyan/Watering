import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";

type CreatePlantData = {
    name: string;
    information?: string;
    picture?: string;
    watered?: boolean;
    lastWatered?: string | Date;
};

@Injectable()
export class PlantService {
    constructor(private prisma: PrismaService) {}

    async plant(where: Prisma.PlantWhereUniqueInput) {
        return this.prisma.plant.findUnique({
            where,
            include: {
                owner: {
                    select: {
                        email: true,
                        id: true,
                        username: true,
                    },
                },
            },
        });
    }

    async plants(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PlantWhereUniqueInput;
        where?: Prisma.PlantWhereInput;
        orderBy?: Prisma.PlantOrderByInput;
    }) {
        return this.prisma.plant.findMany({
            ...params,
            include: {
                owner: {
                    select: {
                        email: true,
                        id: true,
                        username: true,
                    },
                },
            },
        });
    }

    async createPlant(data: CreatePlantData, userId: number) {
        return this.prisma.plant.create({
            data: {
                ...data,
                owner: {
                    connect: {
                        id: userId,
                    },
                },
            },
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
