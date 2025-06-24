import { FilterUtil } from './filter.util';
import { BaseFilterQueryDto } from '../dto/filter-query.dto';
import { FilterConfig } from '../interfaces/filter-config.interface';
import { IsOptional, IsEnum, IsString } from 'class-validator';

// Test DTO
class TestFilterDto extends BaseFilterQueryDto {
  @IsOptional()
  @IsEnum(['option1', 'option2', 'option3'])
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

// Test Entity with static filter config
class TestEntity {
  @IsOptional()
  @IsEnum(['option1', 'option2', 'option3'])
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  /**
   * Static method to define filterable properties
   */
  static getFilterConfig(): FilterConfig {
    return {
      category: {
        type: 'enum',
        allowedValues: ['option1', 'option2', 'option3'],
        required: false,
        description: 'Test category filter'
      },
      name: {
        type: 'string',
        required: false,
        description: 'Test name filter'
      }
    };
  }
}

// Test data
const testData = [
  { id: 1, name: 'Item One', category: 'option1' },
  { id: 2, name: 'Item Two', category: 'option2' },
  { id: 3, name: 'Another Item', category: 'option1' },
  { id: 4, name: 'Test Product', category: 'option3' }
];

describe('FilterUtil', () => {
  describe('validateFiltersWithEntity', () => {
    it('should validate when no filters are provided', async () => {
      const result = await FilterUtil.validateFiltersWithEntity(
        TestFilterDto,
        {},
        TestEntity
      );

      expect(result.isValid).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should validate valid filter parameters using entity', async () => {
      const queryParams = { category: 'option1', name: 'test' };
      
      const result = await FilterUtil.validateFiltersWithEntity(
        TestFilterDto,
        queryParams,
        TestEntity
      );

      expect(result.isValid).toBe(true);
      expect(result.data?.category).toBe('option1');
      expect(result.data?.name).toBe('test');
    });

    it('should reject unknown filter parameters using entity', async () => {
      const queryParams = { category: 'option1', unknownParam: 'test' };
      
      const result = await FilterUtil.validateFiltersWithEntity(
        TestFilterDto,
        queryParams,
        TestEntity
      );

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Unknown filter parameters: unknownParam. Allowed filters: category, name'
      );
      expect(result.response?.success).toBe(false);
    });

    it('should reject invalid enum values using entity', async () => {
      const queryParams = { category: 'invalidOption' };
      
      const result = await FilterUtil.validateFiltersWithEntity(
        TestFilterDto,
        queryParams,
        TestEntity
      );

      expect(result.isValid).toBe(false);
      expect(result.response?.success).toBe(false);
    });

    it('should ignore pagination parameters using entity', async () => {
      const queryParams = { 
        category: 'option1', 
        page: '1', 
        limit: '10' 
      };
      
      const result = await FilterUtil.validateFiltersWithEntity(
        TestFilterDto,
        queryParams,
        TestEntity
      );

      expect(result.isValid).toBe(true);
      expect(result.data?.category).toBe('option1');
    });
  });

  describe('validateFilters (legacy)', () => {
    it('should validate when no filters are provided', async () => {
      const filterConfig = TestEntity.getFilterConfig();
      const result = await FilterUtil.validateFilters(
        TestFilterDto,
        {},
        filterConfig
      );

      expect(result.isValid).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should validate valid filter parameters', async () => {
      const queryParams = { category: 'option1', name: 'test' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = await FilterUtil.validateFilters(
        TestFilterDto,
        queryParams,
        filterConfig
      );

      expect(result.isValid).toBe(true);
      expect(result.data?.category).toBe('option1');
      expect(result.data?.name).toBe('test');
    });

    it('should reject unknown filter parameters', async () => {
      const queryParams = { category: 'option1', unknownParam: 'test' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = await FilterUtil.validateFilters(
        TestFilterDto,
        queryParams,
        filterConfig
      );

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'Unknown filter parameters: unknownParam. Allowed filters: category, name'
      );
      expect(result.response?.success).toBe(false);
    });

    it('should reject invalid enum values', async () => {
      const queryParams = { category: 'invalidOption' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = await FilterUtil.validateFilters(
        TestFilterDto,
        queryParams,
        filterConfig
      );

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        'category must be one of: option1, option2, option3'
      );
    });

    it('should ignore pagination parameters', async () => {
      const queryParams = { page: '1', limit: '10', category: 'option1' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = await FilterUtil.validateFilters(
        TestFilterDto,
        queryParams,
        filterConfig
      );

      expect(result.isValid).toBe(true);
      expect(result.data?.category).toBe('option1');
    });

    it('should handle multiple unknown parameters', async () => {
      const queryParams = { 
        category: 'option1', 
        unknown1: 'test', 
        unknown2: 'test2' 
      };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = await FilterUtil.validateFilters(
        TestFilterDto,
        queryParams,
        filterConfig
      );

      expect(result.isValid).toBe(false);
      expect(result.errors?.[0]).toContain('Unknown filter parameters: unknown1, unknown2');
    });
  });

  describe('applyFiltersWithEntity', () => {
    it('should return all data when no filters are applied', () => {
      const result = FilterUtil.applyFiltersWithEntity(
        testData,
        {},
        TestEntity
      );

      expect(result).toHaveLength(4);
      expect(result).toEqual(testData);
    });

    it('should filter by enum value using entity', () => {
      const filters = { category: 'option1' };
      
      const result = FilterUtil.applyFiltersWithEntity(
        testData,
        filters,
        TestEntity
      );

      expect(result).toHaveLength(2);
      expect(result.every(item => item.category === 'option1')).toBe(true);
    });

    it('should filter by string value using entity', () => {
      const filters = { name: 'Item' };
      
      const result = FilterUtil.applyFiltersWithEntity(
        testData,
        filters,
        TestEntity
      );

      expect(result).toHaveLength(3);
      expect(result.every(item => item.name.includes('Item'))).toBe(true);
    });

    it('should apply multiple filters using entity', () => {
      const filters = { category: 'option1', name: 'Item' };
      
      const result = FilterUtil.applyFiltersWithEntity(
        testData,
        filters,
        TestEntity
      );

      expect(result).toHaveLength(2);
      expect(result.every(item => 
        item.category === 'option1' && item.name.includes('Item')
      )).toBe(true);
    });
  });

  describe('applyFilters (legacy)', () => {
    it('should return all data when no filters are applied', () => {
      const filterConfig = TestEntity.getFilterConfig();
      const result = FilterUtil.applyFilters(
        testData,
        {},
        filterConfig
      );

      expect(result).toHaveLength(4);
      expect(result).toEqual(testData);
    });

    it('should filter by enum value', () => {
      const filters = { category: 'option1' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = FilterUtil.applyFilters(
        testData,
        filters,
        filterConfig
      );

      expect(result).toHaveLength(2);
      expect(result.every(item => item.category === 'option1')).toBe(true);
    });

    it('should filter by string value (partial match)', () => {
      const filters = { name: 'Item' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = FilterUtil.applyFilters(
        testData,
        filters,
        filterConfig
      );

      expect(result).toHaveLength(3);
      expect(result.every(item => item.name.includes('Item'))).toBe(true);
    });

    it('should apply multiple filters (AND logic)', () => {
      const filters = { category: 'option1', name: 'Item' };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = FilterUtil.applyFilters(
        testData,
        filters,
        filterConfig
      );

      expect(result).toHaveLength(2);
      expect(result.every(item => 
        item.category === 'option1' && item.name.includes('Item')
      )).toBe(true);
    });

    it('should ignore empty filter values', () => {
      const filters = { category: '', name: undefined };
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = FilterUtil.applyFilters(
        testData,
        filters,
        filterConfig
      );

      expect(result).toHaveLength(4);
      expect(result).toEqual(testData);
    });

    it('should handle case-insensitive string filtering', () => {
      const filters = { name: 'item' }; // lowercase
      const filterConfig = TestEntity.getFilterConfig();
      
      const result = FilterUtil.applyFilters(
        testData,
        filters,
        filterConfig
      );

      expect(result).toHaveLength(3);
      expect(result.every(item => 
        item.name.toLowerCase().includes('item')
      )).toBe(true);
    });
  });
}); 