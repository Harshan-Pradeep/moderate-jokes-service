import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateTypeDto } from './dto/create-type.dto';
import { ObjectId } from 'mongodb';

export interface Type {
    id: number;
    name: string;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

export interface Joke {
    content: string;
    type: string;
    status: string;
}

export interface UpdateJokeDto {
    content?: string;
    type?: string;
    status?: string;
}

@Injectable()
export class ModerateHttpService {
    private readonly deliveryServiceUrl: string;
    private readonly submitServiceUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.deliveryServiceUrl = this.configService.get<string>('DELIVERY_SERVICE_URL');
        this.submitServiceUrl = this.configService.get<string>('SUBMIT_SERVICE_URL');
    }

    async getAllTypes(): Promise<Type[]> {
        try {
            const response = await firstValueFrom(
                this.httpService.get<Type[]>(`${this.deliveryServiceUrl}/api/v1/delivery/types`)
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch types from delivery service: ${error.message}`);
        }
    }

    async createJokeType(createTypeDto: CreateTypeDto): Promise<Type> {
        try {
            const response = await firstValueFrom(
                this.httpService.post<Type>(
                    `${this.deliveryServiceUrl}/api/v1/delivery/types`,
                    createTypeDto
                )
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to create joke type in delivery service: ${error.message}`);
        }
    }

    async deleteJoke(jokeId: string): Promise<DeleteResponse> {
        try {
            const response = await firstValueFrom(
                this.httpService.delete<DeleteResponse>(
                    `${this.submitServiceUrl}/api/v1/jokes/delete/${jokeId}`
                )
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to delete joke: ${error.message}`);
        }
    }

    async getAllJokes(page = 1, limit = 10): Promise<{ jokes: Joke[], total: number }> {
        try {
            const response = await firstValueFrom(
                this.httpService.get<{ jokes: Joke[], total: number }>(
                    `${this.submitServiceUrl}/api/v1/jokes/pending?page=${page}&limit=${limit}`
                )
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch pending jokes: ${error.message}`);
        }
    }

    async updateJoke(jokeId: string, updateJokeDto: UpdateJokeDto): Promise<Joke> {
        try {
            const response = await firstValueFrom(
                this.httpService.put<Joke>(
                    `${this.submitServiceUrl}/api/v1/jokes/update?id=${jokeId}`,
                    updateJokeDto
                )
            );
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update joke: ${error.message}`);
        }
    }

    
}