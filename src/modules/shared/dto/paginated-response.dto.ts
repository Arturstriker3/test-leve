import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsObject } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class PaginatedResponseDto<T> {
  @IsArray()
  @ValidateNested({ each: true })
  data!: T[];

  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination!: PaginationDto;
} 