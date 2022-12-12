import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { BulkCreateSentenceDto } from './dto/bulk-create-sentence.dto';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceResponseDto } from './dto/sentence-response.dto';
import { SentenceService } from './sentence.service';

@ApiTags('Sentence')
@Controller('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Get('list')
  @ApiOperation({
    operationId: 'getSentenceList',
    summary: 'Get a list of sentence',
  })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: SentenceResponseDto, isArray: true })
  getSentenceList(
    @Query('count', ParseIntPipe) count: number,
  ): Promise<SentenceResponseDto[]> {
    return this.sentenceService.getSentenceList(count);
  }

  @Post()
  @ApiOperation({ operationId: 'createSentence', summary: 'Create a sentence' })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: SentenceResponseDto })
  createSentence(
    @Body() body: CreateSentenceDto,
  ): Promise<SentenceResponseDto> {
    return this.sentenceService.createSentence(body);
  }

  @Post('bulk')
  @ApiOperation({
    operationId: 'bulkCreateSentence',
    summary: 'Bulk create a sentence',
  })
  @ApiCreatedResponse({ type: SentenceResponseDto, isArray: true })
  bulkCreateSentence(
    @Body() body: BulkCreateSentenceDto,
  ): Promise<SentenceResponseDto[]> {
    return this.sentenceService.bulkCreateSentence(body.sentenceList);
  }
}
