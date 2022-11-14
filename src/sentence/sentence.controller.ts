import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BulkCreateSentenceDto } from './dto/bulk-create-sentence.dto';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceResponseDto } from './dto/sentence-response.dto';
import { Sentence } from './sentence.entity';
import { SentenceService } from './sentence.service';

@ApiTags('Sentence')
@Controller('sentence')
export class SentenceController {

    constructor(private readonly sentenceService: SentenceService) {}

    @Post()
    @ApiBadRequestResponse()
    @ApiCreatedResponse({ type: SentenceResponseDto })
    async createPost(@Body() body: CreateSentenceDto): Promise<SentenceResponseDto> {
        return this.sentenceService.createSentence(body);
    }


    @Post('bulk')
    @ApiCreatedResponse({ type: SentenceResponseDto, isArray: true })
    bulkCreateSentence(@Body() body: BulkCreateSentenceDto): Promise<SentenceResponseDto[]> {
        return this.sentenceService.bulkCreateSentence(body.sentenceList);
    }
  
}
