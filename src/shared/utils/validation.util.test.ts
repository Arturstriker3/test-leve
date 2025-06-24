import { ValidationUtil } from './validation.util';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

describe('ValidationUtil', () => {
  describe('validateQueryParams', () => {
    it('should validate valid pagination parameters', async () => {
      const queryParams = { page: '1', limit: '10' };
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(true);
      expect(result.data?.page).toBe(1);
      expect(result.data?.limit).toBe(10);
      expect(result.errors).toBeUndefined();
    });

    it('should validate with optional parameters', async () => {
      const queryParams = {};
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(true);
      expect(result.data?.page).toBeUndefined();
      expect(result.data?.limit).toBeUndefined();
    });

    it('should reject invalid page parameter', async () => {
      const queryParams = { page: 'abc', limit: '10' };
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Page must be an integer');
      expect(result.response?.success).toBe(false);
    });

    it('should reject page parameter less than 1', async () => {
      const queryParams = { page: '0', limit: '10' };
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Page must be at least 1');
    });

    it('should reject limit parameter greater than 100', async () => {
      const queryParams = { page: '1', limit: '150' };
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Limit cannot exceed 100');
    });

    it('should reject invalid limit parameter', async () => {
      const queryParams = { page: '1', limit: 'xyz' };
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Limit must be an integer');
    });

    it('should handle multiple validation errors', async () => {
      const queryParams = { page: '-1', limit: '200' };
      
      const result = await ValidationUtil.validateQueryParams(
        PaginationQueryDto,
        queryParams
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('Page must be at least 1');
      expect(result.errors).toContain('Limit cannot exceed 100');
    });
  });
}); 