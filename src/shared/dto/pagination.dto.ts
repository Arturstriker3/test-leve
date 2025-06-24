import { IsNumber, IsBoolean } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  current_page!: number;

  @IsNumber()
  per_page!: number;

  @IsNumber()
  total!: number;

  @IsNumber()
  total_pages!: number;

  @IsBoolean()
  has_next_page!: boolean;

  @IsBoolean()
  has_previous_page!: boolean;
} 