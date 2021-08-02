import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { PlantService } from "./plant.service";

type CreatePlantInfo = {
    name: string;
    userId: number;
    information?: string;
    picture?: string;
    watered?: boolean;
    lastWatered?: string | Date;
};

type UpdatePlantInfo = {
    name: string;
    information?: string;
    picture?: string;
    watered?: boolean;
    lastWatered?: string | Date;
};

@Controller("api/v1/plants")
export class PlantController {
    constructor(private plantService: PlantService) {}

    @Get(":plantId")
    getOne(@Param("plantId") plantId: string) {
        return this.plantService.plant({
            id: Number(plantId),
        });
    }

    @Get()
    getAll() {
        return this.plantService.plants();
    }

    @Post()
    create(@Body() plantInfo: CreatePlantInfo) {
        const { name, userId, information, lastWatered, watered } = plantInfo;
        return this.plantService.createPlant(
            {
                name,
                information,
                lastWatered,
                watered,
            },
            userId,
        );
    }

    @Delete(":plantId")
    delete(@Param("plantId") plantId: string) {
        return this.plantService.deletePlant({ id: Number(plantId) });
    }

    @Put(":plantId")
    update(
        @Body() plantInfo: UpdatePlantInfo,
        @Param("plantId") plantId: string,
    ) {
        const {} = plantInfo;
        return this.plantService.updatePlant({
            data: plantInfo,
            where: {
                id: Number(plantId),
            },
        });
    }
}
