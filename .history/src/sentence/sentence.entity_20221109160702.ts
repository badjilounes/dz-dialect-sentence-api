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
    @Column({array: true, type: 'varchar'})
    word_propositions_dz: string[];

    @ApiProperty()
    @Column({array: true, type: 'varchar'})
    word_propositions_fr: string[];

    @ApiProperty()
    @Column({array: true, type: 'varchar'})
    pronouns: string[];

    @ApiProperty()
    @Column({array: true, type: 'varchar'})
    adjectives: string[];

    @ApiProperty()
    @Column({array: true, type: 'varchar'})
    verbs: string[];

    @ApiProperty()
    @Column()
    tense: string;
}