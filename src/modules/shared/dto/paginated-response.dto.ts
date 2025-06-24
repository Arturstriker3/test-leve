import { IsArray, ValidateNested, IsObject, Type } from 'class-transformer';
import { ValidateNested as ValidateNestedDecorator } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class PaginatedResponseDto<T> {
  @IsArray()
  @ValidateNestedDecorator({ each: true })
  data!: T[];

  @IsObject()
  @ValidateNestedDecorator()
  @Type(() => PaginationDto)
  pagination!: PaginationDto;
} 