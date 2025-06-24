import { IsString, IsDateString, IsUUID } from 'class-validator';

export class AgendamentoResponseDto {
  @IsUUID()
  id!: string;

  @IsString()
  medico!: string;

  @IsString()
  paciente!: string;

  @IsDateString()
  data_horario!: string;

  @IsDateString()
  created_at!: string;
} 