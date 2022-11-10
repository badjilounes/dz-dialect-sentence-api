import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentenceModule } from './sentence/sentence.module';
import { SentenceService } from './sentence/sentence.service';

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    url: process.env.DATABASE_URL
  
  }),
   SentenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
