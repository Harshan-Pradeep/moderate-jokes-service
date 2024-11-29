import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ModerateHttpService } from './http.service';
import { ModerateService } from './moderate.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ObjectId } from 'mongodb';
import { Logger } from '@nestjs/common';
import { UpdateJokeDto } from './dto/update-joke.dto';


@Controller('api/v1/moderate')
export class ModerateController {
    constructor(
        private readonly moderateService: ModerateService,
        private readonly moderateHttpService: ModerateHttpService
    ) {}

    @Post('types')
    async createJokeType(@Body() createTypeDto: CreateTypeDto) {
        console.log("createTypeDto",createTypeDto);
        return this.moderateHttpService.createJokeType(createTypeDto);
    }

    @Delete('delete')
    async deleteJoke(@Query('id') id: string) {
        const jokeId = id;
        const result = await this.moderateHttpService.deleteJoke(jokeId);
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

    @Put('update')
    async updateJoke(
        @Query('id') id: string,
        @Body() updateJokeDto: UpdateJokeDto
    ) {
        console.log("body",updateJokeDto)
        return this.moderateHttpService.updateJoke(id, updateJokeDto);
    }



}
