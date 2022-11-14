import { ApiProperty } from "@nestjs/swagger";

class BulkSentenceWordPropositionDto {
    @ApiProperty()
    dz: string[];

    @ApiProperty()
    fr: string[];
}

class BulkSentenceAdditionalInformationDto {
    @ApiProperty({ required: false })
    pronouns?: string[];

    @ApiProperty({ required: false })
    adjectives?: string[];

    @ApiProperty({ required: false })
    verbs?: string[];

    @ApiProperty({ required: false })
    tense?: string;

    @ApiProperty({ required: false })
    schema?: string;
}

export class BulkSentenceDto {
    @ApiProperty()
    dz: string;

    @ApiProperty()
    dz_ar: string;

    @ApiProperty()
    fr: string;

    @ApiProperty()
    word_propositions: BulkSentenceWordPropositionDto;

    @ApiProperty()
    additionnal_information: BulkSentenceAdditionalInformationDto;
}

export class BulkCreateSentenceDto {
    @ApiProperty({type: BulkSentenceDto, isArray : true})
    sentenceList: BulkSentenceDto[]
}