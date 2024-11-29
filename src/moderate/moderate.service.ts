import { Injectable } from '@nestjs/common';
import { ModerateHttpService } from './http.service';

@Injectable()
export class ModerateService {
    constructor(
        private readonly moderateHttpService: ModerateHttpService
    ) {}
    
}
