import { IsString, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AgendamentoDataDto {
  @IsString()
  medico!: string;

  @IsString()
  paciente!: string;

  @IsDateString()
  data_horario!: string;
}

export class CreateAgendamentoDto {
  @ValidateNested()
  @Type(() => AgendamentoDataDto)
  agendamento!: AgendamentoDataDto;
} 