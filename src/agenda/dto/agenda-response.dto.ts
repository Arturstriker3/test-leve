import { IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { MedicoDto } from '../../medico/dto/medico.dto';

class PaginationDto {
  current_page!: number;
  per_page!: number;
  total!: number;
  total_pages!: number;
  has_next_page!: boolean;
  has_previous_page!: boolean;
}

export class AgendaResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicoDto)
  data!: MedicoDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination!: PaginationDto;
} 