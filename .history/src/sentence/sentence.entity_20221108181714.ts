import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sentence {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    dz: string;

    @ApiProperty()
    dz_ar: string;

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
}