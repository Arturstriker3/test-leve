import { IsNumber, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class MedicoDto {
  @IsNumber()
  id!: number;

  @IsString()
  nome!: string;

  @IsString()
  especialidade!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  horarios_disponiveis!: string[];
} 