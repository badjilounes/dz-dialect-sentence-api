import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentenceService } from './sentence/sentence.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SentenceService],
})
export class AppModule {}
