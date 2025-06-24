import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { MedicoDto } from './medico.dto';
import { PaginatedResponseDto } from '../../shared/dto/paginated-response.dto';

export class MedicoResponseDto extends PaginatedResponseDto<MedicoDto> {
  @ValidateNested({ each: true })
  @Type(() => MedicoDto)
  override data!: MedicoDto[];
} 