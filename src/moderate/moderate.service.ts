import { Injectable } from '@nestjs/common';
import { ModerateHttpService, Type } from './http.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class ModerateService {
    constructor(
        private readonly moderateHttpService: ModerateHttpService
    ) {}

    async createJokeType(createTypeDto: CreateTypeDto): Promise<Type> {
        const newJokeType = await this.moderateHttpService.createJokeType(createTypeDto);
        return newJokeType;
    }

    async deleteJoke(jokeId: string): Promise<{ success: boolean; message: string }> {
        const result = await this.moderateHttpService.deleteJoke(jokeId);
        return result;
    }

}
