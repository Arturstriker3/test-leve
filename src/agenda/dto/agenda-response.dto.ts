import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MedicoDto } from './medico.dto';

export class AgendaResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicoDto)
  medicos!: MedicoDto[];
} 