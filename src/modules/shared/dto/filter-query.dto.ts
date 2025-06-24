import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class BaseFilterQueryDto {
  // Base class for filter DTOs - modules can extend this
}

// Utility decorators for common transformations
export const StringFilter = () => (target: any, propertyKey: string) => {
  IsOptional()(target, propertyKey);
  IsString({ message: `${propertyKey} must be a string` })(target, propertyKey);
};

export const NumberFilter = () => (target: any, propertyKey: string) => {
  IsOptional()(target, propertyKey);
  Transform(({ value }) => value ? parseInt(value, 10) : undefined)(target, propertyKey);
  IsNumber({}, { message: `${propertyKey} must be a number` })(target, propertyKey);
};

export const BooleanFilter = () => (target: any, propertyKey: string) => {
  IsOptional()(target, propertyKey);
  Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })(target, propertyKey);
  IsBoolean({ message: `${propertyKey} must be a boolean (true/false)` })(target, propertyKey);
}; 