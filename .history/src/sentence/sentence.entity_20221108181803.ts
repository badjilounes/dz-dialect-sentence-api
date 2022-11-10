import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sentence {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty()
    @Column()
    dz: string;

    @ApiProperty()
    @Column()
    dz_ar: string;

    @ApiProperty()
    @Column()
    word_propositions_dz: string[];

    @ApiProperty()
    @Column()
    word_propositions_fr: string[];

    @ApiProperty()
    @Column()
    pronouns: string[];

    @ApiProperty()
    @Column()
    adjectives: string[];

    @ApiProperty()
    @Column()
    verbs: string[];

    @ApiProperty()
    @Column()
    tense: string;
}