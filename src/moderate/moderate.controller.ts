import { Controller } from '@nestjs/common';
import { ModerateHttpService } from './http.service';
import { ModerateService } from './moderate.service';

@Controller('moderate')
export class ModerateController {
    constructor(
        private readonly moderateService: ModerateService
    ) {}

    
}
