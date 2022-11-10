import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentenceController } from './sentence.controller';
import { Sentence } from './sentence.entity';
import { SentenceService } from './sentence.service';

@Module({
    imports: [TypeOrmModule.forFeature([Sentence])],
    controllers: [SentenceController],
    providers: [SentenceService]
})
export class SentenceModule {}
