import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { Sentence } from './sentence.entity';

@Injectable()
export class SentenceService {

    constructor(@InjectRepository(Sentence) private sentenceRepository: Repository<Sentence>) {}

    
    async createSentence(createSentenceDto: CreateSentenceDto): Promise<Sentence> {
        
        const sentence: Sentence = new Sentence();
        return this.sentenceRepository.save(sentence);
    }
}
