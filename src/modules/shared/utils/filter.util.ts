import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { FilterConfig, FilterResult } from '../interfaces/filter-config.interface';
import { BaseResponse } from '../interfaces/base-response.interface';
import { ResponseBuilder } from './response-builder.util';

export class FilterUtil {
  /**
   * Validates query parameters using an Entity's static filter configuration
   */
  static async validateFiltersWithEntity<T extends object>(
    dtoClass: new () => T,
    queryParams: any,
    entityClass: { getFilterConfig(): FilterConfig }
  ): Promise<FilterResult<T> & { response?: BaseResponse<any> }> {
    const filterConfig = entityClass.getFilterConfig();
    return this.validateFilters(dtoClass, queryParams, filterConfig);
  }

  /**
   * Validates query parameters against a DTO class and filter configuration
   */
  static async validateFilters<T extends object>(
    dtoClass: new () => T,
    queryParams: any,
    filterConfig: FilterConfig
  ): Promise<FilterResult<T> & { response?: BaseResponse<any> }> {
    try {
      // Check for unknown filter parameters
      const allowedParams = Object.keys(filterConfig);
      const providedParams = Object.keys(queryParams).filter(key => 
        key !== 'page' && key !== 'limit' // Exclude pagination params
      );
      
      const unknownParams = providedParams.filter(param => 
        !allowedParams.includes(param)
      );
      
      if (unknownParams.length > 0) {
        return {
          isValid: false,
          errors: [
            `Unknown filter parameters: ${unknownParams.join(', ')}. ` +
            `Allowed filters: ${allowedParams.join(', ')}`
          ],
          response: ResponseBuilder.badRequest(
            'Invalid filter parameters',
            { 
              unknownParams,
              allowedFilters: allowedParams,
              providedParams
            }
          )
        };
      }

      // Validate allowed parameters against their configuration
      const validationErrors: string[] = [];
      
      for (const [param, value] of Object.entries(queryParams)) {
        if (param === 'page' || param === 'limit') continue; // Skip pagination
        
        const config = filterConfig[param];
        if (!config) continue;
        
        // Validate enum values
        if (config.type === 'enum' && config.allowedValues) {
          if (!(config.allowedValues as any[]).includes(value)) {
            validationErrors.push(
              `${param} must be one of: ${config.allowedValues.join(', ')}`
            );
          }
        }
        
        // Validate required fields
        if (config.required && (!value || value === '')) {
          validationErrors.push(`${param} is required`);
        }
      }
      
      if (validationErrors.length > 0) {
        return {
          isValid: false,
          errors: validationErrors,
          response: ResponseBuilder.badRequest(
            'Filter validation failed',
            { validationErrors }
          )
        };
      }

      // Transform and validate with class-validator
      const dto = plainToClass(dtoClass, queryParams);
      const classValidationErrors: ValidationError[] = await validate(dto);
      
      if (classValidationErrors.length > 0) {
        const errorMessages = this.extractErrorMessages(classValidationErrors);
        return {
          isValid: false,
          errors: errorMessages,
          response: ResponseBuilder.badRequest(
            'Filter format validation failed',
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
        errors: ['Filter validation failed'],
        response: ResponseBuilder.badRequest('Invalid filter format')
      };
    }
  }

  /**
   * Applies filters to data array using an Entity's static filter configuration
   */
  static applyFiltersWithEntity<T>(
    data: T[],
    filters: Record<string, any>,
    entityClass: { getFilterConfig(): FilterConfig }
  ): T[] {
    const filterConfig = entityClass.getFilterConfig();
    return this.applyFilters(data, filters, filterConfig);
  }

  /**
   * Applies filters to data array based on the filter object
   */
  static applyFilters<T>(
    data: T[],
    filters: Record<string, any>,
    filterConfig: FilterConfig
  ): T[] {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          return true; // Skip empty filters
        }
        
        const config = filterConfig[key];
        if (!config) return true; // Skip unknown filters (should be caught in validation)
        
        const itemValue = (item as any)[key];
        
        switch (config.type) {
          case 'string':
            return typeof itemValue === 'string' && 
                   itemValue.toLowerCase().includes(value.toLowerCase());
          
          case 'number':
            return itemValue === value;
          
          case 'boolean':
            return itemValue === value;
          
          case 'enum':
            return itemValue === value;
          
          default:
            return true;
        }
      });
    });
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