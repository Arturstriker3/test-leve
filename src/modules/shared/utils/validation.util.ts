import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BaseResponse } from '../interfaces/base-response.interface';
import { ResponseBuilder } from './response-builder.util';

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors?: string[];
  response?: BaseResponse<any>;
}

export class ValidationUtil {
  static async validateQueryParams<T extends object>(
    target: new () => T,
    queryParams: any
  ): Promise<ValidationResult<T>> {
    try {
      // Transform plain object to class instance
      const dto = plainToClass(target, queryParams);
      
      // Validate the DTO
      const errors: ValidationError[] = await validate(dto);
      
      if (errors.length > 0) {
        const errorMessages = this.extractErrorMessages(errors);
        return {
          isValid: false,
          errors: errorMessages,
          response: ResponseBuilder.badRequest(
            'Invalid query parameters', 
            { validationErrors: errorMessages }
          )
        };
      }
      
      return {
        isValid: true,
        data: dto
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ['Validation failed'],
        response: ResponseBuilder.badRequest('Invalid request format')
      };
    }
  }

  static async validatePayload<T extends object>(
    target: new () => T,
    payload: any
  ): Promise<ValidationResult<T>> {
    try {
      // Transform plain object to class instance
      const dto = plainToClass(target, payload);
      
      // Validate the DTO
      const errors: ValidationError[] = await validate(dto);
      
      if (errors.length > 0) {
        const errorMessages = this.extractErrorMessages(errors);
        return {
          isValid: false,
          errors: errorMessages,
          response: ResponseBuilder.badRequest(
            'Invalid payload parameters', 
            { validationErrors: errorMessages }
          )
        };
      }
      
      return {
        isValid: true,
        data: dto
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ['Validation failed'],
        response: ResponseBuilder.badRequest('Invalid request format')
      };
    }
  }

  private static extractErrorMessages(errors: ValidationError[]): string[] {
    const messages: string[] = [];
    
    errors.forEach(error => {
      if (error.constraints) {
        Object.values(error.constraints).forEach(message => {
          messages.push(message);
        });
      }
    });
    
    return messages;
  }
} 