import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dz: string;

  @Column()
  dz_ar: string;

  @Column()
  fr: string;

  @Column({ array: true, type: 'varchar' })
  word_propositions_dz: string[];

  @Column({ array: true, type: 'varchar' })
  word_propositions_fr: string[];

  @Column({ array: true, type: 'varchar' })
  pronouns: string[];

  @Column({ array: true, type: 'varchar' })
  adjectives: string[];

  @Column({ array: true, type: 'varchar' })
  verbs: string[];

  @Column()
  tense: string;

  @Column()
  schema: string;
}
