import { Module } from '@nestjs/common';
import { ModerateController } from './moderate.controller';
import { ModerateService } from './moderate.service';
import { ModerateHttpService } from './http.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot()
  ],
  controllers: [ModerateController],
  providers: [ModerateService, ModerateHttpService]
})
export class ModerateModule {}
