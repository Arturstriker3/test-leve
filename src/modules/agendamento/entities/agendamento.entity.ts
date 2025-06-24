import { IsString, IsDateString, IsUUID } from 'class-validator';
import { FilterConfig } from '../../shared/interfaces/filter-config.interface';

export class AgendamentoEntity {
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

  static getFilterConfig(): FilterConfig {
    return {
      id: {
        type: 'string',
        required: false,
        description: 'Filter by agendamento UUID'
      },
      medico: {
        type: 'string',
        required: false,
        description: 'Filter by medico name'
      },
      paciente: {
        type: 'string',
        required: false,
        description: 'Filter by paciente name'
      },
      data_horario: {
        type: 'string',
        required: false,
        description: 'Filter by appointment date/time'
      }
    };
  }
} 