import { PaginatedResponse } from '../interfaces/paginated-response.interface';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export class PaginationUtil {
  static paginate<T>(
    data: T[],
    params: PaginationParams = {}
  ): PaginatedResponse<T> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        current_page: page,
        per_page: limit,
        total,
        total_pages: totalPages,
        has_next_page: page < totalPages,
        has_previous_page: page > 1,
      },
    };
  }

  static extractPaginationParams(queryParams: any): PaginationParams {
    return {
      page: queryParams.page ? parseInt(queryParams.page, 10) : undefined,
      limit: queryParams.limit ? parseInt(queryParams.limit, 10) : undefined,
    };
  }
} 