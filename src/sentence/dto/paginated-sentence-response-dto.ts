import { ApiProperty } from '@nestjs/swagger';

import { SentenceResponseDto } from 'src/sentence/dto/sentence-response.dto';

export class PaginatedSentenceResponseDto {
  @ApiProperty({ type: SentenceResponseDto, isArray: true })
  elements: SentenceResponseDto[];

  @ApiProperty()
  length: number;

  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;
}
