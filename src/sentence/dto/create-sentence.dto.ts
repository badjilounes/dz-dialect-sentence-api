import { ApiProperty } from "@nestjs/swagger";

export class CreateSentenceDto {
    @ApiProperty()
    dz: string;

    @ApiProperty()
    dz_ar: string;

    @ApiProperty()
    fr: string;

    @ApiProperty()
    word_propositions_dz: string[];

    @ApiProperty()
    word_propositions_fr: string[];

    @ApiProperty()
    pronouns: string[];

    @ApiProperty()
    adjectives: string[];

    @ApiProperty()
    verbs: string[];

    @ApiProperty()
    tense: string;

    @ApiProperty()
    schema: string;
}