import { IsOptional, IsIn } from 'class-validator';
import { BaseFilterQueryDto } from '../../shared/dto/filter-query.dto';

export class MedicoFilterDto extends BaseFilterQueryDto {
  @IsOptional()
  @IsIn(['Cardiologista', 'Dermatologista', 'Ortopedista', 'Pediatra', 'Neurologista'], {
    message: 'especialidade must be one of: Cardiologista, Dermatologista, Ortopedista, Pediatra, Neurologista'
  })
  especialidade?: string;
} 