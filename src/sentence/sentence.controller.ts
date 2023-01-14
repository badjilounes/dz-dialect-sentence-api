import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { BulkCreateSentenceDto } from './dto/bulk-create-sentence.dto';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceResponseDto } from './dto/sentence-response.dto';
import { SentenceService } from './sentence.service';

import { PaginatedSentenceResponseDto } from 'src/sentence/dto/paginated-sentence-response-dto';

@ApiTags('Sentence')
@Controller('sentence')
export class SentenceController {
  constructor(private readonly sentenceService: SentenceService) {}

  @Get('list')
  @ApiOperation({
    operationId: 'getSentenceList',
    summary: 'Get a list of sentence',
  })
  @ApiQuery({ name: 'count', required: true, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'verbs', required: false, type: String, isArray: true })
  @ApiQuery({ name: 'tenses', required: false, type: String, isArray: true })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: SentenceResponseDto, isArray: true })
  getSentenceList(
    @Query('count', ParseIntPipe) count: number,
    @Query('verbs', new ParseArrayPipe({ separator: ',', optional: true }))
    verbs?: string[],
    @Query('tenses', new ParseArrayPipe({ separator: ',', optional: true }))
    tenses?: string[],
  ): Promise<SentenceResponseDto[]> {
    return this.sentenceService.getSentenceList(count, verbs, tenses);
  }

  @Get('search')
  @ApiOperation({
    operationId: 'searchSentence',
    summary: 'Search a sentence',
  })
  @ApiQuery({ name: 'pageIndex', required: true, type: Number })
  @ApiQuery({ name: 'pageSize', required: true, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: PaginatedSentenceResponseDto })
  search(
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('q') query = '',
  ): Promise<PaginatedSentenceResponseDto> {
    return this.sentenceService.search(pageIndex, pageSize, query);
  }

  @Get('verb-list')
  @ApiOperation({
    operationId: 'getVerbList',
    summary: 'Get a list of verbs',
  })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: String, isArray: true })
  getVerbList(): Promise<string[]> {
    return this.sentenceService.getVerbList();
  }

  @Get('tense-list')
  @ApiOperation({
    operationId: 'getTenseList',
    summary: 'Get a list of tenses',
  })
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: String, isArray: true })
  getTenseList(): Promise<string[]> {
    return this.sentenceService.getTenseList();
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

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteSentence', summary: 'Delete a sentence' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  deleteSentence(@Param('id') id: string): Promise<void> {
    return this.sentenceService.deleteSentenceById(id);
  }
}
