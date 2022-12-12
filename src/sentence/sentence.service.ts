import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BulkSentenceDto } from './dto/bulk-create-sentence.dto';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceResponseDto } from './dto/sentence-response.dto';
import { Sentence } from './sentence.entity';

@Injectable()
export class SentenceService {
  constructor(
    @InjectRepository(Sentence)
    private sentenceRepository: Repository<Sentence>,
  ) {}

  async createSentence(
    _createSentenceDto: CreateSentenceDto,
  ): Promise<Sentence> {
    const sentence: Sentence =
      this.sentenceRepository.create(_createSentenceDto);
    return this.sentenceRepository.save(sentence);
  }

  async bulkCreateSentence(
    sentenceList: BulkSentenceDto[],
  ): Promise<Sentence[]> {
    const createdSentenceList: Sentence[] = [];

    for (const sentence of sentenceList) {
      const createSentenceDto: CreateSentenceDto = {
        dz: sentence.dz,
        dz_ar: sentence.dz_ar,
        fr: sentence.fr,
        word_propositions_dz: sentence.word_propositions.dz,
        word_propositions_fr: sentence.word_propositions.fr,
        pronouns: sentence.additionnal_information.pronouns || [],
        adjectives: sentence.additionnal_information.adjectives || [],
        verbs: sentence.additionnal_information.verbs || [],
        tense: sentence.additionnal_information.tense || '',
        schema: sentence.additionnal_information.schema || '',
      };
      // eslint-disable-next-line no-await-in-loop
      const createdSentence: Sentence = await this.createSentence(
        createSentenceDto,
      );
      createdSentenceList.push(createdSentence);
    }

    return createdSentenceList;

    // return Promise.all(sentenceList.map((sentence) => this.createSentence(sentence)))
  }

  getSentenceList(
    count: number,
    verbs: string[] = [],
    tenses: string[] = [],
  ): Promise<SentenceResponseDto[]> {
    const builder = this.sentenceRepository
      .createQueryBuilder('sentence')
      .where('sentence.schema != :schema', { schema: 'number' });

    if (verbs.length > 0) {
      builder.andWhere('sentence.verbs @> :verbs', { verbs });
    }

    if (tenses.length > 0) {
      builder.andWhere('sentence.tense = ANY(:tenses)', { tenses });
    }

    return builder.orderBy('RANDOM()').limit(count).getMany();
  }

  async getTenseList(): Promise<string[]> {
    const sentences = await this.sentenceRepository.query(
      'SELECT DISTINCT tense FROM sentence',
    );

    return sentences
      .filter((sentence: Sentence) => sentence.tense !== '')
      .map((sentence: Sentence) => sentence.tense);
  }

  async getVerbList(): Promise<string[]> {
    const sentences = await this.sentenceRepository.query(
      'SELECT DISTINCT unnest(verbs) FROM sentence',
    );

    return sentences.map((result) => result.unnest);
  }
}
