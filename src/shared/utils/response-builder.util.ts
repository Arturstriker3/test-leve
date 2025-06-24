import { BaseResponse } from '../interfaces/base-response.interface';

export class ResponseBuilder {
  static success<T>(data: T, message?: string): BaseResponse<T> {
    return {
      data,
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
} 