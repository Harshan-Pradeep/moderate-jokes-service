import { Module } from '@nestjs/common';
import { ModerateModule } from './moderate/moderate.module';

@Module({
  imports: [ModerateModule]
})
export class AppModule {}
