import { IsString, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class MedicoDto {
  @IsUUID()
  id!: string;

  @IsString()
  nome!: string;

  @IsString()
  especialidade!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  horarios_disponiveis!: string[];
} 