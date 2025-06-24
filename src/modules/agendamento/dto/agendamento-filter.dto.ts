import { IsOptional, IsUUID, IsString, IsDateString } from 'class-validator';
import { BaseFilterQueryDto } from '../../shared/dto/filter-query.dto';

export class AgendamentoFilterDto extends BaseFilterQueryDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  medico?: string;

  @IsOptional()
  @IsString()
  paciente?: string;

  @IsOptional()
  @IsDateString()
  data_horario?: string;
} 