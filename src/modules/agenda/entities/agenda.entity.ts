import { IsArray, IsEnum, IsOptional, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Medico } from '../../medico/interface/medico.interface';
import { FilterConfig } from '../../shared/interfaces/filter-config.interface';

export class AgendaEntity {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object) // For complex objects, you might want a specific DTO
  medicos!: Medico[];

  @IsOptional()
  @IsDateString()
  dataConsulta?: Date;

  @IsOptional()
  @IsEnum(['disponivel', 'ocupado'])
  status?: 'disponivel' | 'ocupado';

  constructor(data: Partial<AgendaEntity> = {}) {
    Object.assign(this, data);
  }

  /**
   * Define filterable properties for this entity
   * Agenda has minimal filters as it's primarily an orchestrator
   */
  static getFilterConfig(): FilterConfig {
    return {
      dataConsulta: {
        type: 'date',
        required: false,
        description: 'Filter by consultation date'
      },
      status: {
        type: 'enum',
        allowedValues: ['disponivel', 'ocupado'],
        required: false,
        description: 'Filter by availability status'
      }
    };
  }
} 