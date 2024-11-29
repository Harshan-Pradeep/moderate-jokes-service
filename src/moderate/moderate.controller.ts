import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ModerateHttpService } from './http.service';
import { ModerateService } from './moderate.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ObjectId } from 'mongodb';
import { Logger } from '@nestjs/common';


@Controller('api/v1/moderate')
export class ModerateController {
    constructor(
        private readonly moderateService: ModerateService,
        private readonly moderateHttpService: ModerateHttpService
    ) {}

    @Post('types')
    async createJokeType(@Body() createTypeDto: CreateTypeDto) {
        console.log("createTypeDto",createTypeDto);
        return this.moderateService.createJokeType(createTypeDto);
    }

    @Delete('delete')
    async deleteJoke(@Query('id') id: string) {
        const jokeId = id;
        const result = await this.moderateService.deleteJoke(jokeId);
        return result;
    }

    @Get('pending')
    async getAllJokes(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        const parsedPage = parseInt(page as any, 10);
        const parsedLimit = parseInt(limit as any, 10);
        
        return this.moderateHttpService.getAllJokes(parsedPage, parsedLimit);
    }



}
