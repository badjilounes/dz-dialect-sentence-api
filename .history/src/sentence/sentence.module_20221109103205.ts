import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentenceController } from './sentence.controller';
import { SentenceService } from './sentence.service';

@Module({
    imports: [TypeOrmModule],
    controllers: [SentenceController],
    providers: [SentenceService]
})
export class SentenceModule {}
