import { IsNumber, IsString, IsEnum, IsArray } from 'class-validator';
import { FilterConfig } from '../../shared/interfaces/filter-config.interface';

export class MedicoEntity {
  @IsNumber()
  id!: number;

  @IsString()
  nome!: string;

  @IsEnum(['Cardiologista', 'Dermatologista', 'Ortopedista', 'Pediatra', 'Neurologista'])
  especialidade!: string;

  @IsArray()
  @IsString({ each: true })
  horarios_disponiveis!: string[];

  constructor(data: Partial<MedicoEntity> = {}) {
    Object.assign(this, data);
  }

  /**
   * Define filterable properties for this entity
   * Simple static method that returns the filter configuration
   */
  static getFilterConfig(): FilterConfig {
    return {
      id: {
        type: 'number',
        required: false,
        description: 'Filter by medico ID'
      },
      nome: {
        type: 'string',
        required: false,
        description: 'Filter by medico name'
      },
      especialidade: {
        type: 'enum',
        allowedValues: ['Cardiologista', 'Dermatologista', 'Ortopedista', 'Pediatra', 'Neurologista'],
        required: false,
        description: 'Filter by especialidade'
      }
    };
  }
} 