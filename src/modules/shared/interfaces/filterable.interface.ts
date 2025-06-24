import { FilterConfig } from './filter-config.interface';

/**
 * Interface for entities that can be filtered
 * Entities implement this to declare their filterable properties
 */
export interface Filterable {
  /**
   * Static method to get filter configuration for the entity
   */
  getFilterConfig(): FilterConfig;
}

/**
 * Type for entity classes that can be filtered
 */
export type FilterableEntityClass = {
  new (...args: any[]): any;
  getFilterConfig(): FilterConfig;
}; 