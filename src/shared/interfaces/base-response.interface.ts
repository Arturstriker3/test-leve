export interface BaseResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  timestamp: string;
} 