import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';

import { BulkSentenceDto } from './dto/bulk-create-sentence.dto';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceResponseDto } from './dto/sentence-response.dto';
import { Sentence } from './sentence.entity';

import { PaginatedSentenceResponseDto } from 'src/sentence/dto/paginated-sentence-response-dto';

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
    return Promise.all(
      sentenceList.map((sentence) =>
        this.createSentence({
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
        }),
      ),
    );
  }

  async search(
    pageIndex: number,
    pageSize: number,
    query: string,
  ): Promise<PaginatedSentenceResponseDto> {
    const options: FindManyOptions<Sentence> = {
      skip: pageIndex * pageSize,
      take: pageSize,
    };

    if (query) {
      options.where = [
        { dz: ILike(`%${query}%`) },
        { dz_ar: ILike(`%${query}%`) },
        { fr: ILike(`%${query}%`) },
      ];
    }

    const [elements, length] = await this.sentenceRepository.findAndCount(
      options,
    );

    return {
      elements,
      length,
      pageIndex,
      pageSize,
    };
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
