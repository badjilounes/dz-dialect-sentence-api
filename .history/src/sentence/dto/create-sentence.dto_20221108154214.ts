import { ApiProperty } from "@nestjs/swagger";

export class CreateSentenceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    french: string;

    @ApiProperty()
    arabic: string;
}