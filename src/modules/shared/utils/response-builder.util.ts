import { BaseResponse } from '../interfaces/base-response.interface';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';

export class ResponseBuilder {
  static success<T>(data: T, message?: string): BaseResponse<T> {
    return {
      data,
      message: message || 'Success',
      success: true,
      timestamp: new Date().toISOString(),
    };
  }

  static successPaginated<T>(paginatedData: PaginatedResponse<T>, message?: string) {
    return {
      data: paginatedData.data,
      pagination: paginatedData.pagination,
      message: message || 'Success',
      success: true,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string): BaseResponse {
    return {
      message,
      success: false,
      timestamp: new Date().toISOString(),
    };
  }

  static badRequest<T = null>(message: string, data?: T): BaseResponse<T> {
    return {
      data: data as T,
      message,
      success: false,
      timestamp: new Date().toISOString(),
    };
  }
} 