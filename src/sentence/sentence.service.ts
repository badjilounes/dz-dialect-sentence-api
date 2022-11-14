import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkSentenceDto } from './dto/bulk-create-sentence.dto';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { Sentence } from './sentence.entity';

@Injectable()
export class SentenceService {

    constructor(@InjectRepository(Sentence) private sentenceRepository: Repository<Sentence>) {}

    
    async createSentence(_createSentenceDto: CreateSentenceDto): Promise<Sentence> {
        const sentence: Sentence = this.sentenceRepository.create(_createSentenceDto);
        return this.sentenceRepository.save(sentence);
    }

    async bulkCreateSentence(sentenceList: BulkSentenceDto[]): Promise<Sentence[]> {
        const createdSentenceList: Sentence[] = [];

        for (let sentence of sentenceList) {
            const createSentenceDto: CreateSentenceDto = {
                dz: sentence.dz,
                dz_ar: sentence.dz_ar,
                fr: sentence.fr,
                word_propositions_dz: sentence.word_propositions.dz,
                word_propositions_fr: sentence.word_propositions.fr,
                pronouns: sentence.additionnal_information.pronouns || [],
                adjectives: sentence.additionnal_information.adjectives|| [],
                verbs: sentence.additionnal_information.verbs|| [],
                tense: sentence.additionnal_information.tense || '',
                schema: sentence.additionnal_information.schema || '',
            }
            const createdSentence: Sentence = await this.createSentence(createSentenceDto);
            createdSentenceList.push(createdSentence);
        }

        return createdSentenceList;

        // return Promise.all(sentenceList.map((sentence) => this.createSentence(sentence)))
    }
}

