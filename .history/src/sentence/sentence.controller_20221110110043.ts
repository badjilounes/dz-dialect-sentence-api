import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentenceResponseDto } from './dto/sentence-response.dto';
import { Sentence } from './sentence.entity';
import { SentenceService } from './sentence.service';

@ApiTags('Post')
@Controller('sentence')
export class SentenceController {

    constructor(private readonly sentenceService: SentenceService) {}

    @Post()
    @ApiBadRequestResponse()
    @ApiCreatedResponse({ type: SentenceResponseDto })
    async createPost(@Body() body: CreateSentenceDto): Promise<SentenceResponseDto> {
        return this.sentenceService.createSentence(body);
    }






    
}
