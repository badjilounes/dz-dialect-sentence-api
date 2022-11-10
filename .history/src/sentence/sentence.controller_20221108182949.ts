import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { Sentence } from './sentence.entity';
import { SentenceService } from './sentence.service';

@ApiTags('Post')
@Controller('sentence')
export class SentenceController {

    constructor(private readonly sentenceService: SentenceService) {}

    @Post()
    @ApiBadRequestResponse()
    @ApiCreatedResponse({ type: Sentence })
    async createPost(@Body() body: CreateSentenceDto): Promise<Sentence> {
        return this.sentenceService.createSentence(body);
    }
}
